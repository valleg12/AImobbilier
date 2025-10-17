import React from 'react';
import { Sparkles } from 'lucide-react';

const Navigation = ({ currentView, setCurrentView }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/" className="logo">
          <Sparkles className="inline-block w-6 h-6 mr-2" />
          AI Immobilier
        </a>
        
        <div className="nav-buttons">
          <button
            className={`btn ${currentView === 'client' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCurrentView('client')}
          >
            Vue Client
          </button>
          <button
            className={`btn ${currentView === 'agent' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCurrentView('agent')}
          >
            Espace Agent
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
