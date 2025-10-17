function createPropertyPhotosDatabase() {
  // Création de la feuille Property Photos
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('Property_Photos');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'property_id', 'photo_url', 'photo_type', 'room_name',
    'photo_quality', 'has_defects', 'defects_detected', 'ai_analysis_score', 'created_at'
  ];
  
  // Ajouter les en-têtes
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Récupérer les IDs des propriétés existantes
  var propertiesSheet = spreadsheet.getSheetByName('Properties');
  if (!propertiesSheet) {
    SpreadsheetApp.getUi().alert('Erreur: La feuille Properties n\'existe pas. Créez d\'abord la base Properties.');
    return;
  }
  
  var propertyIds = propertiesSheet.getRange(2, 1, 100, 1).getValues();
  var photos = [];
  var photoIndex = 1;
  
  // Types de photos possibles
  var photoTypes = ['exterieur', 'interieur', 'cuisine', 'salon', 'chambre', 'sdb', 'balcon', 'parking'];
  var roomNames = [
    'Façade principale', 'Vue extérieure', 'Entrée', 'Hall d\'entrée',
    'Salon', 'Séjour', 'Cuisine', 'Cuisine équipée', 'Chambre principale',
    'Chambre', 'Salle de bain', 'WC', 'Balcon', 'Terrasse', 'Parking', 'Cave'
  ];
  
  // Qualités de photo
  var qualities = ['excellente', 'bonne', 'moyenne', 'faible'];
  var qualityWeights = [0.3, 0.5, 0.15, 0.05]; // 30%, 50%, 15%, 5%
  
  // Défauts possibles
  var defectTypes = ['fissure', 'humidite', 'usure', 'electricite', 'plomberie', 'chauffage', 'isolation'];
  
  // Générer 5 photos par propriété (500 photos au total)
  for (var i = 0; i < propertyIds.length; i++) {
    var propertyId = propertyIds[i][0];
    var photosPerProperty = 5;
    
    for (var j = 0; j < photosPerProperty; j++) {
      var photoType = photoTypes[Math.floor(Math.random() * photoTypes.length)];
      var roomName = getRoomNameForType(photoType, roomNames);
      var quality = getWeightedRandomQuality(qualities, qualityWeights);
      var hasDefects = Math.random() < 0.2; // 20% des photos ont des défauts
      var defectsDetected = hasDefects ? generateDefects(defectTypes) : '';
      var aiScore = calculateAIScore(quality, hasDefects);
      
      var photo = [
        'PHOTO_' + String(photoIndex).padStart(3, '0'),
        propertyId,
        'https://fake-images.com/' + propertyId.toLowerCase() + '_' + photoType + '_' + (j + 1) + '.jpg',
        photoType,
        roomName,
        quality,
        hasDefects,
        defectsDetected,
        aiScore,
        new Date().toISOString()
      ];
      
      photos.push(photo);
      photoIndex++;
    }
  }
  
  // Ajouter toutes les données
  if (photos.length > 0) {
    sheet.getRange(2, 1, photos.length, headers.length).setValues(photos);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données Property Photos créée avec ' + photos.length + ' photos !');
}

function getRoomNameForType(photoType, roomNames) {
  var roomMapping = {
    'exterieur': ['Façade principale', 'Vue extérieure', 'Entrée'],
    'interieur': ['Hall d\'entrée', 'Salon', 'Séjour'],
    'cuisine': ['Cuisine', 'Cuisine équipée'],
    'salon': ['Salon', 'Séjour'],
    'chambre': ['Chambre principale', 'Chambre'],
    'sdb': ['Salle de bain', 'WC'],
    'balcon': ['Balcon', 'Terrasse'],
    'parking': ['Parking', 'Cave']
  };
  
  var possibleNames = roomMapping[photoType] || ['Pièce'];
  return possibleNames[Math.floor(Math.random() * possibleNames.length)];
}

function getWeightedRandomQuality(qualities, weights) {
  var random = Math.random();
  var cumulativeWeight = 0;
  
  for (var i = 0; i < qualities.length; i++) {
    cumulativeWeight += weights[i];
    if (random <= cumulativeWeight) {
      return qualities[i];
    }
  }
  
  return qualities[qualities.length - 1]; // Fallback
}

function generateDefects(defectTypes) {
  var numDefects = Math.floor(Math.random() * 3) + 1; // 1-3 défauts
  var selectedDefects = [];
  
  for (var i = 0; i < numDefects; i++) {
    var defect = defectTypes[Math.floor(Math.random() * defectTypes.length)];
    if (selectedDefects.indexOf(defect) === -1) {
      selectedDefects.push(defect);
    }
  }
  
  return JSON.stringify(selectedDefects);
}

function calculateAIScore(quality, hasDefects) {
  var baseScore = {
    'excellente': 0.9,
    'bonne': 0.8,
    'moyenne': 0.7,
    'faible': 0.6
  }[quality];
  
  // Réduire le score si défauts détectés
  if (hasDefects) {
    baseScore -= 0.15;
  }
  
  // Ajouter une petite variation
  baseScore += (Math.random() - 0.5) * 0.1;
  
  // S'assurer que le score reste dans [0.5, 1.0]
  return Math.max(0.5, Math.min(1.0, baseScore));
}
