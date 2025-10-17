function createBuyerProfilesDatabase() {
  // Création de la feuille Buyer Profiles
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('Buyer_Profiles');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'user_id',
    'age_range', 'family_situation', 'profession', 'income_level',
    'budget_min', 'budget_max', 'budget_comfortable',
    'preferred_property_type', 'min_rooms', 'max_rooms', 'min_surface', 'max_surface',
    'preferred_cities', 'preferred_departments', 'max_commute_time', 'public_transport_required',
    'price_importance', 'location_importance', 'size_importance', 'condition_importance', 'energy_importance',
    'created_at', 'updated_at'
  ];
  
  // Ajouter les en-têtes
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  var profilesData = [];
  
  // Générer 20 profils acheteurs variés
  for (var i = 1; i <= 20; i++) {
    var profile = generateBuyerProfile(i);
    profilesData.push(profile);
  }
  
  // Ajouter toutes les données
  if (profilesData.length > 0) {
    sheet.getRange(2, 1, profilesData.length, headers.length).setValues(profilesData);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données Buyer Profiles créée avec ' + profilesData.length + ' profils !');
}

function generateBuyerProfile(index) {
  var profile = [
    'BUYER_' + String(index).padStart(3, '0'), // id
    'USER_' + String(index).padStart(3, '0')   // user_id
  ];
  
  // Profil personnel
  var personalData = generatePersonalData(index);
  profile = profile.concat(personalData);
  
  // Budget
  var budgetData = generateBudgetData(index);
  profile = profile.concat(budgetData);
  
  // Préférences immobilières
  var propertyPreferences = generatePropertyPreferences(index);
  profile = profile.concat(propertyPreferences);
  
  // Localisation
  var locationPreferences = generateLocationPreferences(index);
  profile = profile.concat(locationPreferences);
  
  // Critères d'importance
  var importanceCriteria = generateImportanceCriteria(index);
  profile = profile.concat(importanceCriteria);
  
  // Dates
  var now = new Date();
  profile.push(now.toISOString()); // created_at
  profile.push(now.toISOString()); // updated_at
  
  return profile;
}

function generatePersonalData(index) {
  // Répartition des profils par type
  var profileTypes = [
    'young_professional', 'young_professional', 'young_professional', // 3 jeunes actifs
    'young_couple', 'young_couple', // 2 jeunes couples
    'family_with_kids', 'family_with_kids', 'family_with_kids', // 3 familles avec enfants
    'family_large', 'family_large', // 2 familles nombreuses
    'empty_nesters', 'empty_nesters', // 2 couples sans enfants
    'senior', 'senior', 'senior', // 3 seniors
    'investor', 'investor', // 2 investisseurs
    'first_time_buyer', 'first_time_buyer', 'first_time_buyer' // 3 primo-accédants
  ];
  
  var profileType = profileTypes[index - 1];
  
  var ageRange, familySituation, profession, incomeLevel;
  
  switch (profileType) {
    case 'young_professional':
      ageRange = '26-35';
      familySituation = 'célibataire';
      profession = ['Développeur', 'Consultant', 'Marketing Manager'][Math.floor(Math.random() * 3)];
      incomeLevel = ['moyen', 'élevé'][Math.floor(Math.random() * 2)];
      break;
      
    case 'young_couple':
      ageRange = '26-35';
      familySituation = 'couple';
      profession = ['Ingénieur', 'Avocat', 'Commercial'][Math.floor(Math.random() * 3)];
      incomeLevel = ['élevé', 'très_élevé'][Math.floor(Math.random() * 2)];
      break;
      
    case 'family_with_kids':
      ageRange = '36-45';
      familySituation = 'couple_enfants';
      profession = ['Cadre', 'Directeur', 'Médecin'][Math.floor(Math.random() * 3)];
      incomeLevel = ['élevé', 'très_élevé'][Math.floor(Math.random() * 2)];
      break;
      
    case 'family_large':
      ageRange = '36-45';
      familySituation = 'famille_nombreuse';
      profession = ['Enseignant', 'Fonctionnaire', 'Cadre'][Math.floor(Math.random() * 3)];
      incomeLevel = ['moyen', 'élevé'][Math.floor(Math.random() * 2)];
      break;
      
    case 'empty_nesters':
      ageRange = '46-55';
      familySituation = 'couple';
      profession = ['Cadre supérieur', 'Expert-comptable', 'Pharmacien'][Math.floor(Math.random() * 3)];
      incomeLevel = ['élevé', 'très_élevé'][Math.floor(Math.random() * 2)];
      break;
      
    case 'senior':
      ageRange = '56-65';
      familySituation = 'senior';
      profession = ['Retraité', 'Consultant', 'Investisseur'][Math.floor(Math.random() * 3)];
      incomeLevel = ['moyen', 'élevé'][Math.floor(Math.random() * 2)];
      break;
      
    case 'investor':
      ageRange = '36-55';
      familySituation = ['couple', 'célibataire'][Math.floor(Math.random() * 2)];
      profession = ['Investisseur', 'Entrepreneur', 'PDG'][Math.floor(Math.random() * 3)];
      incomeLevel = 'très_élevé';
      break;
      
    case 'first_time_buyer':
      ageRange = '26-35';
      familySituation = ['célibataire', 'couple'][Math.floor(Math.random() * 2)];
      profession = ['Employé', 'Technicien', 'Infirmier'][Math.floor(Math.random() * 3)];
      incomeLevel = ['faible', 'moyen'][Math.floor(Math.random() * 2)];
      break;
      
    default:
      ageRange = '26-35';
      familySituation = 'couple';
      profession = 'Employé';
      incomeLevel = 'moyen';
  }
  
  return [ageRange, familySituation, profession, incomeLevel];
}

