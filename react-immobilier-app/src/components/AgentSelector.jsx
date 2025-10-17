import React from 'react';
import { CheckCircle, Circle, BarChart3, MapPin, Calculator, Zap, Camera, Target, FileText, Building2 } from 'lucide-react';

const AgentSelector = ({ selectedAgents, onAgentToggle }) => {
  const agents = [
    {
      id: 'market_analysis',
      name: 'Agent Analyse Marché',
      description: 'Analyse les tendances de prix et la dynamique du marché',
      icon: BarChart3,
      category: 'Analyse'
    },
    {
      id: 'geolocation',
      name: 'Agent Géolocalisation',
      description: 'Évalue la qualité de vie et l\'accessibilité du quartier',
      icon: MapPin,
      category: 'Localisation'
    },
    {
      id: 'rentability',
      name: 'Agent Calcul Rentabilité',
      description: 'Calcule le ROI et optimise la rentabilité locative',
      icon: Calculator,
      category: 'Finance'
    },
    {
      id: 'energy',
      name: 'Agent Énergie',
      description: 'Audit énergétique et recommandations d\'amélioration',
      icon: Zap,
      category: 'Environnement'
    },
    {
      id: 'photos',
      name: 'Agent Analyse Photos',
      description: 'Détecte les défauts et évalue l\'état du bien',
      icon: Camera,
      category: 'Inspection'
    },
    {
      id: 'recommendations',
      name: 'Agent Recommandations',
      description: 'Matching propriété-profil acheteur personnalisé',
      icon: Target,
      category: 'Conseil'
    },
    {
      id: 'purchase',
      name: 'Agent Dossier Achat',
      description: 'Checklist complète et accompagnement d\'achat',
      icon: FileText,
      category: 'Administratif'
    },
    {
      id: 'evaluator',
      name: 'Agent Évaluateur',
      description: 'Synthèse globale et évaluation complète',
      icon: Building2,
      category: 'Synthèse'
    }
  ];

  const categories = [...new Set(agents.map(agent => agent.category))];

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
        Sélectionnez les agents à utiliser
      </h2>
      
      {categories.map(category => (
        <div key={category} style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: 'var(--text-dark)', 
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--border-ecru)'
          }}>
            {category}
          </h3>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {agents
              .filter(agent => agent.category === category)
              .map(agent => {
                const Icon = agent.icon;
                const isSelected = selectedAgents.includes(agent.id);
                
                return (
                  <div
                    key={agent.id}
                    className="agent-checkbox"
                    onClick={() => onAgentToggle(agent.id)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onAgentToggle(agent.id)}
                    />
                    
                    {isSelected ? (
                      <CheckCircle size={20} color="var(--text-dark)" />
                    ) : (
                      <Circle size={20} color="var(--text-light)" />
                    )}
                    
                    <div className="agent-info">
                      <div className="agent-name">
                        <Icon size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        {agent.name}
                      </div>
                      <div className="agent-description">
                        {agent.description}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
      
      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem', 
        background: 'var(--accent-ecru)', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: 'var(--text-medium)'
      }}>
        💡 <strong>Conseil :</strong> L'Agent Évaluateur peut être utilisé seul pour une analyse complète, 
        ou combiné avec d'autres agents pour des analyses spécialisées.
      </div>
    </div>
  );
};

export default AgentSelector;
