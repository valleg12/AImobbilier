function createPropertiesDatabase() {
  // Création de la feuille Properties
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('Properties');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'address', 'city', 'postal_code', 'department', 'region',
    'latitude', 'longitude', 'property_type', 'surface_living', 'surface_total',
    'rooms_count', 'bedrooms_count', 'bathrooms_count', 'floor_level', 'floors_total',
    'construction_year', 'renovation_year', 'condition_level', 'energy_class',
    'ghg_emissions', 'has_elevator', 'has_balcony', 'has_terrace', 'has_garden',
    'has_parking', 'has_storage', 'price_estimate', 'price_per_sqm',
    'price_range_min', 'price_range_max', 'market_demand_level',
    'time_to_sell_estimate', 'data_source', 'confidence_score'
  ];
  
  // Ajouter les en-têtes
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Données des propriétés
  var properties = [];
  
  // 20 appartements Paris
  for (var i = 1; i <= 20; i++) {
    var prop = createParisApartment(i);
    properties.push(prop);
  }
  
  // 15 maisons banlieue parisienne
  for (var i = 1; i <= 15; i++) {
    var prop = createSuburbHouse(i);
    properties.push(prop);
  }
  
  // 10 studios Paris centre
  for (var i = 1; i <= 10; i++) {
    var prop = createParisStudio(i);
    properties.push(prop);
  }
  
  // 10 lofts Paris 11e et 19e
  for (var i = 1; i <= 10; i++) {
    var prop = createParisLoft(i);
    properties.push(prop);
  }
  
  // 15 appartements Lyon
  for (var i = 1; i <= 15; i++) {
    var prop = createLyonApartment(i);
    properties.push(prop);
  }
  
  // 10 maisons Marseille
  for (var i = 1; i <= 10; i++) {
    var prop = createMarseilleHouse(i);
    properties.push(prop);
  }
  
  // 10 appartements Bordeaux
  for (var i = 1; i <= 10; i++) {
    var prop = createBordeauxApartment(i);
    properties.push(prop);
  }
  
  // 10 appartements Toulouse
  for (var i = 1; i <= 10; i++) {
    var prop = createToulouseApartment(i);
    properties.push(prop);
  }
  
  // Ajouter toutes les données
  if (properties.length > 0) {
    sheet.getRange(2, 1, properties.length, headers.length).setValues(properties);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données Properties créée avec ' + properties.length + ' propriétés !');
}

function createParisApartment(index) {
  var arrondissements = ['75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010',
                        '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020'];
  var postal_code = arrondissements[index - 1];
  var surface = Math.floor(Math.random() * 50) + 60; // 60-110 m²
  var rooms = Math.floor(surface / 25) + 2; // 2-6 pièces
  var price = Math.floor(Math.random() * 200000) + 400000; // 400k-600k
  
  return [
    'PROP_' + String(index).padStart(3, '0'),
    Math.floor(Math.random() * 200) + 1 + ' Rue de Rivoli, ' + postal_code + ' Paris',
    'Paris',
    postal_code,
    'Paris',
    'Île-de-France',
    48.85 + (Math.random() - 0.5) * 0.1,
    2.35 + (Math.random() - 0.5) * 0.1,
    'appartement',
    surface,
    surface + Math.floor(Math.random() * 20) + 10,
    rooms,
    Math.max(1, rooms - 1),
    Math.floor(Math.random() * 2) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 8) + 3,
    1970 + Math.floor(Math.random() * 40),
    Math.random() > 0.3 ? 2015 + Math.floor(Math.random() * 8) : '',
    ['excellent', 'bon', 'moyen'][Math.floor(Math.random() * 3)],
    ['B', 'C', 'D'][Math.floor(Math.random() * 3)],
    ['B', 'C', 'D'][Math.floor(Math.random() * 3)],
    Math.random() > 0.5,
    Math.random() > 0.6,
    Math.random() > 0.8,
    false,
    Math.random() > 0.4,
    Math.random() > 0.3,
    price,
    Math.floor(price / surface),
    Math.floor(price * 0.9),
    Math.floor(price * 1.1),
    ['fort', 'très_fort'][Math.floor(Math.random() * 2)],
    Math.floor(Math.random() * 30) + 30,
    ['leboncoin', 'seloger', 'pap'][Math.floor(Math.random() * 3)],
    0.80 + Math.random() * 0.15
  ];
}

