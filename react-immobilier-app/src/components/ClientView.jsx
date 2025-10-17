import React from 'react';
import { Sparkles, MapPin, Bed, Bath, Square, ArrowRight, Mail, Phone, Home, TrendingUp, Users } from 'lucide-react';
import ClientChatbot from './ClientChatbot';

const ClientView = () => {
  return (
    <div className="client-view">
      {/* Section Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Trouvez Votre <span className="highlight">Propriété Idéale</span> avec Azura
          </h1>
          
          <p>
            Découvrez des milliers de propriétés avec l'aide de notre assistant IA intelligent. 
            Trouvez la maison de vos rêves en quelques clics.
          </p>
          
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Explorer les Propriétés
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn btn-outline">
              En Savoir Plus
            </button>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Propriétés</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">20+</div>
              <div className="stat-label">Années</div>
            </div>
          </div>
        </div>
        
        {/* Assistant IA Client */}
        <div className="chat-container" style={{ height: '500px' }}>
          <ClientChatbot />
        </div>
      </section>

      {/* Section Propriétés en Vedette */}
      <section className="section" style={{ backgroundColor: 'oklch(0.95 0.02 80)' }}>
        <h2 className="section-title">Propriétés en Vedette</h2>
        
        <div className="grid-3">
          <div className="property-card fade-in-up">
            <div className="property-image">
              <div className="property-price">450 000 €</div>
            </div>
            <div className="property-content">
              <h3 className="property-title">Appartement 3 pièces</h3>
              <div className="property-location">
                <MapPin className="w-4 h-4" />
                Paris 15ème
              </div>
              <div className="property-features">
                <span><Bed className="w-4 h-4 inline mr-1" />3 chambres</span>
                <span><Bath className="w-4 h-4 inline mr-1" />2 sdb</span>
                <span><Square className="w-4 h-4 inline mr-1" />85m²</span>
              </div>
            </div>
          </div>
          
          <div className="property-card fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="property-image">
              <div className="property-price">320 000 €</div>
            </div>
            <div className="property-content">
              <h3 className="property-title">Maison familiale</h3>
              <div className="property-location">
                <MapPin className="w-4 h-4" />
                Boulogne-Billancourt
              </div>
              <div className="property-features">
                <span><Bed className="w-4 h-4 inline mr-1" />4 chambres</span>
                <span><Bath className="w-4 h-4 inline mr-1" />3 sdb</span>
                <span><Square className="w-4 h-4 inline mr-1" />120m²</span>
              </div>
            </div>
          </div>
          
          <div className="property-card fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="property-image">
              <div className="property-price">280 000 €</div>
            </div>
            <div className="property-content">
              <h3 className="property-title">Studio moderne</h3>
              <div className="property-location">
                <MapPin className="w-4 h-4" />
                Paris 11ème
              </div>
              <div className="property-features">
                <span><Bed className="w-4 h-4 inline mr-1" />1 chambre</span>
                <span><Bath className="w-4 h-4 inline mr-1" />1 sdb</span>
                <span><Square className="w-4 h-4 inline mr-1" />35m²</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="section">
        <h2 className="section-title">Nos Services</h2>
        
        <div className="grid-3">
          <div className="service-card">
            <div className="service-icon">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="service-title">Achat Immobilier</h3>
            <p className="service-description">
              Trouvez la propriété parfaite avec notre sélection personnalisée et notre accompagnement expert.
            </p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="service-title">Investissement</h3>
            <p className="service-description">
              Maximisez votre rendement avec nos conseils d'investissement et notre analyse de marché.
            </p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="service-title">Accompagnement</h3>
            <p className="service-description">
              Bénéficiez d'un suivi personnalisé tout au long de votre projet immobilier.
            </p>
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section className="section" style={{ backgroundColor: 'oklch(0.95 0.02 80)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">À Propos d'Azura</h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '2rem', opacity: 0.8 }}>
            Nous révolutionnons l'immobilier avec l'intelligence artificielle. Notre plateforme connecte 
            propriétaires et acheteurs de manière intelligente, offrant une expérience personnalisée et 
            des conseils d'experts à chaque étape.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Découvrir notre histoire
            </button>
            <button className="btn btn-outline">
              Rejoindre l'équipe
            </button>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="section">
        <h2 className="section-title">Contactez-nous</h2>
        
        <form className="contact-form">
          <div className="form-group">
            <label className="form-label">Prénom</label>
            <input type="text" className="form-input" placeholder="Votre prénom" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Nom</label>
            <input type="text" className="form-input" placeholder="Votre nom" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="votre@email.com" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" placeholder="Décrivez votre projet immobilier..."></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <Mail className="w-4 h-4 mr-2" />
            Envoyer le message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ClientView;
