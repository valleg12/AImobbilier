function createAIAnalysisResultsDatabase() {
  // Création de la feuille AI Analysis Results
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('AI_Analysis_Results');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'property_id', 'agent_name', 'analysis_type',
    'analysis_status', 'confidence_score', 'processing_time_seconds',
    'input_data_summary', 'key_findings', 'detailed_results',
    'recommendations', 'risk_factors', 'opportunity_score',
    'created_at', 'updated_at', 'version'
  ];
  
  // Ajouter les en-têtes
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  var analysisData = [];
  
  // Générer 200 analyses réparties entre les 8 agents
  for (var i = 1; i <= 200; i++) {
    var analysis = generateAIAnalysis(i);
    analysisData.push(analysis);
  }
  
  // Ajouter toutes les données
  if (analysisData.length > 0) {
    sheet.getRange(2, 1, analysisData.length, headers.length).setValues(analysisData);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données AI Analysis Results créée avec ' + analysisData.length + ' analyses !');
}

function generateAIAnalysis(index) {
  var analysis = [
    'ANALYSIS_' + String(index).padStart(4, '0'), // id
    'PROP_' + String(Math.floor(Math.random() * 100) + 1).padStart(3, '0') // property_id
  ];
  
  // Agent et type d'analyse
  var agentInfo = generateAgentInfo();
  analysis = analysis.concat(agentInfo);
  
  // Statut et métriques
  var statusAndMetrics = generateStatusAndMetrics();
  analysis = analysis.concat(statusAndMetrics);
  
  // Résumé des données d'entrée
  var inputSummary = generateInputSummary(agentInfo[0]);
  analysis.push(inputSummary);
  
  // Résultats détaillés
  var results = generateAnalysisResults(agentInfo[0], agentInfo[1]);
  analysis = analysis.concat(results);
  
  // Recommandations et risques
  var recommendationsAndRisks = generateRecommendationsAndRisks(agentInfo[0]);
  analysis = analysis.concat(recommendationsAndRisks);
  
  // Score d'opportunité
  var opportunityScore = generateOpportunityScore(agentInfo[0]);
  analysis.push(opportunityScore);
  
  // Dates et version
  var now = new Date();
  analysis.push(now.toISOString()); // created_at
  analysis.push(now.toISOString()); // updated_at
  analysis.push('v1.0'); // version
  
  return analysis;
}

function generateAgentInfo() {
  var agents = [
    'Agent_Calcul_Rentabilite',
    'Agent_Calcul_Rentabilite',
    'Agent_Calcul_Rentabilite', // 3 analyses rentabilité
    'Agent_Analyse_Marche',
    'Agent_Analyse_Marche',
    'Agent_Analyse_Marche', // 3 analyses marché
    'Agent_Geolocalisation',
    'Agent_Geolocalisation',
    'Agent_Geolocalisation', // 3 analyses géolocalisation
    'Agent_Energie',
    'Agent_Energie', // 2 analyses énergie
    'Agent_Recommandations',
    'Agent_Recommandations', // 2 analyses recommandations
    'Agent_Analyse_Photos',
    'Agent_Analyse_Photos', // 2 analyses photos
    'Agent_Estimation_Prix',
    'Agent_Estimation_Prix', // 2 analyses prix
    'Agent_Conformite_Legale' // 1 analyse conformité
  ];
  
  var agentName = agents[Math.floor(Math.random() * agents.length)];
  
  var analysisTypes = {
    'Agent_Calcul_Rentabilite': ['roi_analysis', 'rental_yield_calculation', 'investment_scenario'],
    'Agent_Analyse_Marche': ['market_trend_analysis', 'price_evolution', 'demand_supply_analysis'],
    'Agent_Geolocalisation': ['location_scoring', 'transport_analysis', 'services_analysis'],
    'Agent_Energie': ['energy_audit', 'consumption_analysis', 'improvement_recommendations'],
    'Agent_Recommandations': ['buyer_matching', 'property_suitability', 'market_opportunity'],
    'Agent_Analyse_Photos': ['defect_detection', 'condition_assessment', 'quality_analysis'],
    'Agent_Estimation_Prix': ['price_estimation', 'market_comparison', 'valuation_analysis'],
    'Agent_Conformite_Legale': ['legal_compliance', 'regulation_check', 'document_validation']
  };
  
  var availableTypes = analysisTypes[agentName] || ['general_analysis'];
  var analysisType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  
  return [agentName, analysisType];
}