function createSuburbHouse(index) {
  var departments = ['92', '93', '94'];
  var dept = departments[Math.floor(Math.random() * 3)];
  var surface = Math.floor(Math.random() * 80) + 80; // 80-160 m²
  var rooms = Math.floor(surface / 20) + 3; // 4-8 pièces
  var price = Math.floor(Math.random() * 300000) + 350000; // 350k-650k
  
  return [
    'PROP_' + String(index + 20).padStart(3, '0'),
    Math.floor(Math.random() * 100) + 1 + ' Avenue des Lilas, 9' + dept + '00',
    ['Boulogne-Billancourt', 'Montreuil', 'Vincennes'][Math.floor(Math.random() * 3)],
    '9' + dept + '00',
    ['Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne'][Math.floor(Math.random() * 3)],
    'Île-de-France',
    48.80 + (Math.random() - 0.5) * 0.2,
    2.30 + (Math.random() - 0.5) * 0.2,
    'maison',
    surface,
    surface + Math.floor(Math.random() * 50) + 20,
    rooms,
    Math.max(2, rooms - 1),
    Math.floor(Math.random() * 3) + 2,
    0,
    1,
    1980 + Math.floor(Math.random() * 30),
    Math.random() > 0.4 ? 2018 + Math.floor(Math.random() * 5) : '',
    ['excellent', 'bon', 'moyen'][Math.floor(Math.random() * 3)],
    ['C', 'D', 'E'][Math.floor(Math.random() * 3)],
    ['C', 'D', 'E'][Math.floor(Math.random() * 3)],
    false,
    Math.random() > 0.7,
    Math.random() > 0.8,
    Math.random() > 0.6,
    true,
    Math.random() > 0.4,
    price,
    Math.floor(price / surface),
    Math.floor(price * 0.9),
    Math.floor(price * 1.1),
    ['moyen', 'fort'][Math.floor(Math.random() * 2)],
    Math.floor(Math.random() * 45) + 45,
    ['leboncoin', 'seloger', 'orpi'][Math.floor(Math.random() * 3)],
    0.75 + Math.random() * 0.15
  ];
}

function createParisStudio(index) {
  var arrondissements = ['75001', '75002', '75003', '75004', '75005'];
  var postal_code = arrondissements[Math.floor(Math.random() * 5)];
  var surface = Math.floor(Math.random() * 15) + 20; // 20-35 m²
  var price = Math.floor(Math.random() * 150000) + 300000; // 300k-450k
  
  return [
    'PROP_' + String(index + 35).padStart(3, '0'),
    Math.floor(Math.random() * 150) + 1 + ' Rue du Faubourg, ' + postal_code + ' Paris',
    'Paris',
    postal_code,
    'Paris',
    'Île-de-France',
    48.85 + (Math.random() - 0.5) * 0.05,
    2.35 + (Math.random() - 0.5) * 0.05,
    'studio',
    surface,
    surface,
    1,
    0,
    1,
    Math.floor(Math.random() * 8) + 1,
    Math.floor(Math.random() * 10) + 4,
    1975 + Math.floor(Math.random() * 35),
    Math.random() > 0.2 ? 2020 + Math.floor(Math.random() * 3) : '',
    ['bon', 'moyen'][Math.floor(Math.random() * 2)],
    ['C', 'D'][Math.floor(Math.random() * 2)],
    ['C', 'D'][Math.floor(Math.random() * 2)],
    Math.random() > 0.3,
    Math.random() > 0.7,
    false,
    false,
    Math.random() > 0.6,
    Math.random() > 0.5,
    price,
    Math.floor(price / surface),
    Math.floor(price * 0.9),
    Math.floor(price * 1.1),
    ['fort', 'très_fort'][Math.floor(Math.random() * 2)],
    Math.floor(Math.random() * 25) + 25,
    ['leboncoin', 'pap'][Math.floor(Math.random() * 2)],
    0.85 + Math.random() * 0.10
  ];
}

