import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Trash2, Copy, Download } from 'lucide-react';
import DustAPI from '../services/DustAPI';

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Bonjour ! Je suis votre assistant IA chef d\'orchestre spécialisé dans l\'immobilier. Je peux analyser vos biens, évaluer leur potentiel, optimiser vos investissements et vous accompagner dans vos projets. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [abortController, setAbortController] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setStreamingMessage('');

    // Créer un AbortController pour pouvoir annuler la requête
    const controller = new AbortController();
    setAbortController(controller);

    // Ajouter un message bot vide qui sera rempli par le streaming
    const botMessageId = Date.now() + 1;
    const botMessage = {
      id: botMessageId,
      type: 'bot',
      content: '🤖 MonConseillerImmo réfléchit... Cela peut prendre 30 secondes pour les analyses complexes.',
      timestamp: new Date(),
      streaming: true
    };
    setMessages(prev => [...prev, botMessage]);

    try {
      // Appel à l'agent Dust avec streaming
      console.log('🚀 Début appel Dust API pour:', currentMessage);
      const dustResponse = await DustAPI.callChefOrchestre(currentMessage, controller.signal);
      console.log('📥 Réponse Dust API complète:', dustResponse);
      
      if (dustResponse.success) {
        // Finaliser le message avec la réponse complète
        console.log('✅ Succès - Message à afficher:', dustResponse.message);
        console.log('🔍 Structure complète dustResponse:', dustResponse);
        console.log('🔍 raw_result:', dustResponse.raw_result);
        
        // Vérifier si le message est différent du message utilisateur
        if (dustResponse.message === currentMessage) {
          console.error('❌ PROBLÈME: Le message agent est identique au message utilisateur!');
          console.error('❌ Message utilisateur:', currentMessage);
          console.error('❌ Message agent:', dustResponse.message);
          console.error('❌ Raw result:', dustResponse.raw_result);
        }
        
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, content: dustResponse.message, streaming: false }
            : msg
        ));
      } else {
        // Message d'erreur avec logs complets
        console.log('❌ Erreur - Réponse complète:', dustResponse);
        const errorMessage = `❌ Erreur Dust API: ${dustResponse.message}\n\n🔍 Logs complets:\n${JSON.stringify(dustResponse, null, 2)}`;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, content: errorMessage, streaming: false }
            : msg
        ));
      }
    } catch (error) {
      console.error('🚨 Erreur lors de l\'appel Dust:', error);
      console.error('🔍 Détails complets de l\'erreur:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        cause: error.cause
      });
      
      // Message d'erreur avec logs complets
      const errorMessage = `🚨 Erreur lors de l'appel Dust: ${error.message}\n\n🔍 Détails complets:\n${JSON.stringify({
        message: error.message,
        name: error.name,
        stack: error.stack,
        cause: error.cause
      }, null, 2)}`;
      
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, content: errorMessage, streaming: false }
          : msg
      ));
    } finally {
      setIsLoading(false);
      setStreamingMessage('');
      setAbortController(null);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    // Annuler toute requête en cours
    if (abortController) {
      abortController.abort();
    }
    
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Conversation effacée. Comment puis-je vous aider ?',
        timestamp: new Date()
      }
    ]);
  };

  const stopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsLoading(false);
      setStreamingMessage('');
    }
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.type === 'user' ? 'Vous' : 'Assistant'}: ${msg.content}\n`
    ).join('\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-assistant-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const quickQuestions = [
    'Test de connexion API',
    'Bonjour, comment ça va ?',
    'Que peux-tu faire pour moi ?'
  ];

  const testConnection = async () => {
    setIsLoading(true);
    try {
      const result = await DustAPI.testConnection();
      
      const testMessage = {
        id: Date.now(),
        type: 'bot',
        content: result.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, testMessage]);
    } catch (error) {
      console.error('Erreur test connexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'var(--primary-ecru)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '2px solid var(--border-ecru)'
          }}>
            <MessageCircle size={24} color="var(--text-dark)" />
          </div>
          <div>
            <h1 style={{ margin: 0, color: 'var(--text-dark)' }}>
              Assistant IA Spécialisé
            </h1>
            <p style={{ margin: 0, color: 'var(--text-medium)' }}>
              Chatbot intelligent pour vous guider dans vos analyses immobilières
            </p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Zone de chat */}
        <div className="card" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: 'var(--text-dark)' }}>
              Conversation
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={testConnection}
                className="btn" 
                style={{ padding: '0.5rem', background: 'var(--primary-ecru)', color: 'var(--text-dark)' }}
                title="Tester la connexion API"
                disabled={isLoading}
              >
                🔗
              </button>
              <button 
                onClick={exportChat}
                className="btn btn-secondary" 
                style={{ padding: '0.5rem' }}
                title="Exporter la conversation"
              >
                <Download size={16} />
              </button>
              <button 
                onClick={clearChat}
                className="btn btn-secondary" 
                style={{ padding: '0.5rem' }}
                title="Effacer la conversation"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '1rem', 
            background: 'var(--accent-ecru)', 
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            {messages.map((message) => (
              <div key={message.id} style={{ 
                display: 'flex', 
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  maxWidth: '80%', 
                  display: 'flex', 
                  gap: '0.5rem',
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
                }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: message.type === 'user' ? 'var(--text-dark)' : 'var(--primary-ecru)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {message.type === 'user' ? (
                      <User size={16} color="white" />
                    ) : (
                      <Bot size={16} color="var(--text-dark)" />
                    )}
                  </div>
                  
                  <div style={{ 
                    background: message.type === 'user' ? 'var(--text-dark)' : 'white', 
                    color: message.type === 'user' ? 'white' : 'var(--text-dark)',
                    padding: '0.75rem 1rem', 
                    borderRadius: '12px',
                    border: '1px solid var(--border-ecru)',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      whiteSpace: 'pre-wrap', 
                      fontSize: '0.9rem',
                      lineHeight: '1.5'
                    }}>
                      {message.content}
                    </div>
                    
                    {message.type === 'bot' && (
                      <button
                        onClick={() => copyMessage(message.content)}
                        style={{
                          position: 'absolute',
                          top: '0.5rem',
                          right: '0.5rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--text-medium)',
                          padding: '0.25rem'
                        }}
                        title="Copier le message"
                      >
                        <Copy size={12} />
                      </button>
                    )}
                    
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: message.type === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-light)',
                      marginTop: '0.5rem'
                    }}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: 'var(--primary-ecru)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <Bot size={16} color="var(--text-dark)" />
                  </div>
                  <div style={{ 
                    background: 'white', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '12px',
                    border: '1px solid var(--border-ecru)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div className="spinner"></div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-medium)' }}>
                      Assistant réfléchit...
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question à l'assistant IA..."
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid var(--border-ecru)',
                borderRadius: '8px',
                background: 'white',
                resize: 'vertical',
                minHeight: '44px',
                maxHeight: '120px',
                fontFamily: 'inherit'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="btn btn-primary"
              style={{ padding: '0.75rem' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Questions rapides et aide */}
        <div>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
              Questions rapides
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="btn btn-secondary"
                  style={{ 
                    textAlign: 'left', 
                    justifyContent: 'flex-start',
                    fontSize: '0.9rem',
                    padding: '0.75rem 1rem'
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: 'var(--accent-ecru)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
              💡 Comment utiliser l'assistant
            </h3>
            <div style={{ color: 'var(--text-medium)', fontSize: '0.9rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>L'assistant IA peut vous aider à :</strong>
              </p>
              <ul style={{ paddingLeft: '1rem' }}>
                <li>Choisir les bons agents pour vos analyses</li>
                <li>Interpréter les résultats d'évaluation</li>
                <li>Optimiser vos stratégies d'investissement</li>
                <li>Répondre à vos questions techniques</li>
                <li>Guider vos clients dans leurs choix</li>
              </ul>
              
              <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                Posez des questions précises pour obtenir les meilleures réponses !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
