import React from 'react';
import { CheckCircle, AlertCircle, TrendingUp, TrendingDown, DollarSign, MapPin, Zap, Camera, Target, FileText, Building2, Download, Eye } from 'lucide-react';

const AnalysisResults = ({ results, onGenerateReport }) => {
  const getAgentIcon = (agentName) => {
    const icons = {
      'Agent Analyse Marché': TrendingUp,
      'Agent Géolocalisation': MapPin,
      'Agent Calcul Rentabilité': DollarSign,
      'Agent Énergie': Zap,
      'Agent Analyse Photos': Camera,
      'Agent Recommandations': Target,
      'Agent Dossier Achat': FileText,
      'Agent Évaluateur': Building2
    };
    return icons[agentName] || Building2;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-excellent';
    if (score >= 60) return 'score-good';
    if (score >= 40) return 'score-average';
    return 'score-poor';
  };

  const formatScore = (score) => {
    if (typeof score === 'number') {
      return `${score}/100`;
    }
    return score;
  };

  if (!results || results.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <Eye size={48} color="var(--text-light)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ color: 'var(--text-medium)', marginBottom: '0.5rem' }}>
          Aucune analyse disponible
        </h3>
        <p style={{ color: 'var(--text-light)' }}>
          Sélectionnez des agents et lancez une analyse pour voir les résultats
        </p>
      </div>
    );
  }

  return (
    <div className="analysis-results">
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: 'var(--text-dark)' }}>
            Résultats d'analyse
          </h2>
          <button 
            onClick={onGenerateReport}
            className="btn btn-primary"
          >
            <Download size={16} />
            Générer le rapport PDF
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="score-display score-excellent">
            <CheckCircle size={16} />
            Analyses terminées: {results.length}
          </div>
          <div className="score-display score-good">
            <TrendingUp size={16} />
            Confiance moyenne: {Math.round(results.reduce((acc, r) => acc + (r.confidence_score || 0.8), 0) / results.length * 100)}%
          </div>
        </div>
      </div>

      {results.map((result, index) => {
        const Icon = getAgentIcon(result.agent_name);
        
        return (
          <div key={index} className="result-section fade-in">
            <div className="result-title">
              <Icon size={20} />
              {result.agent_name}
              {result.confidence_score && (
                <span className={`score-display ${getScoreColor(result.confidence_score * 100)}`}>
                  {Math.round(result.confidence_score * 100)}% confiance
                </span>
              )}
            </div>
            
            <div className="result-content">
              {result.key_findings && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
                    Points clés
                  </h4>
                  <p>{result.key_findings}</p>
                </div>
              )}
              
              {result.detailed_results && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
                    Résultats détaillés
                  </h4>
                  <p>{result.detailed_results}</p>
                </div>
              )}
              
              {result.recommendations && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
                    Recommandations
                  </h4>
                  <p>{result.recommendations}</p>
                </div>
              )}
              
              {result.risk_factors && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
                    Facteurs de risque
                  </h4>
                  <p style={{ color: 'var(--text-medium)' }}>{result.risk_factors}</p>
                </div>
              )}
              
              {result.opportunity_score && (
                <div>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
                    Score d'opportunité
                  </h4>
                  <span className={`score-display ${getScoreColor(result.opportunity_score * 10)}`}>
                    {formatScore(result.opportunity_score)}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Synthèse globale si Agent Évaluateur présent */}
      {results.some(r => r.agent_name === 'Agent Évaluateur') && (
        <div className="result-section" style={{ background: 'var(--accent-ecru)', border: '2px solid var(--border-ecru)' }}>
          <div className="result-title">
            <Building2 size={20} />
            Synthèse globale et recommandation finale
          </div>
          <div className="result-content">
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              L'analyse complète de cette propriété révèle un potentiel {results.find(r => r.agent_name === 'Agent Évaluateur')?.opportunity_score > 7 ? 'excellent' : 'intéressant'} 
              avec des opportunités d'optimisation identifiées. 
              Les recommandations des différents agents convergent vers une stratégie d'achat/vente {results.find(r => r.agent_name === 'Agent Évaluateur')?.opportunity_score > 7 ? 'recommandée' : 'à considérer'}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
