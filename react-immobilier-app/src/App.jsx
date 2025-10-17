import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ClientView from './components/ClientView';
import AgentView from './components/AgentView';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('client');

  return (
    <div className="app">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      {currentView === 'client' && <ClientView />}
      {currentView === 'agent' && <AgentView />}
    </div>
  );
}

export default App;