function generateBudgetData(index) {
  var profileTypes = [
    'young_professional', 'young_professional', 'young_professional',
    'young_couple', 'young_couple',
    'family_with_kids', 'family_with_kids', 'family_with_kids',
    'family_large', 'family_large',
    'empty_nesters', 'empty_nesters',
    'senior', 'senior', 'senior',
    'investor', 'investor',
    'first_time_buyer', 'first_time_buyer', 'first_time_buyer'
  ];
  
  var profileType = profileTypes[index - 1];
  var budgetMin, budgetMax, budgetComfortable;
  
  switch (profileType) {
    case 'young_professional':
      budgetMin = 250000 + Math.random() * 50000; // 250k-300k
      budgetMax = 400000 + Math.random() * 100000; // 400k-500k
      budgetComfortable = budgetMin + (budgetMax - budgetMin) * 0.7;
      break;
      
    case 'young_couple':
      budgetMin = 350000 + Math.random() * 50000; // 350k-400k
      budgetMax = 600000 + Math.random() * 100000; // 600k-700k
      budgetComfortable = budgetMin + (budgetMax - budgetMin) * 0.6;
      break;
      
    case 'family_with_kids':
      budgetMin = 450000 + Math.random() * 50000; // 450k-500k
      budgetMax = 800000 + Math.random() * 200000; // 800k-1000k
      budgetComfortable = budgetMin + (budgetMax - budgetMin) * 0.5;
      break;
      
    case 'family_large':
      budgetMin = 400000 + Math.random() * 50000; // 400k-450k
      budgetMax = 700000 + Math.random() * 100000; // 700k-800k
      budgetComfortable = budgetMin + (budgetMax - budgetMin) * 0.6;
      break;
      
    case 'empty_nesters':
      budgetMin = 500000 + Math.random() * 100000; // 500k-600k
      budgetMax = 900000 + Math.random() * 300000; // 900k-1200k
      budgetComfortable = budgetMin + (budgetMax - budgetMin) * 0.4;
      break;
      
    case 'senior':
      budgetMin = 300000 + Math.random() * 100000; // 300k-400k
      budgetMax = 600000 + Math.random() * 200000; // 600k-800k
      budgetComfortable = budgetMin + (budgetMax - budgetMin) * 0.5;
      break;
      
    case 'investor':
      budgetMin = 200000 + Math.random() * 100000; // 200k-300k
      budgetMax = 1000000 + Math.random() * 500000; // 1000k-1500k
      budgetComfortable = budgetMin + (budgetMax - budgetMin) * 0.3;
      break;
      
    case 'first_time_buyer':
      budgetMin = 180000 + Math.random() * 50000; // 180k-230k
      budgetMax = 350000 + Math.random() * 50000; // 350k-400k
      budgetComfortable = budgetMin + (budgetMax - budgetMin) * 0.8;
      break;
      
    default:
      budgetMin = 300000;
      budgetMax = 500000;
      budgetComfortable = 400000;
  }
  
  return [
    Math.round(budgetMin),      // budget_min
    Math.round(budgetMax),      // budget_max
    Math.round(budgetComfortable) // budget_comfortable
  ];
}

