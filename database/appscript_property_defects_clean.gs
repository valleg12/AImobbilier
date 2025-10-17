function createPropertyDefectsDatabase() {
  // Création de la feuille Property Defects
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('Property_Defects');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'property_id', 'photo_id',
    'defect_type', 'defect_category', 'severity_level', 'description',
    'location_room', 'location_area', 'estimated_cost_repair',
    'urgency_level', 'detection_method', 'confidence_score',
    'detected_at', 'detected_by_agent'
  ];
  
  // Ajouter les en-têtes
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  var defectsData = [];
  
  // Générer 150 défauts variés pour 100 propriétés
  for (var i = 1; i <= 150; i++) {
    var defect = generatePropertyDefect(i);
    defectsData.push(defect);
  }
  
  // Ajouter toutes les données
  if (defectsData.length > 0) {
    sheet.getRange(2, 1, defectsData.length, headers.length).setValues(defectsData);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données Property Defects créée avec ' + defectsData.length + ' défauts !');
}

function generatePropertyDefect(index) {
  var defect = [
    'DEFECT_' + String(index).padStart(4, '0'), // id
    'PROP_' + String(Math.floor(Math.random() * 100) + 1).padStart(3, '0'), // property_id
    'PHOTO_' + String(Math.floor(Math.random() * 500) + 1).padStart(4, '0') // photo_id
  ];
  
  // Type et catégorie de défaut
  var defectInfo = generateDefectTypeAndCategory();
  defect = defect.concat(defectInfo);
  
  // Description
  var description = generateDefectDescription(defectInfo[0], defectInfo[1]);
  defect.push(description);
  
  // Localisation
  var locationData = generateLocationData(defectInfo[0]);
  defect = defect.concat(locationData);
  
  // Coût de réparation
  var repairCost = generateRepairCost(defectInfo[0], defectInfo[2]);
  defect.push(repairCost);
  
  // Urgence et détection
  var urgencyAndDetection = generateUrgencyAndDetection(defectInfo[2]);
  defect = defect.concat(urgencyAndDetection);
  
  // Score de confiance
  var confidenceScore = generateConfidenceScore(defectInfo[2]);
  defect.push(confidenceScore);
  
  // Date de détection
  var detectedAt = generateDetectionDate();
  defect.push(detectedAt);
  
  // Agent de détection
  var detectedByAgent = 'Agent_Analyse_Photos';
  defect.push(detectedByAgent);
  
  return defect;
}

