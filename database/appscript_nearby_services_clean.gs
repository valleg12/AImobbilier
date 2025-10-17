function createNearbyServicesDatabase() {
  // Création de la feuille Nearby Services
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('Nearby_Services');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'property_id',
    'metro_stations_count', 'metro_nearest_distance', 'metro_nearest_name', 'metro_nearest_line',
    'bus_stops_count', 'bus_nearest_distance',
    'train_stations_count', 'train_nearest_distance', 'train_nearest_name',
    'schools_count', 'schools_nearest_distance', 'schools_rating_avg',
    'universities_count', 'universities_nearest_distance',
    'hospitals_count', 'hospitals_nearest_distance',
    'pharmacies_count', 'pharmacies_nearest_distance',
    'doctors_count', 'doctors_nearest_distance',
    'supermarkets_count', 'supermarkets_nearest_distance',
    'restaurants_count', 'restaurants_nearest_distance', 'restaurants_rating_avg',
    'shopping_centers_count', 'shopping_centers_nearest_distance',
    'parks_count', 'parks_nearest_distance', 'parks_size_avg',
    'gyms_count', 'gyms_nearest_distance',
    'cinemas_count', 'cinemas_nearest_distance',
    'banks_count', 'banks_nearest_distance',
    'atms_count', 'atms_nearest_distance',
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
  var servicesData = [];
  
  // Noms de stations de métro par ville
  var metroStations = {
    'Paris': [
      {name: 'Châtelet', line: '1, 4, 7, 11, 14'},
      {name: 'Gare du Nord', line: '4, 5, B, D'},
      {name: 'République', line: '3, 5, 8, 9, 11'},
      {name: 'Bastille', line: '1, 5, 8'},
      {name: 'Nation', line: '1, 2, 6, 9'},
      {name: 'Belleville', line: '2, 11'},
      {name: 'Père Lachaise', line: '2, 3'},
      {name: 'Oberkampf', line: '5, 9'},
      {name: 'Filles du Calvaire', line: '8'},
      {name: 'Saint-Sébastien Froissart', line: '8'}
    ],
    'Lyon': [
      {name: 'Bellecour', line: 'A, D'},
      {name: 'Part-Dieu', line: 'B, D'},
      {name: 'Hôtel de Ville', line: 'A, C'},
      {name: 'Perrache', line: 'A, T1'},
      {name: 'Vieux Lyon', line: 'D'},
      {name: 'Croix-Rousse', line: 'C'},
      {name: 'Cordeliers', line: 'A'},
      {name: 'Saxe-Gambetta', line: 'B'},
      {name: 'Jean Macé', line: 'B'},
      {name: 'Masséna', line: 'A'}
    ],
    'Marseille': [
      {name: 'Gare Saint-Charles', line: '1, 2'},
      {name: 'Vieux-Port', line: '1'},
      {name: 'Castellane', line: '1, 2'},
      {name: 'Noailles', line: '1'},
      {name: 'La Timone', line: '1'},
      {name: 'Longchamp', line: '1'},
      {name: 'Estrangin-Préfecture', line: '1'},
      {name: 'Baille', line: '2'},
      {name: 'Rond-Point du Prado', line: '2'},
      {name: 'Périer', line: '2'}
    ]
  };
  
  // Générer les services pour chaque propriété
  for (var i = 0; i < propertyIds.length; i++) {
    var propertyId = propertyIds[i][0];
    var services = generateServicesForProperty(propertyId, metroStations);
    servicesData.push(services);
  }
  
  // Ajouter toutes les données
  if (servicesData.length > 0) {
    sheet.getRange(2, 1, servicesData.length, headers.length).setValues(servicesData);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données Nearby Services créée avec ' + servicesData.length + ' entrées !');
}

function generateServicesForProperty(propertyId, metroStations) {
  // Déterminer la ville basée sur l'ID de propriété
  var cityType = getCityTypeFromPropertyId(propertyId);
  
  // Générer les données selon le type de ville
  var services = [
    'SERV_' + propertyId.substring(4), // ID basé sur l'ID de la propriété
    propertyId
  ];
  
  // Transport - Métro
  var metroData = generateMetroData(cityType, metroStations);
  services = services.concat(metroData);
  
  // Transport - Bus
  var busData = generateBusData(cityType);
  services = services.concat(busData);
  
  // Transport - Train
  var trainData = generateTrainData(cityType);
  services = services.concat(trainData);
  
  // Éducation
  var educationData = generateEducationData(cityType);
  services = services.concat(educationData);
  
  // Santé
  var healthData = generateHealthData(cityType);
  services = services.concat(healthData);
  
  // Commerces
  var commerceData = generateCommerceData(cityType);
  services = services.concat(commerceData);
  
  // Loisirs
  var leisureData = generateLeisureData(cityType);
  services = services.concat(leisureData);
  
  // Finances
  var financeData = generateFinanceData(cityType);
  services = services.concat(financeData);
  
  // Date de création
  services.push(new Date().toISOString());
  
  return services;
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

function generateMetroData(cityType, metroStations) {
  if (cityType === 'paris_center' || cityType === 'paris_suburb') {
    var hasMetro = Math.random() > (cityType === 'paris_suburb' ? 0.4 : 0.1);
    if (hasMetro) {
      var station = metroStations['Paris'][Math.floor(Math.random() * metroStations['Paris'].length)];
      return [
        Math.floor(Math.random() * 3) + 1,                    // count
        Math.floor(Math.random() * 800) + 100,                // distance
        station.name,                                          // name
        station.line                                           // line
      ];
    }
  } else if (cityType === 'lyon') {
    var hasMetro = Math.random() > 0.3;
    if (hasMetro) {
      var station = metroStations['Lyon'][Math.floor(Math.random() * metroStations['Lyon'].length)];
      return [
        Math.floor(Math.random() * 2) + 1,
        Math.floor(Math.random() * 1000) + 200,
        station.name,
        station.line
      ];
    }
  } else if (cityType === 'marseille') {
    var hasMetro = Math.random() > 0.5;
    if (hasMetro) {
      var station = metroStations['Marseille'][Math.floor(Math.random() * metroStations['Marseille'].length)];
      return [
        Math.floor(Math.random() * 2) + 1,
        Math.floor(Math.random() * 1200) + 300,
        station.name,
        station.line
      ];
    }
  }
  
  // Pas de métro - mais on donne des valeurs par défaut
  return [0, 0, 'Aucune', 'Aucune'];
}

function generateBusData(cityType) {
  var hasBus = Math.random() > 0.2; // 80% ont des arrêts de bus
  if (hasBus) {
    var count = Math.floor(Math.random() * 5) + 2; // 2-6 arrêts
    var distance = Math.floor(Math.random() * 400) + 50; // 50-450m
    return [count, distance];
  }
  return [0, 0]; // Valeur par défaut au lieu de null
}

function generateTrainData(cityType) {
  var hasTrain = Math.random() > 0.4; // 60% ont une gare
  if (hasTrain) {
    var distance = Math.floor(Math.random() * 2000) + 500; // 500-2500m
    var stationNames = ['Gare Centrale', 'Gare SNCF', 'Gare TGV', 'Gare TER'];
    var stationName = stationNames[Math.floor(Math.random() * stationNames.length)];
    return [1, distance, stationName];
  }
  return [0, 0, 'Aucune']; // Valeurs par défaut
}

function generateEducationData(cityType) {
  var density = getCityDensity(cityType);
  
  var schoolsCount = Math.floor(Math.random() * 8) + 2; // 2-9 écoles
  var schoolsDistance = Math.floor(Math.random() * 800) + 100;
  var schoolsRating = 3.0 + Math.random() * 2.0; // 3.0-5.0
  
  var universitiesCount = density === 'high' ? Math.floor(Math.random() * 3) + 1 : 0;
  var universitiesDistance = universitiesCount > 0 ? Math.floor(Math.random() * 2000) + 500 : 0; // 0 au lieu de null
  
  return [schoolsCount, schoolsDistance, Math.round(schoolsRating * 100) / 100, universitiesCount, universitiesDistance];
}

function generateHealthData(cityType) {
  var density = getCityDensity(cityType);
  
  var hospitalsCount = density === 'high' ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2);
  var hospitalsDistance = hospitalsCount > 0 ? Math.floor(Math.random() * 3000) + 500 : 0; // 0 au lieu de null
  
  var pharmaciesCount = Math.floor(Math.random() * 6) + 2; // 2-7 pharmacies
  var pharmaciesDistance = Math.floor(Math.random() * 600) + 100;
  
  var doctorsCount = Math.floor(Math.random() * 10) + 3; // 3-12 médecins
  var doctorsDistance = Math.floor(Math.random() * 800) + 100;
  
  return [hospitalsCount, hospitalsDistance, pharmaciesCount, pharmaciesDistance, doctorsCount, doctorsDistance];
}

function generateCommerceData(cityType) {
  var density = getCityDensity(cityType);
  
  var supermarketsCount = Math.floor(Math.random() * 4) + 1; // 1-4 supermarchés
  var supermarketsDistance = Math.floor(Math.random() * 1000) + 200;
  
  var restaurantsCount = density === 'high' ? Math.floor(Math.random() * 20) + 5 : Math.floor(Math.random() * 10) + 2;
  var restaurantsDistance = Math.floor(Math.random() * 500) + 50;
  var restaurantsRating = 3.5 + Math.random() * 1.5; // 3.5-5.0
  
  var shoppingCentersCount = density === 'high' ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2);
  var shoppingCentersDistance = shoppingCentersCount > 0 ? Math.floor(Math.random() * 1500) + 300 : 0; // 0 au lieu de null
  
  return [supermarketsCount, supermarketsDistance, restaurantsCount, restaurantsDistance, Math.round(restaurantsRating * 100) / 100, shoppingCentersCount, shoppingCentersDistance];
}