function generatePropertyPreferences(index) {
  var profileTypes = [
    'young_professional', 'young_professional', 'young_professional',
    'young_couple', 'young_couple',
    'family_with_kids', 'family_with_kids', 'family_with_kids',
    'family_large', 'family_large',
    'empty_nesters', 'empty_nesters',
    'senior', 'senior', 'senior',
    'investor', 'investor',
    'first_time_buyer', 'first_time_buyer', 'first_time_buyer'
  ];
  
  var profileType = profileTypes[index - 1];
  var propertyType, minRooms, maxRooms, minSurface, maxSurface;
  
  switch (profileType) {
    case 'young_professional':
      propertyType = 'appartement';
      minRooms = 2;
      maxRooms = 3;
      minSurface = 45;
      maxSurface = 70;
      break;
      
    case 'young_couple':
      propertyType = 'appartement';
      minRooms = 3;
      maxRooms = 4;
      minSurface = 60;
      maxSurface = 90;
      break;
      
    case 'family_with_kids':
      propertyType = ['appartement', 'maison'][Math.floor(Math.random() * 2)];
      minRooms = 4;
      maxRooms = 5;
      minSurface = 80;
      maxSurface = 120;
      break;
      
    case 'family_large':
      propertyType = 'maison';
      minRooms = 5;
      maxRooms = 6;
      minSurface = 100;
      maxSurface = 150;
      break;
      
    case 'empty_nesters':
      propertyType = ['appartement', 'maison'][Math.floor(Math.random() * 2)];
      minRooms = 3;
      maxRooms = 5;
      minSurface = 70;
      maxSurface = 120;
      break;
      
    case 'senior':
      propertyType = 'appartement';
      minRooms = 2;
      maxRooms = 4;
      minSurface = 50;
      maxSurface = 80;
      break;
      
    case 'investor':
      propertyType = ['appartement', 'studio'][Math.floor(Math.random() * 2)];
      minRooms = 1;
      maxRooms = 3;
      minSurface = 25;
      maxSurface = 80;
      break;
      
    case 'first_time_buyer':
      propertyType = 'appartement';
      minRooms = 2;
      maxRooms = 3;
      minSurface = 40;
      maxSurface = 65;
      break;
      
    default:
      propertyType = 'appartement';
      minRooms = 3;
      maxRooms = 4;
      minSurface = 60;
      maxSurface = 90;
  }
  
  return [propertyType, minRooms, maxRooms, minSurface, maxSurface];
}

function generateLocationPreferences(index) {
  // Préférences de localisation selon le profil
  var cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux'];
  var departments = ['75', '69', '13', '31', '33', '92', '93', '94'];
  
  var preferredCities = cities[Math.floor(Math.random() * cities.length)];
  var preferredDepartments = departments[Math.floor(Math.random() * departments.length)];
  var maxCommuteTime = Math.floor(Math.random() * 60) + 30; // 30-90 min
  var publicTransportRequired = Math.random() > 0.3; // 70% nécessitent transport public
  
  return [preferredCities, preferredDepartments, maxCommuteTime, publicTransportRequired];
}

function generateImportanceCriteria(index) {
  // Critères d'importance selon le profil
  var profileTypes = [
    'young_professional', 'young_professional', 'young_professional',
    'young_couple', 'young_couple',
    'family_with_kids', 'family_with_kids', 'family_with_kids',
    'family_large', 'family_large',
    'empty_nesters', 'empty_nesters',
    'senior', 'senior', 'senior',
    'investor', 'investor',
    'first_time_buyer', 'first_time_buyer', 'first_time_buyer'
  ];
  
  var profileType = profileTypes[index - 1];
  var priceImportance, locationImportance, sizeImportance, conditionImportance, energyImportance;
  
  switch (profileType) {
    case 'young_professional':
      priceImportance = 'important';
      locationImportance = 'très_important';
      sizeImportance = 'moyen';
      conditionImportance = 'important';
      energyImportance = 'peu_important';
      break;
      
    case 'young_couple':
      priceImportance = 'important';
      locationImportance = 'très_important';
      sizeImportance = 'important';
      conditionImportance = 'important';
      energyImportance = 'moyen';
      break;
      
    case 'family_with_kids':
      priceImportance = 'moyen';
      locationImportance = 'très_important';
      sizeImportance = 'très_important';
      conditionImportance = 'important';
      energyImportance = 'important';
      break;
      
    case 'family_large':
      priceImportance = 'important';
      locationImportance = 'important';
      sizeImportance = 'très_important';
      conditionImportance = 'important';
      energyImportance = 'important';
      break;
      
    case 'empty_nesters':
      priceImportance = 'peu_important';
      locationImportance = 'très_important';
      sizeImportance = 'moyen';
      conditionImportance = 'très_important';
      energyImportance = 'important';
      break;
      
    case 'senior':
      priceImportance = 'important';
      locationImportance = 'très_important';
      sizeImportance = 'peu_important';
      conditionImportance = 'très_important';
      energyImportance = 'important';
      break;
      
    case 'investor':
      priceImportance = 'très_important';
      locationImportance = 'important';
      sizeImportance = 'peu_important';
      conditionImportance = 'important';
      energyImportance = 'moyen';
      break;
      
    case 'first_time_buyer':
      priceImportance = 'très_important';
      locationImportance = 'important';
      sizeImportance = 'important';
      conditionImportance = 'moyen';
      energyImportance = 'peu_important';
      break;
      
    default:
      priceImportance = 'important';
      locationImportance = 'important';
      sizeImportance = 'important';
      conditionImportance = 'important';
      energyImportance = 'moyen';
  }
  
  return [priceImportance, locationImportance, sizeImportance, conditionImportance, energyImportance];
}