function generateDefectTypeAndCategory() {
  var defectTypes = [
    // Structure et maçonnerie
    { type: 'fissure_mur', category: 'structure', severity: ['faible', 'moyen', 'important'][Math.floor(Math.random() * 3)] },
    { type: 'fissure_plafond', category: 'structure', severity: ['faible', 'moyen', 'important'][Math.floor(Math.random() * 3)] },
    { type: 'fissure_sol', category: 'structure', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    { type: 'humidite_mur', category: 'structure', severity: ['moyen', 'important', 'critique'][Math.floor(Math.random() * 3)] },
    { type: 'efflorescence', category: 'structure', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    
    // Électricité
    { type: 'prise_deface', category: 'electricite', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    { type: 'interrupteur_casse', category: 'electricite', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    { type: 'cable_visible', category: 'electricite', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    { type: 'tableau_electrique_vetuste', category: 'electricite', severity: ['moyen', 'important', 'critique'][Math.floor(Math.random() * 3)] },
    
    // Plomberie
    { type: 'fuite_robinet', category: 'plomberie', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    { type: 'fuite_chasse_eau', category: 'plomberie', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    { type: 'canalisation_bouchee', category: 'plomberie', severity: ['moyen', 'important'][Math.floor(Math.random() * 2)] },
    { type: 'chauffe_eau_defaillant', category: 'plomberie', severity: ['moyen', 'important', 'critique'][Math.floor(Math.random() * 3)] },
    
    // Menuiserie
    { type: 'fenetre_casse', category: 'menuiserie', severity: ['faible', 'moyen', 'important'][Math.floor(Math.random() * 3)] },
    { type: 'porte_qui_grippe', category: 'menuiserie', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    { type: 'volets_abimes', category: 'menuiserie', severity: ['faible', 'moyen', 'important'][Math.floor(Math.random() * 3)] },
    { type: 'parquet_abime', category: 'menuiserie', severity: ['faible', 'moyen', 'important'][Math.floor(Math.random() * 3)] },
    
    // Peinture et finitions
    { type: 'peinture_ecaille', category: 'finition', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    { type: 'papier_peint_decollage', category: 'finition', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    { type: 'carrelage_casse', category: 'finition', severity: ['faible', 'moyen', 'important'][Math.floor(Math.random() * 3)] },
    { type: 'joint_carrelage_abime', category: 'finition', severity: ['faible', 'moyen'][Math.floor(Math.random() * 2)] },
    
    // Chauffage et énergie
    { type: 'radiateur_rouille', category: 'chauffage', severity: ['faible', 'moyen', 'important'][Math.floor(Math.random() * 3)] },
    { type: 'chaudiere_vetuste', category: 'chauffage', severity: ['moyen', 'important', 'critique'][Math.floor(Math.random() * 3)] },
    { type: 'isolation_insuffisante', category: 'energie', severity: ['moyen', 'important'][Math.floor(Math.random() * 2)] },
    { type: 'simple_vitrage', category: 'energie', severity: ['moyen', 'important'][Math.floor(Math.random() * 2)] },
    
    // Sécurité
    { type: 'serrure_defaillante', category: 'securite', severity: ['moyen', 'important'][Math.floor(Math.random() * 2)] },
    { type: 'detecteur_fumee_manquant', category: 'securite', severity: ['important', 'critique'][Math.floor(Math.random() * 2)] },
    { type: 'gaz_non_conforme', category: 'securite', severity: ['important', 'critique'][Math.floor(Math.random() * 2)] }
  ];
  
  var selectedDefect = defectTypes[Math.floor(Math.random() * defectTypes.length)];
  
  return [selectedDefect.type, selectedDefect.category, selectedDefect.severity];
}

function generateDefectDescription(defectType, defectCategory) {
  var descriptions = {
    'fissure_mur': 'Fissure verticale de ' + (2 + Math.random() * 8).toFixed(1) + 'cm sur le mur',
    'fissure_plafond': 'Fissure en étoile de ' + (1 + Math.random() * 5).toFixed(1) + 'cm au plafond',
    'fissure_sol': 'Fissure de ' + (0.5 + Math.random() * 2).toFixed(1) + 'cm dans le carrelage',
    'humidite_mur': 'Taches d\'humidité de ' + (10 + Math.random() * 40).toFixed(0) + 'cm² sur le mur',
    'efflorescence': 'Traces blanches d\'efflorescence sur ' + (5 + Math.random() * 15).toFixed(0) + 'cm',
    'prise_deface': 'Prise électrique défaillante avec brûlures visibles',
    'interrupteur_casse': 'Interrupteur cassé, contact intermittent',
    'cable_visible': 'Câble électrique apparent non protégé',
    'tableau_electrique_vetuste': 'Tableau électrique obsolète, non conforme aux normes',
    'fuite_robinet': 'Fuite d\'eau au niveau du robinet, goutte à goutte',
    'fuite_chasse_eau': 'Fuite d\'eau dans le réservoir des WC',
    'canalisation_bouchee': 'Canalisation partiellement bouchée, écoulement lent',
    'chauffe_eau_defaillant': 'Chauffe-eau en panne, plus d\'eau chaude',
    'fenetre_casse': 'Vitre cassée de ' + (20 + Math.random() * 30).toFixed(0) + 'cm',
    'porte_qui_grippe': 'Porte qui grince et grippe à l\'ouverture',
    'volets_abimes': 'Volets endommagés, lames cassées',
    'parquet_abime': 'Lames de parquet endommagées sur ' + (50 + Math.random() * 150).toFixed(0) + 'cm²',
    'peinture_ecaille': 'Peinture qui s\'écaille sur ' + (20 + Math.random() * 80).toFixed(0) + 'cm²',
    'papier_peint_decollage': 'Papier peint qui se décolle sur ' + (30 + Math.random() * 70).toFixed(0) + 'cm',
    'carrelage_casse': 'Carrelage cassé, ' + (2 + Math.random() * 8).toFixed(0) + ' carreaux à remplacer',
    'joint_carrelage_abime': 'Joint de carrelage abîmé sur ' + (1 + Math.random() * 3).toFixed(0) + 'm',
    'radiateur_rouille': 'Radiateur rouillé, traces de corrosion',
    'chaudiere_vetuste': 'Chaudière vétuste de plus de 15 ans',
    'isolation_insuffisante': 'Isolation thermique insuffisante, ponts thermiques',
    'simple_vitrage': 'Fenêtres en simple vitrage, déperdition thermique',
    'serrure_defaillante': 'Serrure qui fonctionne mal, clé qui grippe',
    'detecteur_fumee_manquant': 'Absence de détecteur de fumée obligatoire',
    'gaz_non_conforme': 'Installation gaz non conforme aux normes'
  };
  
  return descriptions[defectType] || 'Défaut détecté nécessitant inspection';
}

function generateLocationData(defectType) {
  var rooms = ['salon', 'cuisine', 'chambre', 'salle_de_bain', 'entree', 'couloir', 'balcon', 'cave', 'grenier'];
  var areas = ['mur_nord', 'mur_sud', 'mur_est', 'mur_ouest', 'plafond', 'sol', 'coin', 'fenetre', 'porte'];
  
  var locationRoom = rooms[Math.floor(Math.random() * rooms.length)];
  var locationArea = areas[Math.floor(Math.random() * areas.length)];
  
  return [locationRoom, locationArea];
}

function generateRepairCost(defectType, severityLevel) {
  var baseCosts = {
    'faible': [50, 200],
    'moyen': [200, 800],
    'important': [800, 2500],
    'critique': [2500, 8000]
  };
  
  var costRange = baseCosts[severityLevel] || [100, 500];
  var cost = costRange[0] + Math.random() * (costRange[1] - costRange[0]);
  
  return Math.round(cost);
}

function generateUrgencyAndDetection(severityLevel) {
  var urgencyLevels = {
    'faible': ['non_urgent', 'peu_urgent'],
    'moyen': ['peu_urgent', 'urgent'],
    'important': ['urgent', 'très_urgent'],
    'critique': ['très_urgent', 'critique']
  };
  
  var urgencyOptions = urgencyLevels[severityLevel] || ['peu_urgent'];
  var urgencyLevel = urgencyOptions[Math.floor(Math.random() * urgencyOptions.length)];
  
  var detectionMethods = ['analyse_photo', 'inspection_visuelle', 'test_fonctionnel', 'controle_norme'];
  var detectionMethod = detectionMethods[Math.floor(Math.random() * detectionMethods.length)];
  
  return [urgencyLevel, detectionMethod];
}

function generateConfidenceScore(severityLevel) {
  // Score de confiance selon la gravité (plus grave = plus facile à détecter)
  var confidenceRanges = {
    'faible': [0.6, 0.8],
    'moyen': [0.7, 0.9],
    'important': [0.8, 0.95],
    'critique': [0.9, 0.98]
  };
  
  var range = confidenceRanges[severityLevel] || [0.7, 0.9];
  var score = range[0] + Math.random() * (range[1] - range[0]);
  
  return Math.round(score * 100) / 100;
}

function generateDetectionDate() {
  // Date de détection dans les 30 derniers jours
  var now = new Date();
  var daysAgo = Math.floor(Math.random() * 30);
  var detectionDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  
  return detectionDate.toISOString();
}
