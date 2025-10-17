import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Assistant from '../pages/Assistant';

const AgentView = () => {
  const [activeTab, setActiveTab] = useState('assistant');
  const tabs = [
    { id: 'assistant', label: 'Assistant IA', icon: MessageSquare }
  ];

  return (
    <div className="agent-view" style={{ paddingTop: '6rem' }}>
      <div className="section">
        {/* Titre principal - Plus de bandeau d'onglets */}
        <div className="glass-card" style={{ marginBottom: '1rem', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare className="w-5 h-5 text-primary" />
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Assistant IA Azura</h1>
          </div>
        </div>

        {/* Interface de chat - pleine largeur */}
        <div className="glass-card">
          <div style={{ height: '600px', border: '1px solid oklch(0.85 0.02 70)', borderRadius: '12px', overflow: 'hidden' }}>
            <Assistant />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentView;
