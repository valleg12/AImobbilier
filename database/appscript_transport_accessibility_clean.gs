function createTransportAccessibilityDatabase() {
  // Création de la feuille Transport Accessibility
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('Transport_Accessibility');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'property_id',
    'city_center_distance', 'city_center_time_walk', 'city_center_time_transport',
    'main_station_distance', 'main_station_time_walk', 'main_station_time_transport',
    'airport_distance', 'airport_time_transport',
    'walkability_score', 'public_transport_score', 'car_accessibility_score', 'overall_mobility_score',
    'created_at'
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
  var accessibilityData = [];
  
  // Générer les données d'accessibilité pour chaque propriété
  for (var i = 0; i < propertyIds.length; i++) {
    var propertyId = propertyIds[i][0];
    var accessibility = generateAccessibilityForProperty(propertyId);
    accessibilityData.push(accessibility);
  }
  
  // Ajouter toutes les données
  if (accessibilityData.length > 0) {
    sheet.getRange(2, 1, accessibilityData.length, headers.length).setValues(accessibilityData);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données Transport Accessibility créée avec ' + accessibilityData.length + ' entrées !');
}

function generateAccessibilityForProperty(propertyId) {
  // Déterminer le type de ville basé sur l'ID de propriété
  var cityType = getCityTypeFromPropertyId(propertyId);
  
  // Générer les données selon le type de ville
  var accessibility = [
    'ACCESS_' + propertyId.substring(4), // ID basé sur l'ID de la propriété
    propertyId
  ];
  
  // Accès au centre-ville
  var cityCenterData = generateCityCenterAccess(cityType);
  accessibility = accessibility.concat(cityCenterData);
  
  // Accès aux gares principales
  var mainStationData = generateMainStationAccess(cityType);
  accessibility = accessibility.concat(mainStationData);
  
  // Accès à l'aéroport
  var airportData = generateAirportAccess(cityType);
  accessibility = accessibility.concat(airportData);
  
  // Scores de mobilité
  var mobilityScores = calculateMobilityScores(cityType, cityCenterData, mainStationData);
  accessibility = accessibility.concat(mobilityScores);
  
  // Date de création
  accessibility.push(new Date().toISOString());
  
  return accessibility;
}

function getCityTypeFromPropertyId(propertyId) {
  // Déterminer le type de ville basé sur l'ID de propriété
  var idNum = parseInt(propertyId.substring(4));
  
  if (idNum <= 20) return 'paris_center';      // Paris appartements
  if (idNum <= 35) return 'paris_suburb';      // Banlieue parisienne
  if (idNum <= 45) return 'paris_center';      // Studios Paris
  if (idNum <= 55) return 'paris_center';      // Lofts Paris
  if (idNum <= 70) return 'lyon';              // Lyon
  if (idNum <= 80) return 'marseille';         // Marseille
  if (idNum <= 90) return 'bordeaux';          // Bordeaux
  return 'toulouse';                           // Toulouse
}

function generateCityCenterAccess(cityType) {
  var distance, walkTime, transportTime;
  
  switch (cityType) {
    case 'paris_center':
      // Centre de Paris - très proche du centre
      distance = Math.floor(Math.random() * 2000) + 500; // 500-2500m
      walkTime = Math.floor(distance / 80); // 80m/min
      transportTime = Math.floor(Math.random() * 15) + 5; // 5-20 min
      break;
      
    case 'paris_suburb':
      // Banlieue parisienne - plus éloigné
      distance = Math.floor(Math.random() * 8000) + 5000; // 5-13km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 30) + 15; // 15-45 min
      break;
      
    case 'lyon':
      // Lyon - distances moyennes
      distance = Math.floor(Math.random() * 5000) + 1000; // 1-6km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 25) + 10; // 10-35 min
      break;
      
    case 'marseille':
      // Marseille - ville étendue
      distance = Math.floor(Math.random() * 6000) + 1500; // 1.5-7.5km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 30) + 12; // 12-42 min
      break;
      
    case 'bordeaux':
      // Bordeaux - ville moyenne
      distance = Math.floor(Math.random() * 4000) + 800; // 800m-4.8km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 20) + 8; // 8-28 min
      break;
      
    case 'toulouse':
      // Toulouse - ville moyenne
      distance = Math.floor(Math.random() * 4500) + 1000; // 1-5.5km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 22) + 10; // 10-32 min
      break;
      
    default:
      distance = 2000;
      walkTime = 25;
      transportTime = 15;
  }
  
  return [distance, walkTime, transportTime];
}

function generateMainStationAccess(cityType) {
  var distance, walkTime, transportTime;
  
  switch (cityType) {
    case 'paris_center':
      // Paris - gares très accessibles
      distance = Math.floor(Math.random() * 3000) + 800; // 800m-3.8km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 20) + 8; // 8-28 min
      break;
      
    case 'paris_suburb':
      // Banlieue - gares moyennement accessibles
      distance = Math.floor(Math.random() * 4000) + 1500; // 1.5-5.5km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 25) + 12; // 12-37 min
      break;
      
    case 'lyon':
      // Lyon - Part-Dieu accessible
      distance = Math.floor(Math.random() * 4000) + 1000; // 1-5km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 20) + 10; // 10-30 min
      break;
      
    case 'marseille':
      // Marseille - Saint-Charles
      distance = Math.floor(Math.random() * 5000) + 1200; // 1.2-6.2km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 25) + 10; // 10-35 min
      break;
      
    case 'bordeaux':
      // Bordeaux - gare Saint-Jean
      distance = Math.floor(Math.random() * 3500) + 800; // 800m-4.3km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 18) + 8; // 8-26 min
      break;
      
    case 'toulouse':
      // Toulouse - Matabiau
      distance = Math.floor(Math.random() * 4000) + 1000; // 1-5km
      walkTime = Math.floor(distance / 80);
      transportTime = Math.floor(Math.random() * 20) + 10; // 10-30 min
      break;
      
    default:
      distance = 2500;
      walkTime = 30;
      transportTime = 20;
  }
  
  return [distance, walkTime, transportTime];
}

function generateAirportAccess(cityType) {
  var distance, transportTime;
  
  switch (cityType) {
    case 'paris_center':
    case 'paris_suburb':
      // Paris - Charles de Gaulle ou Orly
      distance = Math.floor(Math.random() * 20000) + 15000; // 15-35km
      transportTime = Math.floor(Math.random() * 60) + 30; // 30-90 min
      break;
      
    case 'lyon':
      // Lyon - Saint-Exupéry
      distance = Math.floor(Math.random() * 15000) + 20000; // 20-35km
      transportTime = Math.floor(Math.random() * 45) + 30; // 30-75 min
      break;
      
    case 'marseille':
      // Marseille - Marignane
      distance = Math.floor(Math.random() * 15000) + 18000; // 18-33km
      transportTime = Math.floor(Math.random() * 40) + 25; // 25-65 min
      break;
      
    case 'bordeaux':
      // Bordeaux - Mérignac
      distance = Math.floor(Math.random() * 8000) + 7000; // 7-15km
      transportTime = Math.floor(Math.random() * 30) + 20; // 20-50 min
      break;
      
    case 'toulouse':
      // Toulouse - Blagnac
      distance = Math.floor(Math.random() * 8000) + 6000; // 6-14km
      transportTime = Math.floor(Math.random() * 25) + 15; // 15-40 min
      break;
      
    default:
      distance = 20000;
      transportTime = 45;
  }
  
  return [distance, transportTime];
}

function calculateMobilityScores(cityType, cityCenterData, mainStationData) {
  var walkabilityScore, publicTransportScore, carAccessibilityScore, overallMobilityScore;
  
  // Score de marchabilité (basé sur la distance au centre et la densité)
  var cityCenterDistance = cityCenterData[0];
  var walkabilityBase = cityType === 'paris_center' ? 0.9 : 
                       cityType === 'paris_suburb' ? 0.6 :
                       cityType === 'lyon' || cityType === 'marseille' ? 0.7 : 0.8;
  
  walkabilityScore = Math.max(0.3, walkabilityBase - (cityCenterDistance / 10000));
  walkabilityScore = Math.round(walkabilityScore * 100) / 100;
  
  // Score de transport public (basé sur la densité et l'accès aux gares)
  var publicTransportBase = cityType === 'paris_center' ? 0.95 :
                           cityType === 'paris_suburb' ? 0.8 :
                           cityType === 'lyon' ? 0.85 :
                           cityType === 'marseille' ? 0.75 : 0.7;
  
  var stationDistance = mainStationData[0];
  publicTransportScore = Math.max(0.3, publicTransportBase - (stationDistance / 15000));
  publicTransportScore = Math.round(publicTransportScore * 100) / 100;
  
  // Score d'accessibilité en voiture (inversement proportionnel à la densité)
  var carAccessibilityBase = cityType === 'paris_center' ? 0.6 :
                            cityType === 'paris_suburb' ? 0.8 :
                            cityType === 'lyon' || cityType === 'marseille' ? 0.75 : 0.85;
  
  carAccessibilityScore = carAccessibilityBase + (Math.random() - 0.5) * 0.2;
  carAccessibilityScore = Math.max(0.3, Math.min(1.0, carAccessibilityScore));
  carAccessibilityScore = Math.round(carAccessibilityScore * 100) / 100;
  
  // Score global de mobilité (moyenne pondérée)
  overallMobilityScore = (walkabilityScore * 0.3 + publicTransportScore * 0.4 + carAccessibilityScore * 0.3);
  overallMobilityScore = Math.round(overallMobilityScore * 100) / 100;
  
  return [walkabilityScore, publicTransportScore, carAccessibilityScore, overallMobilityScore];
}