function createParisLoft(index) {
  var arrondissements = ['75011', '75019'];
  var postal_code = arrondissements[Math.floor(Math.random() * 2)];
  var surface = Math.floor(Math.random() * 60) + 70; // 70-130 m²
  var rooms = Math.floor(surface / 30) + 2; // 2-5 pièces
  var price = Math.floor(Math.random() * 200000) + 500000; // 500k-700k
  
  return [
    'PROP_' + String(index + 45).padStart(3, '0'),
    Math.floor(Math.random() * 80) + 1 + ' Quai de Jemmapes, ' + postal_code + ' Paris',
    'Paris',
    postal_code,
    'Paris',
    'Île-de-France',
    48.85 + (Math.random() - 0.5) * 0.08,
    2.35 + (Math.random() - 0.5) * 0.08,
    'loft',
    surface,
    surface + Math.floor(Math.random() * 30) + 15,
    rooms,
    Math.max(1, rooms - 1),
    Math.floor(Math.random() * 2) + 1,
    Math.floor(Math.random() * 3) + 1,
    Math.floor(Math.random() * 6) + 3,
    1900 + Math.floor(Math.random() * 50),
    2010 + Math.floor(Math.random() * 13),
    ['excellent', 'bon'][Math.floor(Math.random() * 2)],
    ['B', 'C'][Math.floor(Math.random() * 2)],
    ['B', 'C'][Math.floor(Math.random() * 2)],
    Math.random() > 0.4,
    Math.random() > 0.8,
    Math.random() > 0.9,
    false,
    Math.random() > 0.7,
    Math.random() > 0.6,
    price,
    Math.floor(price / surface),
    Math.floor(price * 0.9),
    Math.floor(price * 1.1),
    'fort',
    Math.floor(Math.random() * 35) + 35,
    ['leboncoin', 'seloger'][Math.floor(Math.random() * 2)],
    0.80 + Math.random() * 0.15
  ];
}

function createLyonApartment(index) {
  var postal_codes = ['69001', '69002', '69003', '69004', '69005', '69006', '69007', '69008', '69009'];
  var postal_code = postal_codes[Math.floor(Math.random() * 9)];
  var surface = Math.floor(Math.random() * 50) + 50; // 50-100 m²
  var rooms = Math.floor(surface / 25) + 2; // 2-5 pièces
  var price = Math.floor(Math.random() * 150000) + 200000; // 200k-350k
  
  return [
    'PROP_' + String(index + 55).padStart(3, '0'),
    Math.floor(Math.random() * 200) + 1 + ' Rue de la République, ' + postal_code + ' Lyon',
    'Lyon',
    postal_code,
    'Rhône',
    'Auvergne-Rhône-Alpes',
    45.75 + (Math.random() - 0.5) * 0.1,
    4.85 + (Math.random() - 0.5) * 0.1,
    'appartement',
    surface,
    surface + Math.floor(Math.random() * 20) + 10,
    rooms,
    Math.max(1, rooms - 1),
    Math.floor(Math.random() * 2) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 8) + 3,
    1975 + Math.floor(Math.random() * 35),
    Math.random() > 0.3 ? 2016 + Math.floor(Math.random() * 7) : '',
    ['excellent', 'bon', 'moyen'][Math.floor(Math.random() * 3)],
    ['B', 'C', 'D'][Math.floor(Math.random() * 3)],
    ['B', 'C', 'D'][Math.floor(Math.random() * 3)],
    Math.random() > 0.4,
    Math.random() > 0.5,
    Math.random() > 0.7,
    false,
    Math.random() > 0.5,
    Math.random() > 0.4,
    price,
    Math.floor(price / surface),
    Math.floor(price * 0.9),
    Math.floor(price * 1.1),
    'fort',
    Math.floor(Math.random() * 40) + 40,
    ['leboncoin', 'seloger', 'pap'][Math.floor(Math.random() * 3)],
    0.78 + Math.random() * 0.17
  ];
}

function createMarseilleHouse(index) {
  var postal_codes = ['13001', '13002', '13003', '13004', '13005', '13006', '13007', '13008'];
  var postal_code = postal_codes[Math.floor(Math.random() * 8)];
  var surface = Math.floor(Math.random() * 70) + 70; // 70-140 m²
  var rooms = Math.floor(surface / 20) + 3; // 3-7 pièces
  var price = Math.floor(Math.random() * 200000) + 250000; // 250k-450k
  
  return [
    'PROP_' + String(index + 70).padStart(3, '0'),
    Math.floor(Math.random() * 150) + 1 + ' Avenue du Prado, ' + postal_code + ' Marseille',
    'Marseille',
    postal_code,
    'Bouches-du-Rhône',
    'Provence-Alpes-Côte d\'Azur',
    43.30 + (Math.random() - 0.5) * 0.1,
    5.40 + (Math.random() - 0.5) * 0.1,
    'maison',
    surface,
    surface + Math.floor(Math.random() * 40) + 20,
    rooms,
    Math.max(2, rooms - 1),
    Math.floor(Math.random() * 3) + 2,
    0,
    1,
    1970 + Math.floor(Math.random() * 40),
    Math.random() > 0.4 ? 2017 + Math.floor(Math.random() * 6) : '',
    ['bon', 'moyen'][Math.floor(Math.random() * 2)],
    ['C', 'D', 'E'][Math.floor(Math.random() * 3)],
    ['C', 'D', 'E'][Math.floor(Math.random() * 3)],
    false,
    Math.random() > 0.6,
    Math.random() > 0.7,
    Math.random() > 0.5,
    true,
    Math.random() > 0.3,
    price,
    Math.floor(price / surface),
    Math.floor(price * 0.9),
    Math.floor(price * 1.1),
    'moyen',
    Math.floor(Math.random() * 50) + 50,
    ['leboncoin', 'seloger', 'orpi'][Math.floor(Math.random() * 3)],
    0.72 + Math.random() * 0.18
  ];
}

