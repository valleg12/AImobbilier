import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Heart, Home, TrendingUp, Users, ArrowRight } from 'lucide-react';

const ClientChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Bonjour ! 👋 

Je suis votre assistant immobilier personnel. Je suis là pour vous aider à :

🏠 **Trouver votre logement idéal**
💰 **Investir intelligemment** 
📈 **Comprendre le marché immobilier**

Que souhaitez-vous faire aujourd'hui ?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentService, setCurrentService] = useState(null);
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
    setInputMessage('');
    setIsLoading(true);

    // Simulation d'une réponse de l'agent IA
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateClientResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateClientResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('acheter') || input.includes('maison') || input.includes('appartement')) {
      setCurrentService('achat');
      return `Parfait ! Je vais vous accompagner dans votre projet d'achat. 🏠

Pour vous proposer les meilleures options, j'aimerais connaître :

📍 **Votre localisation préférée** (ville, quartier)
💰 **Votre budget** (approximatif)
🏡 **Type de bien** (appartement, maison, studio...)
👥 **Vos besoins** (nombre de pièces, critères spécifiques)

Pouvez-vous me donner ces informations ?`;
    }
    
    if (input.includes('louer') || input.includes('location')) {
      setCurrentService('location');
      return `Excellent ! Je vais vous aider à trouver votre logement de location. 🏡

Pour optimiser ma recherche, j'ai besoin de savoir :

📍 **Zone géographique** souhaitée
💰 **Budget mensuel** (loyer maximum)
🏠 **Type de logement** (appartement, studio, maison...)
📋 **Vos critères** (proximité transports, commerces, etc.)

Dites-moi tout ! 😊`;
    }
    
    if (input.includes('investir') || input.includes('rentabilité') || input.includes('placement')) {
      setCurrentService('investissement');
      return `Super ! L'immobilier est un excellent placement. 📈

Pour vous conseiller au mieux, j'aimerais comprendre :

💰 **Votre capacité d'investissement**
🎯 **Vos objectifs** (revenus locatifs, plus-value...)
📍 **Zones d'intérêt** (Paris, banlieue, province...)
⏰ **Horizon temporel** de votre investissement

Parlez-moi de votre projet ! 💼`;
    }
    
    if (input.includes('prix') || input.includes('marché') || input.includes('tendance')) {
      return `Voici les dernières tendances du marché immobilier : 📊

**Paris :**
• Prix moyen : 10 500€/m²
• Évolution : +2.3% cette année
• Zones dynamiques : 11ème, 19ème, 20ème

**Banlieue :**
• Prix moyen : 4 200€/m²
• Évolution : +1.8% cette année
• Zones portées : Boulogne, Issy, Levallois

**Conseils :**
• Les 3-4 pièces sont très demandés
• Les biens bien desservis se vendent plus vite
• Bonnes opportunités en rénovation

Quelle zone vous intéresse le plus ?`;
    }
    
    if (input.includes('aide') || input.includes('conseil') || input.includes('question')) {
      return `Je suis là pour vous aider ! 🤝

Voici ce que je peux faire pour vous :

🏠 **Recherche de biens** - Je trouve selon vos critères
💰 **Analyse de prix** - Je vérifie la justesse des prix
📋 **Accompagnement** - Je vous guide dans vos démarches
📊 **Conseils marché** - Je partage les dernières tendances
🎯 **Optimisation budget** - Je vous aide à négocier

Que puis-je faire pour vous aujourd'hui ?`;
    }
    
    // Réponses contextuelles selon le service
    if (currentService === 'achat') {
      return `Merci pour ces informations ! 🎯

Voici ce que je vais faire pour vous :

1️⃣ **Recherche personnalisée** dans notre base de biens
2️⃣ **Analyse des prix** pour vérifier la justesse
3️⃣ **Évaluation du quartier** (transports, commerces, écoles...)
4️⃣ **Checklist d'achat** personnalisée
5️⃣ **Accompagnement** jusqu'à la signature

Je reviens vers vous dans quelques minutes avec mes recommandations ! ⏰`;
    }
    
    if (currentService === 'location') {
      return `Parfait ! J'ai toutes les infos nécessaires. 🔍

Mon plan d'action pour vous :

1️⃣ **Recherche ciblée** selon vos critères
2️⃣ **Vérification des loyers** du marché
3️⃣ **Analyse du quartier** et des services
4️⃣ **Préparation des visites** avec questions clés
5️⃣ **Aide à la négociation** du loyer

Je vous envoie mes trouvailles très bientôt ! 📱`;
    }
    
    if (currentService === 'investissement') {
      return `Excellent projet ! Je vais vous accompagner. 💼

Ma stratégie pour votre investissement :

1️⃣ **Analyse de rentabilité** détaillée
2️⃣ **Comparaison des zones** selon vos critères
3️⃣ **Optimisation fiscale** (LMNP, Pinel...)
4️⃣ **Calcul du rendement** brut et net
5️⃣ **Plan de financement** personnalisé

Je prépare une analyse complète pour vous ! 📊`;
    }
    
    return `Je comprends ! 😊

Pour mieux vous aider, pouvez-vous me dire si vous cherchez à :

🏠 **Acheter** un logement pour y vivre
💰 **Investir** dans l'immobilier locatif
🏡 **Louer** un logement temporairement
📊 **Comprendre** le marché immobilier

Dites-moi ce qui vous intéresse le plus !`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: Home, text: 'Je veux acheter', action: 'Je veux acheter un logement pour y vivre' },
    { icon: TrendingUp, text: 'Je veux investir', action: 'Je veux investir dans l\'immobilier locatif' },
    { icon: Users, text: 'Je veux louer', action: 'Je cherche un logement à louer' }
  ];

  return (
    <div className="fade-in">
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'var(--accent-ecru)', 
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
              Assistant Client
            </h1>
            <p style={{ margin: 0, color: 'var(--text-medium)' }}>
              Votre conseiller immobilier personnel disponible 24h/24
            </p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Zone de chat */}
        <div className="card" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: 'var(--text-dark)' }}>
              Chat avec votre assistant
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                background: '#4ade80', 
                borderRadius: '50%' 
              }}></div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-medium)' }}>
                En ligne
              </span>
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
                  maxWidth: '85%', 
                  display: 'flex', 
                  gap: '0.5rem',
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
                }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    background: message.type === 'user' ? 'var(--text-dark)' : 'var(--primary-ecru)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {message.type === 'user' ? (
                      <User size={18} color="white" />
                    ) : (
                      <Bot size={18} color="var(--text-dark)" />
                    )}
                  </div>
                  
                  <div style={{ 
                    background: message.type === 'user' ? 'var(--text-dark)' : 'white', 
                    color: message.type === 'user' ? 'white' : 'var(--text-dark)',
                    padding: '1rem 1.25rem', 
                    borderRadius: '16px',
                    border: '1px solid var(--border-ecru)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ 
                      whiteSpace: 'pre-wrap', 
                      fontSize: '0.95rem',
                      lineHeight: '1.6'
                    }}>
                      {message.content}
                    </div>
                    
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: message.type === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-light)',
                      marginTop: '0.75rem',
                      textAlign: 'right'
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
                    width: '36px', 
                    height: '36px', 
                    background: 'var(--primary-ecru)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <Bot size={18} color="var(--text-dark)" />
                  </div>
                  <div style={{ 
                    background: 'white', 
                    padding: '1rem 1.25rem', 
                    borderRadius: '16px',
                    border: '1px solid var(--border-ecru)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div className="spinner"></div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-medium)' }}>
                      Votre assistant réfléchit...
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
              placeholder="Posez votre question ou décrivez votre projet..."
              style={{
                flex: 1,
                padding: '0.875rem 1rem',
                border: '1px solid var(--border-ecru)',
                borderRadius: '12px',
                background: 'white',
                resize: 'vertical',
                minHeight: '48px',
                maxHeight: '120px',
                fontFamily: 'inherit',
                fontSize: '0.95rem'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="btn btn-primary"
              style={{ 
                padding: '0.875rem 1.25rem',
                borderRadius: '12px'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Actions rapides et informations */}
        <div>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
              Actions rapides
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setInputMessage(action.action)}
                    className="btn btn-secondary"
                    style={{ 
                      textAlign: 'left', 
                      justifyContent: 'flex-start',
                      fontSize: '0.95rem',
                      padding: '1rem 1.25rem',
                      borderRadius: '12px'
                    }}
                  >
                    <Icon size={18} style={{ marginRight: '0.75rem' }} />
                    {action.text}
                    <ArrowRight size={16} style={{ marginLeft: 'auto' }} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card" style={{ background: 'var(--accent-ecru)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
              💡 Comment ça marche ?
            </h3>
            <div style={{ color: 'var(--text-medium)', fontSize: '0.9rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Votre assistant personnel :</strong>
              </p>
              <ul style={{ paddingLeft: '1rem', lineHeight: '1.6' }}>
                <li>🎯 Comprend vos besoins précis</li>
                <li>🔍 Recherche dans notre base de données</li>
                <li>📊 Analyse les prix du marché</li>
                <li>🏠 Évalue les quartiers</li>
                <li>💡 Donne des conseils personnalisés</li>
                <li>📱 Reste disponible 24h/24</li>
              </ul>
              
              <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-dark)' }}>
                Plus vous me donnez d'informations, plus mes recommandations seront précises ! 😊
              </p>
            </div>
          </div>

          <div className="card" style={{ marginTop: '2rem', background: 'var(--primary-ecru)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Heart size={20} color="var(--text-dark)" />
              <h4 style={{ margin: 0, color: 'var(--text-dark)' }}>
                Service gratuit
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-medium)' }}>
              Notre assistant IA est entièrement gratuit et sans engagement. 
              Nous vous accompagnons dans votre projet immobilier sans frais cachés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientChat;