function generateLeisureData(cityType) {
  var density = getCityDensity(cityType);
  
  var parksCount = density === 'high' ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 3) + 1;
  var parksDistance = Math.floor(Math.random() * 1000) + 200;
  var parksSize = Math.floor(Math.random() * 50000) + 5000; // 5000-55000 m²
  
  var gymsCount = Math.floor(Math.random() * 4) + 1; // 1-4 salles de sport
  var gymsDistance = Math.floor(Math.random() * 800) + 200;
  
  var cinemasCount = density === 'high' ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2);
  var cinemasDistance = cinemasCount > 0 ? Math.floor(Math.random() * 1500) + 500 : 0; // 0 au lieu de null
  
  return [parksCount, parksDistance, parksSize, gymsCount, gymsDistance, cinemasCount, cinemasDistance];
}

function generateFinanceData(cityType) {
  var density = getCityDensity(cityType);
  
  var banksCount = Math.floor(Math.random() * 6) + 2; // 2-7 banques
  var banksDistance = Math.floor(Math.random() * 600) + 100;
  
  var atmsCount = Math.floor(Math.random() * 10) + 3; // 3-12 distributeurs
  var atmsDistance = Math.floor(Math.random() * 400) + 50;
  
  return [banksCount, banksDistance, atmsCount, atmsDistance];
}

function getCityDensity(cityType) {
  if (cityType === 'paris_center') return 'high';
  if (cityType === 'paris_suburb') return 'medium';
  if (cityType === 'lyon' || cityType === 'marseille') return 'medium';
  return 'low';
}
