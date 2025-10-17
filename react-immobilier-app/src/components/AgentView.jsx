import React, { useState } from 'react';
import { MessageSquare, Mail, BarChart3, Home, Users, TrendingUp, Send, Plus, Filter, Search } from 'lucide-react';
import Assistant from '../pages/Assistant';

const AgentView = () => {
  const [activeTab, setActiveTab] = useState('assistant');
  const [activeSubTab, setActiveSubTab] = useState('inbox');

  const tabs = [
    { id: 'assistant', label: 'Assistant IA', icon: MessageSquare },
    { id: 'emails', label: 'Emails', icon: Mail }
  ];

  const subTabs = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'categories', label: 'Catégories' },
    { id: 'sentiment', label: 'Sentiment' },
    { id: 'priorities', label: 'Priorités' }
  ];

  return (
    <div className="agent-view" style={{ paddingTop: '6rem' }}>
      <div className="section">
        {/* Onglets principaux - Bandeau plus fin */}
        <div className="glass-card" style={{ marginBottom: '1rem', padding: '0.75rem 1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'assistant' && (
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Assistant IA Azura</h2>
            </div>

            {/* Interface de chat - pleine largeur */}
            <div style={{ height: '600px', border: '1px solid oklch(0.85 0.02 70)', borderRadius: '12px', overflow: 'hidden' }}>
              <Assistant />
            </div>
          </div>
        )}

        {activeTab === 'emails' && (
          <div>
            {/* Sous-onglets pour Emails */}
            <div className="glass-card" style={{ marginBottom: '1rem', padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className={`btn ${activeSubTab === 'inbox' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setActiveSubTab('inbox')}
                  style={{ 
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Boîte de réception
                </button>
                <button
                  className={`btn ${activeSubTab === 'analysis' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setActiveSubTab('analysis')}
                  style={{ 
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <BarChart3 className="w-4 h-4" />
                  Analyse IA
                </button>
              </div>
            </div>

            {/* Contenu Boîte de réception */}
            {activeSubTab === 'inbox' && (
              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <Mail className="w-5 h-5 text-primary" />
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Gestion des Emails</h2>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Rechercher dans les emails..." 
                      className="form-input" 
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                  <button className="btn btn-outline">
                    <Filter className="w-4 h-4" />
                    Filtrer
                  </button>
                </div>

                <div style={{ textAlign: 'center', padding: '3rem', color: 'oklch(0.25 0.02 60)', opacity: 0.7 }}>
                  <Mail className="w-12 h-12 mx-auto mb-4" />
                  <p>Interface de gestion des emails en cours de développement...</p>
                </div>
              </div>
            )}

            {/* Contenu Analyse IA */}
            {activeSubTab === 'analysis' && (
              <div>
                {/* Chat IA pour analyse */}
                <div className="grid-2" style={{ marginBottom: '2rem' }}>
                  <div className="glass-card" style={{ gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Analyse IA des Emails</h2>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                      <div className="stat-card">
                        <div className="stat-number">1,247</div>
                        <div className="stat-label">Total</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">89</div>
                        <div className="stat-label">Non lus</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">156</div>
                        <div className="stat-label">Favoris</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">94%</div>
                        <div className="stat-label">Taux réponse</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', padding: '2rem', color: 'oklch(0.25 0.02 60)', opacity: 0.7 }}>
                      <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                      <p>Interface d'analyse IA en cours de développement...</p>
                    </div>
                  </div>

                  <div className="glass-card">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Statistiques Rapides</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="badge" style={{ justifyContent: 'space-between' }}>
                        <span>Leads</span>
                        <span style={{ fontWeight: '600' }}>23</span>
                      </div>
                      <div className="badge" style={{ justifyContent: 'space-between' }}>
                        <span>Visites</span>
                        <span style={{ fontWeight: '600' }}>12</span>
                      </div>
                      <div className="badge" style={{ justifyContent: 'space-between' }}>
                        <span>Offres</span>
                        <span style={{ fontWeight: '600' }}>5</span>
                      </div>
                      <div className="badge" style={{ justifyContent: 'space-between' }}>
                        <span>Questions</span>
                        <span style={{ fontWeight: '600' }}>8</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Analytique */}
                <div className="glass-card">
                  <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid oklch(0.85 0.02 70)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    {subTabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`btn ${activeSubTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveSubTab(tab.id)}
                        style={{ fontSize: '0.875rem' }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {activeSubTab === 'overview' && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'oklch(0.25 0.02 60)', opacity: 0.7 }}>
                      <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                      <p>Vue d'ensemble des analyses en cours de développement...</p>
                    </div>
                  )}

                  {activeSubTab === 'categories' && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'oklch(0.25 0.02 60)', opacity: 0.7 }}>
                      <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                      <p>Analyse par catégories en cours de développement...</p>
                    </div>
                  )}

                  {activeSubTab === 'sentiment' && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'oklch(0.25 0.02 60)', opacity: 0.7 }}>
                      <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                      <p>Analyse du sentiment en cours de développement...</p>
                    </div>
                  )}

                  {activeSubTab === 'priorities' && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'oklch(0.25 0.02 60)', opacity: 0.7 }}>
                      <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                      <p>Gestion des priorités en cours de développement...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AgentView;
