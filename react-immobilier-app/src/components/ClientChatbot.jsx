import React, { useState } from 'react';
import { Send, Download, Trash2 } from 'lucide-react';
import DustAPIClient from '../services/DustAPIClient';

const ClientChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Bonjour ! Je suis votre assistant client Azura. Comment puis-je vous aider à trouver votre propriété idéale ?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const currentMessage = inputMessage;
    setInputMessage('');
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    // Ajouter un message bot vide qui sera rempli par la réponse
    const botMessageId = Date.now() + 1;
    const botMessage = {
      id: botMessageId,
      type: 'bot',
      content: '🤖 Assistant Client Azura réfléchit...',
      timestamp: new Date(),
      streaming: false
    };
    setMessages(prev => [...prev, botMessage]);

    try {
      // Appel à l'agent Dust Client avec streaming
      console.log('🚀 Début appel Dust API Client pour:', currentMessage);
      const dustResponse = await DustAPIClient.callChefOrchestre(currentMessage, controller.signal);
      console.log('📥 Réponse Dust API Client complète:', dustResponse);
      
      if (dustResponse.success) {
        // Finaliser le message avec la réponse complète
        console.log('✅ Succès Client - Message à afficher:', dustResponse.message);
        console.log('🔍 Structure complète dustResponse Client:', dustResponse);
        console.log('🔍 raw_result Client:', dustResponse.raw_result);
        
        // Vérifier si le message est différent du message utilisateur
        if (dustResponse.message === currentMessage) {
          console.error('❌ PROBLÈME CLIENT: Le message agent est identique au message utilisateur!');
          console.error('❌ Message utilisateur:', currentMessage);
          console.error('❌ Message agent:', dustResponse.message);
          console.error('❌ Raw result:', dustResponse.raw_result);
        }
        
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, content: dustResponse.message, streaming: false }
            : msg
        ));
        
        console.log('🔄 Message Client mis à jour avec:', dustResponse.message);
      } else {
        // Message d'erreur avec logs complets
        console.log('❌ Erreur Client - Réponse complète:', dustResponse);
        const errorMessage = `❌ Erreur Dust API Client: ${dustResponse.message}\n\n🔍 Logs complets:\n${JSON.stringify(dustResponse, null, 2)}`;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, content: errorMessage, streaming: false }
            : msg
        ));
      }
    } catch (error) {
      console.error('🚨 Erreur lors de l\'appel Dust Client:', error);
      console.error('🔍 Détails complets de l\'erreur Client:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        cause: error.cause
      });
      
      // Message d'erreur avec logs complets
      const errorMessage = `🚨 Erreur lors de l'appel Dust Client: ${error.message}\n\n🔍 Détails complets:\n${JSON.stringify({
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

  const exportToPDF = () => {
    // Créer le contenu HTML pour le PDF
    const chatContent = messages.map(msg => 
      `<div style="margin-bottom: 1rem; padding: 0.75rem; border-radius: 8px; ${msg.type === 'user' ? 'background: #f0f0f0; text-align: right;' : 'background: #e8f4f8; text-align: left;'}">
        <strong>${msg.type === 'user' ? 'Vous' : 'Assistant Client Azura'}:</strong><br>
        ${msg.content.replace(/\n/g, '<br>')}
        <div style="font-size: 0.8em; color: #666; margin-top: 0.5rem;">
          ${msg.timestamp.toLocaleString()}
        </div>
      </div>`
    ).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Conversation Client Azura - ${new Date().toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2c3e50; text-align: center; }
            .header { text-align: center; margin-bottom: 2rem; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Conversation avec Assistant Client Azura</h1>
            <p>Exporté le ${new Date().toLocaleString()}</p>
          </div>
          ${chatContent}
        </body>
      </html>
    `;

    // Créer et télécharger le PDF
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-client-azura-${new Date().toISOString().split('T')[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* En-tête avec bouton d'export */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 1rem' }}>
        <h3 style={{ margin: 0, color: 'var(--foreground)' }}>
          Assistant Client
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={exportToPDF}
            className="btn btn-outline" 
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            title="Exporter en PDF"
          >
            <Download className="w-4 h-4 mr-1" />
            Export PDF
          </button>
          <button 
            onClick={clearChat}
            className="btn btn-outline" 
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            title="Effacer la conversation"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Effacer
          </button>
        </div>
      </div>

      {/* Zone de messages */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '1rem',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem'
      }}>
        {messages.map((message) => (
          <div key={message.id} style={{ 
            display: 'flex', 
            justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{ 
              maxWidth: '80%', 
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              background: message.type === 'user' 
                ? 'linear-gradient(135deg, var(--primary), var(--accent))'
                : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border)',
              color: message.type === 'user' ? 'white' : 'var(--foreground)',
              wordWrap: 'break-word'
            }}>
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {message.content}
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                opacity: 0.7, 
                marginTop: '0.5rem',
                textAlign: 'right'
              }}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--foreground)',
            opacity: 0.7
          }}>
            <div className="spinner"></div>
            <span>Assistant Client Azura réfléchit...</span>
          </div>
        )}
      </div>

      {/* Zone de saisie */}
      <div style={{ 
        padding: '1rem',
        borderTop: '1px solid var(--border)',
        background: 'rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              color: 'var(--foreground)',
              fontSize: '0.875rem'
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="btn btn-primary"
            style={{ 
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientChatbot;