function createBordeauxApartment(index) {
  var postal_codes = ['33000', '33100', '33200', '33300', '33400', '33500'];
  var postal_code = postal_codes[Math.floor(Math.random() * 6)];
  var surface = Math.floor(Math.random() * 45) + 55; // 55-100 m²
  var rooms = Math.floor(surface / 25) + 2; // 2-5 pièces
  var price = Math.floor(Math.random() * 120000) + 180000; // 180k-300k
  
  return [
    'PROP_' + String(index + 80).padStart(3, '0'),
    Math.floor(Math.random() * 100) + 1 + ' Cours de l\'Intendance, ' + postal_code + ' Bordeaux',
    'Bordeaux',
    postal_code,
    'Gironde',
    'Nouvelle-Aquitaine',
    44.85 + (Math.random() - 0.5) * 0.08,
    -0.58 + (Math.random() - 0.5) * 0.08,
    'appartement',
    surface,
    surface + Math.floor(Math.random() * 20) + 10,
    rooms,
    Math.max(1, rooms - 1),
    Math.floor(Math.random() * 2) + 1,
    Math.floor(Math.random() * 5) + 2,
    Math.floor(Math.random() * 6) + 2,
    1980 + Math.floor(Math.random() * 30),
    Math.random() > 0.3 ? 2018 + Math.floor(Math.random() * 5) : '',
    ['excellent', 'bon', 'moyen'][Math.floor(Math.random() * 3)],
    ['B', 'C', 'D'][Math.floor(Math.random() * 3)],
    ['B', 'C', 'D'][Math.floor(Math.random() * 3)],
    Math.random() > 0.5,
    Math.random() > 0.6,
    Math.random() > 0.8,
    false,
    Math.random() > 0.4,
    Math.random() > 0.5,
    price,
    Math.floor(price / surface),
    Math.floor(price * 0.9),
    Math.floor(price * 1.1),
    'fort',
    Math.floor(Math.random() * 45) + 45,
    ['leboncoin', 'seloger', 'pap'][Math.floor(Math.random() * 3)],
    0.80 + Math.random() * 0.15
  ];
}

function createToulouseApartment(index) {
  var postal_codes = ['31000', '31100', '31200', '31300', '31400', '31500'];
  var postal_code = postal_codes[Math.floor(Math.random() * 6)];
  var surface = Math.floor(Math.random() * 40) + 50; // 50-90 m²
  var rooms = Math.floor(surface / 25) + 2; // 2-4 pièces
  var price = Math.floor(Math.random() * 100000) + 150000; // 150k-250k
  
  return [
    'PROP_' + String(index + 90).padStart(3, '0'),
    Math.floor(Math.random() * 120) + 1 + ' Place du Capitole, ' + postal_code + ' Toulouse',
    'Toulouse',
    postal_code,
    'Haute-Garonne',
    'Occitanie',
    43.60 + (Math.random() - 0.5) * 0.08,
    1.45 + (Math.random() - 0.5) * 0.08,
    'appartement',
    surface,
    surface + Math.floor(Math.random() * 15) + 10,
    rooms,
    Math.max(1, rooms - 1),
    Math.floor(Math.random() * 2) + 1,
    Math.floor(Math.random() * 5) + 2,
    Math.floor(Math.random() * 6) + 2,
    1985 + Math.floor(Math.random() * 25),
    Math.random() > 0.3 ? 2019 + Math.floor(Math.random() * 4) : '',
    ['excellent', 'bon', 'moyen'][Math.floor(Math.random() * 3)],
    ['B', 'C', 'D'][Math.floor(Math.random() * 3)],
    ['B', 'C', 'D'][Math.floor(Math.random() * 3)],
    Math.random() > 0.4,
    Math.random() > 0.5,
    Math.random() > 0.7,
    false,
    Math.random() > 0.5,
    Math.random() > 0.4,
    price,
    Math.floor(price / surface),
    Math.floor(price * 0.9),
    Math.floor(price * 1.1),
    'moyen',
    Math.floor(Math.random() * 40) + 40,
    ['leboncoin', 'seloger', 'pap'][Math.floor(Math.random() * 3)],
    0.75 + Math.random() * 0.20
  ];
}