function generateStatusAndMetrics() {
  var statuses = ['completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'in_progress', 'failed', 'pending'];
  var status = statuses[Math.floor(Math.random() * statuses.length)];
  
  var confidenceScore = 0.7 + Math.random() * 0.3; // 0.7 à 1.0
  var processingTime = 5 + Math.random() * 45; // 5 à 50 secondes
  
  return [
    status, // analysis_status
    Math.round(confidenceScore * 100) / 100, // confidence_score
    Math.round(processingTime * 10) / 10 // processing_time_seconds
  ];
}

function generateInputSummary(agentName) {
  var inputSummaries = {
    'Agent_Calcul_Rentabilite': 'Données financières: prix ' + (200000 + Math.random() * 800000).toFixed(0) + '€, charges ' + (200 + Math.random() * 800).toFixed(0) + '€/mois, potentiel locatif estimé',
    'Agent_Analyse_Marche': 'Données marché: ' + (12 + Math.random() * 36).toFixed(0) + ' mois d\'historique, ' + (50 + Math.random() * 150).toFixed(0) + ' biens comparables, évolution prix ' + (Math.random() * 20 - 10).toFixed(1) + '%',
    'Agent_Geolocalisation': 'Données géographiques: coordonnées GPS, ' + (5 + Math.random() * 15).toFixed(0) + ' services proches, ' + (2 + Math.random() * 8).toFixed(0) + ' stations transport',
    'Agent_Energie': 'Données énergétiques: DPE classe ' + ['A', 'B', 'C', 'D', 'E', 'F', 'G'][Math.floor(Math.random() * 7)] + ', ' + (80 + Math.random() * 320).toFixed(0) + ' kWh/m²/an',
    'Agent_Recommandations': 'Profil acheteur: budget ' + (300000 + Math.random() * 700000).toFixed(0) + '€, ' + (2 + Math.random() * 4).toFixed(0) + ' pièces, préférences localisation',
    'Agent_Analyse_Photos': 'Photos propriété: ' + (8 + Math.random() * 17).toFixed(0) + ' images, résolution HD, angles multiples (extérieur, intérieur, détails)',
    'Agent_Estimation_Prix': 'Caractéristiques: ' + (50 + Math.random() * 150).toFixed(0) + ' m², ' + (2 + Math.random() * 5).toFixed(0) + ' pièces, état ' + ['excellent', 'bon', 'moyen'][Math.floor(Math.random() * 3)],
    'Agent_Conformite_Legale': 'Documents légaux: acte de vente, diagnostics, permis, ' + (3 + Math.random() * 7).toFixed(0) + ' documents analysés'
  };
  
  return inputSummaries[agentName] || 'Données multi-sources pour analyse complète';
}

function generateAnalysisResults(agentName, analysisType) {
  var keyFindings = generateKeyFindings(agentName, analysisType);
  var detailedResults = generateDetailedResults(agentName, analysisType);
  
  return [keyFindings, detailedResults];
}

function generateKeyFindings(agentName, analysisType) {
  var findings = {
    'Agent_Calcul_Rentabilite': {
      'roi_analysis': 'ROI annuel estimé à ' + (3 + Math.random() * 7).toFixed(1) + '%, rentabilité ' + ['faible', 'moyenne', 'bonne', 'excellente'][Math.floor(Math.random() * 4)],
      'rental_yield_calculation': 'Rendement locatif brut ' + (4 + Math.random() * 6).toFixed(1) + '%, charges déductibles ' + (30 + Math.random() * 40).toFixed(0) + '%',
      'investment_scenario': 'Scénario optimiste: +' + (5 + Math.random() * 15).toFixed(1) + '% en 5 ans, scénario prudent: +' + (2 + Math.random() * 8).toFixed(1) + '%'
    },
    'Agent_Analyse_Marche': {
      'market_trend_analysis': 'Tendance ' + ['haussière', 'baissière', 'stable'][Math.floor(Math.random() * 3)] + ', évolution ' + (Math.random() * 10 - 5).toFixed(1) + '% sur 12 mois',
      'price_evolution': 'Prix au m² en ' + ['hausse', 'baisse', 'stabilité'][Math.floor(Math.random() * 3)] + ' de ' + (Math.random() * 8).toFixed(1) + '%',
      'demand_supply_analysis': 'Demande ' + ['forte', 'moyenne', 'faible'][Math.floor(Math.random() * 3)] + ', offre ' + ['abondante', 'limitée', 'rarefiée'][Math.floor(Math.random() * 3)]
    },
    'Agent_Geolocalisation': {
      'location_scoring': 'Score localisation ' + (6 + Math.random() * 4).toFixed(1) + '/10, points forts: transport et commerces',
      'transport_analysis': 'Accessibilité excellente: ' + (5 + Math.random() * 15).toFixed(0) + ' min métro, ' + (10 + Math.random() * 20).toFixed(0) + ' min centre-ville',
      'services_analysis': 'Services proches: ' + (8 + Math.random() * 12).toFixed(0) + ' commerces, ' + (2 + Math.random() * 5).toFixed(0) + ' écoles, ' + (1 + Math.random() * 3).toFixed(0) + ' hôpitaux'
    },
    'Agent_Energie': {
      'energy_audit': 'DPE ' + ['A', 'B', 'C', 'D', 'E', 'F', 'G'][Math.floor(Math.random() * 7)] + ', consommation ' + (80 + Math.random() * 320).toFixed(0) + ' kWh/m²/an',
      'consumption_analysis': 'Poste chauffage: ' + (40 + Math.random() * 30).toFixed(0) + '% consommation, potentiel économie: ' + (15 + Math.random() * 35).toFixed(0) + '%',
      'improvement_recommendations': 'Travaux recommandés: isolation toiture (' + (5000 + Math.random() * 15000).toFixed(0) + '€), fenêtres (' + (3000 + Math.random() * 12000).toFixed(0) + '€)'
    },
    'Agent_Recommandations': {
      'buyer_matching': 'Correspondance ' + (70 + Math.random() * 30).toFixed(0) + '% avec profils cibles, ' + (3 + Math.random() * 7).toFixed(0) + ' profils compatibles',
      'property_suitability': 'Bien adapté aux ' + ['jeunes couples', 'familles', 'investisseurs', 'seniors'][Math.floor(Math.random() * 4)] + ', score adéquation ' + (7 + Math.random() * 3).toFixed(1) + '/10',
      'market_opportunity': 'Opportunité ' + ['rare', 'intéressante', 'standard'][Math.floor(Math.random() * 3)] + ' sur le marché local, délai vente estimé ' + (30 + Math.random() * 120).toFixed(0) + ' jours'
    },
    'Agent_Analyse_Photos': {
      'defect_detection': 'Détection de ' + (1 + Math.random() * 5).toFixed(0) + ' défauts mineurs, état général ' + ['excellent', 'bon', 'moyen'][Math.floor(Math.random() * 3)],
      'condition_assessment': 'Qualité finitions ' + (6 + Math.random() * 4).toFixed(1) + '/10, rénovation ' + ['non nécessaire', 'cosmétique', 'importante'][Math.floor(Math.random() * 3)],
      'quality_analysis': 'Luminosité ' + ['excellente', 'bonne', 'moyenne', 'faible'][Math.floor(Math.random() * 4)] + ', espaces ' + ['spacieux', 'standard', 'compacts'][Math.floor(Math.random() * 3)]
    },
    'Agent_Estimation_Prix': {
      'price_estimation': 'Prix estimé ' + (250000 + Math.random() * 750000).toFixed(0) + '€, fourchette ' + (200000 + Math.random() * 100000).toFixed(0) + '-' + (300000 + Math.random() * 100000).toFixed(0) + '€',
      'market_comparison': 'Prix ' + ['concurrentiel', 'au-dessus', 'en-dessous'][Math.floor(Math.random() * 3)] + ' du marché de ' + (Math.random() * 15).toFixed(1) + '%',
      'valuation_analysis': 'Valeur vénale ' + (220000 + Math.random() * 780000).toFixed(0) + '€, valeur locative ' + (800 + Math.random() * 2200).toFixed(0) + '€/mois'
    },
    'Agent_Conformite_Legale': {
      'legal_compliance': 'Conformité ' + ['totale', 'partielle', 'non conforme'][Math.floor(Math.random() * 3)] + ', ' + (1 + Math.random() * 3).toFixed(0) + ' points d\'attention',
      'regulation_check': 'Réglementation ' + ['respectée', 'partiellement respectée'][Math.floor(Math.random() * 2)] + ', ' + (0 + Math.random() * 2).toFixed(0) + ' non-conformités mineures',
      'document_validation': 'Documents ' + ['complets', 'partiellement complets'][Math.floor(Math.random() * 2)] + ', ' + (1 + Math.random() * 4).toFixed(0) + ' éléments à compléter'
    }
  };
  
  var agentFindings = findings[agentName] || {};
  return agentFindings[analysisType] || 'Analyse complétée avec ' + (80 + Math.random() * 20).toFixed(0) + '% de confiance';
}

function generateDetailedResults(agentName, analysisType) {
  var results = {
    'Agent_Calcul_Rentabilite': 'Détail calculs: ROI brut ' + (4 + Math.random() * 6).toFixed(1) + '%, net ' + (2.5 + Math.random() * 4.5).toFixed(1) + '%, cash-flow ' + (Math.random() * 500 - 100).toFixed(0) + '€/mois',
    'Agent_Analyse_Marche': 'Analyse détaillée: ' + (50 + Math.random() * 100).toFixed(0) + ' transactions analysées, corrélation prix/surface R²=' + (0.6 + Math.random() * 0.3).toFixed(2),
    'Agent_Geolocalisation': 'Cartographie complète: ' + (10 + Math.random() * 20).toFixed(0) + ' points d\'intérêt, rayon ' + (500 + Math.random() * 1000).toFixed(0) + 'm, score mobilité ' + (7 + Math.random() * 3).toFixed(1) + '/10',
    'Agent_Energie': 'Audit énergétique: postes détaillés, économies potentielles ' + (800 + Math.random() * 2200).toFixed(0) + '€/an, travaux prioritaires identifiés',
    'Agent_Recommandations': 'Matching algorithmique: ' + (20 + Math.random() * 30).toFixed(0) + ' critères analysés, ' + (3 + Math.random() * 7).toFixed(0) + ' profils compatibles trouvés',
    'Agent_Analyse_Photos': 'Analyse d\'images: ' + (8 + Math.random() * 17).toFixed(0) + ' photos traitées, ' + (1 + Math.random() * 5).toFixed(0) + ' anomalies détectées, score qualité ' + (7 + Math.random() * 3).toFixed(1) + '/10',
    'Agent_Estimation_Prix': 'Modèle prédictif: ' + (100 + Math.random() * 200).toFixed(0) + ' variables, précision ' + (85 + Math.random() * 15).toFixed(0) + '%, intervalle confiance ±' + (5 + Math.random() * 10).toFixed(1) + '%',
    'Agent_Conformite_Legale': 'Vérification légale: ' + (15 + Math.random() * 25).toFixed(0) + ' points contrôlés, ' + (0 + Math.random() * 3).toFixed(0) + ' non-conformités, score conformité ' + (85 + Math.random() * 15).toFixed(0) + '%'
  };
  
  return results[agentName] || 'Résultats détaillés de l\'analyse avec métriques complètes';
}

function generateRecommendationsAndRisks(agentName) {
  var recommendations = generateRecommendations(agentName);
  var riskFactors = generateRiskFactors(agentName);
  
  return [recommendations, riskFactors];
}

function generateRecommendations(agentName) {
  var recommendations = {
    'Agent_Calcul_Rentabilite': 'Recommandation: ' + ['Investissement intéressant', 'Opportunité à saisir', 'Attention aux charges', 'Rentabilité insuffisante'][Math.floor(Math.random() * 4)],
    'Agent_Analyse_Marche': 'Recommandation: ' + ['Marché porteur', 'Attendre une baisse', 'Prix correct', 'Opportunité limitée'][Math.floor(Math.random() * 4)],
    'Agent_Geolocalisation': 'Recommandation: ' + ['Localisation excellente', 'Transport pratique', 'Services complets', 'Accessibilité correcte'][Math.floor(Math.random() * 4)],
    'Agent_Energie': 'Recommandation: ' + ['Travaux d\'isolation', 'Remplacement chaudière', 'Fenêtres double vitrage', 'DPE à améliorer'][Math.floor(Math.random() * 4)],
    'Agent_Recommandations': 'Recommandation: ' + ['Bien adapté au profil', 'Correspondance partielle', 'Alternatives à considérer', 'Parfait pour cible'][Math.floor(Math.random() * 4)],
    'Agent_Analyse_Photos': 'Recommandation: ' + ['État excellent', 'Petits travaux nécessaires', 'Rénovation recommandée', 'Inspection approfondie'][Math.floor(Math.random() * 4)],
    'Agent_Estimation_Prix': 'Recommandation: ' + ['Prix de marché', 'Négociation possible', 'Prix attractif', 'Attention surévaluation'][Math.floor(Math.random() * 4)],
    'Agent_Conformite_Legale': 'Recommandation: ' + ['Conformité OK', 'Documents à compléter', 'Vérifications nécessaires', 'Aucun problème'][Math.floor(Math.random() * 4)]
  };
  
  return recommendations[agentName] || 'Recommandations standard basées sur l\'analyse';
}

function generateRiskFactors(agentName) {
  var riskFactors = {
    'Agent_Calcul_Rentabilite': 'Risques: ' + ['Charges imprévues', 'Vacance locative', 'Hausse taux', 'Dépréciation valeur'][Math.floor(Math.random() * 4)],
    'Agent_Analyse_Marche': 'Risques: ' + ['Correction marché', 'Baisse demande', 'Nouveaux projets', 'Évolution réglementaire'][Math.floor(Math.random() * 4)],
    'Agent_Geolocalisation': 'Risques: ' + ['Évolution transport', 'Nuisances futures', 'Changement services', 'Détérioration quartier'][Math.floor(Math.random() * 4)],
    'Agent_Energie': 'Risques: ' + ['Hausse énergie', 'Nouvelles normes', 'Panne équipement', 'Coûts travaux'][Math.floor(Math.random() * 4)],
    'Agent_Recommandations': 'Risques: ' + ['Évolution goûts', 'Changement situation', 'Concurrence biens', 'Marché acheteurs'][Math.floor(Math.random() * 4)],
    'Agent_Analyse_Photos': 'Risques: ' + ['Défauts cachés', 'Vétusté masquée', 'Travaux nécessaires', 'Dégradation rapide'][Math.floor(Math.random() * 4)],
    'Agent_Estimation_Prix': 'Risques: ' + ['Surévaluation', 'Correction prix', 'Marché baissier', 'Comparaisons obsolètes'][Math.floor(Math.random() * 4)],
    'Agent_Conformite_Legale': 'Risques: ' + ['Nouvelles réglementations', 'Documents manquants', 'Contrôles futurs', 'Obligations légales'][Math.floor(Math.random() * 4)]
  };
  
  return riskFactors[agentName] || 'Facteurs de risque standards identifiés';
}

function generateOpportunityScore(agentName) {
  // Score d'opportunité de 1 à 10 selon l'agent
  var opportunityScores = {
    'Agent_Calcul_Rentabilite': [6, 10],
    'Agent_Analyse_Marche': [5, 9],
    'Agent_Geolocalisation': [6, 10],
    'Agent_Energie': [4, 8],
    'Agent_Recommandations': [5, 9],
    'Agent_Analyse_Photos': [4, 8],
    'Agent_Estimation_Prix': [5, 9],
    'Agent_Conformite_Legale': [6, 10]
  };
  
  var range = opportunityScores[agentName] || [5, 8];
  var score = range[0] + Math.random() * (range[1] - range[0]);
  
  return Math.round(score * 10) / 10;
}
