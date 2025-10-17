import React, { useState } from 'react';
import { MessageSquare, Mail, BarChart3, Home, Users, TrendingUp, Send, Plus, Filter, Search } from 'lucide-react';
import Assistant from '../pages/Assistant';
import EmailChatbot from './EmailChatbot';

const AgentView = () => {
  const [activeTab, setActiveTab] = useState('assistant');
  const tabs = [
    { id: 'assistant', label: 'Assistant IA', icon: MessageSquare },
    { id: 'emails', label: 'Emails', icon: Mail }
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
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Mail className="w-5 h-5 text-primary" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Assistant Email Azura</h2>
            </div>

            {/* Interface de chat Email - pleine largeur */}
            <div style={{ height: '600px', border: '1px solid oklch(0.85 0.02 70)', borderRadius: '12px', overflow: 'hidden' }}>
              <EmailChatbot />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AgentView;
