import React from 'react';
import Assistant from './Assistant';

const Home = () => {

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="card" style={{ textAlign: 'center', padding: '3rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-light)' }}>
          AI Immobilier
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-medium)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Assistant IA chef d'orchestre : analysez vos biens immobiliers, évaluez leur potentiel, 
          optimisez vos investissements et accompagnez vos clients avec 8 agents spécialisés.
        </p>
      </div>

      {/* Assistant IA intégré */}
      <Assistant />

    </div>
  );
};

export default Home;
