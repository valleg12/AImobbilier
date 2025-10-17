function createEnergyAnalysisDatabase() {
  // Création de la feuille Energy Analysis
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('Energy_Analysis');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'property_id',
    'current_energy_consumption', 'current_heating_consumption', 'current_hot_water_consumption',
    'current_energy_cost_annual', 'energy_cost_per_sqm',
    'insulation_improvement_potential', 'heating_system_upgrade_potential', 'windows_improvement_potential',
    'insulation_investment', 'insulation_savings_annual', 'insulation_payback_years',
    'heating_system_investment', 'heating_system_savings_annual', 'heating_system_payback_years',
    'windows_investment', 'windows_savings_annual', 'windows_payback_years',
    'total_investment_needed', 'total_savings_annual', 'total_payback_years',
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
  var energyData = [];
  
  // Générer les analyses énergétiques pour chaque propriété
  for (var i = 0; i < propertyIds.length; i++) {
    var propertyId = propertyIds[i][0];
    var energy = generateEnergyAnalysisForProperty(propertyId);
    energyData.push(energy);
  }
  
  // Ajouter toutes les données
  if (energyData.length > 0) {
    sheet.getRange(2, 1, energyData.length, headers.length).setValues(energyData);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données Energy Analysis créée avec ' + energyData.length + ' entrées !');
}

function generateEnergyAnalysisForProperty(propertyId) {
  // Déterminer le type de ville basé sur l'ID de propriété
  var cityType = getCityTypeFromPropertyId(propertyId);
  
  // Générer les données selon le type de ville
  var energy = [
    'ENERGY_' + propertyId.substring(4), // ID basé sur l'ID de la propriété
    propertyId
  ];
  
  // Consommations actuelles
  var consumptionData = calculateCurrentConsumption(cityType);
  energy = energy.concat(consumptionData);
  
  // Coûts énergétiques
  var costData = calculateEnergyCosts(consumptionData);
  energy = energy.concat(costData);
  
  // Potentiels d'amélioration
  var improvementData = calculateImprovementPotentials(cityType);
  energy = energy.concat(improvementData);
  
  // Investissements et économies
  var investmentData = calculateInvestmentsAndSavings(cityType, consumptionData, improvementData);
  energy = energy.concat(investmentData);
  
  // Date de création
  energy.push(new Date().toISOString());
  
  return energy;
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

function calculateCurrentConsumption(cityType) {
  var totalConsumption, heatingConsumption, hotWaterConsumption;
  
  // Consommation totale selon la ville et le type de logement
  switch (cityType) {
    case 'paris_center':
      // Paris centre - logements plus récents, meilleure isolation
      totalConsumption = 12000 + Math.random() * 8000; // 12-20 MWh/an
      break;
    case 'paris_suburb':
      // Banlieue - maisons individuelles, plus de consommation
      totalConsumption = 15000 + Math.random() * 10000; // 15-25 MWh/an
      break;
    case 'lyon':
      // Lyon - climat plus froid
      totalConsumption = 13000 + Math.random() * 9000; // 13-22 MWh/an
      break;
    case 'marseille':
      // Marseille - climat plus chaud
      totalConsumption = 10000 + Math.random() * 7000; // 10-17 MWh/an
      break;
    case 'bordeaux':
      // Bordeaux - climat tempéré
      totalConsumption = 11000 + Math.random() * 8000; // 11-19 MWh/an
      break;
    case 'toulouse':
      // Toulouse - climat tempéré
      totalConsumption = 12000 + Math.random() * 8000; // 12-20 MWh/an
      break;
    default:
      totalConsumption = 12000 + Math.random() * 8000; // 12-20 MWh/an
  }
  
  // Répartition entre chauffage et eau chaude
  heatingConsumption = totalConsumption * (0.65 + Math.random() * 0.15); // 65-80%
  hotWaterConsumption = totalConsumption * (0.15 + Math.random() * 0.10); // 15-25%
  
  return [
    Math.round(totalConsumption),      // current_energy_consumption
    Math.round(heatingConsumption),    // current_heating_consumption
    Math.round(hotWaterConsumption)    // current_hot_water_consumption
  ];
}

function calculateEnergyCosts(consumptionData) {
  var totalConsumption = consumptionData[0];
  
  // Prix de l'énergie : 0.15 à 0.25 €/kWh selon le fournisseur et le contrat
  var energyPricePerKwh = 0.15 + Math.random() * 0.10;
  
  // Coût annuel total
  var annualCost = totalConsumption * energyPricePerKwh;
  
  // Surface moyenne estimée (pour calculer le coût au m²)
  var averageSurface = 75; // m²
  var costPerSqm = annualCost / averageSurface;
  
  return [
    Math.round(annualCost * 100) / 100,        // current_energy_cost_annual
    Math.round(costPerSqm * 100) / 100         // energy_cost_per_sqm
  ];
}

function calculateImprovementPotentials(cityType) {
  var insulationPotential, heatingPotential, windowsPotential;
  
  // Potentiel d'amélioration selon l'âge et le type de logement
  switch (cityType) {
    case 'paris_center':
      // Paris centre - logements plus récents
      insulationPotential = 15 + Math.random() * 20; // 15-35%
      heatingPotential = 10 + Math.random() * 15;    // 10-25%
      windowsPotential = 8 + Math.random() * 12;     // 8-20%
      break;
    case 'paris_suburb':
      // Banlieue - maisons plus anciennes
      insulationPotential = 25 + Math.random() * 20; // 25-45%
      heatingPotential = 20 + Math.random() * 20;    // 20-40%
      windowsPotential = 15 + Math.random() * 15;    // 15-30%
      break;
    case 'lyon':
      // Lyon - climat froid, besoins de chauffage
      insulationPotential = 20 + Math.random() * 25; // 20-45%
      heatingPotential = 18 + Math.random() * 22;    // 18-40%
      windowsPotential = 12 + Math.random() * 18;    // 12-30%
      break;
    case 'marseille':
      // Marseille - climat chaud, moins de chauffage
      insulationPotential = 15 + Math.random() * 20; // 15-35%
      heatingPotential = 12 + Math.random() * 18;    // 12-30%
      windowsPotential = 10 + Math.random() * 15;    // 10-25%
      break;
    case 'bordeaux':
      // Bordeaux - climat tempéré
      insulationPotential = 18 + Math.random() * 22; // 18-40%
      heatingPotential = 15 + Math.random() * 20;    // 15-35%
      windowsPotential = 12 + Math.random() * 18;    // 12-30%
      break;
    case 'toulouse':
      // Toulouse - climat tempéré
      insulationPotential = 18 + Math.random() * 22; // 18-40%
      heatingPotential = 15 + Math.random() * 20;    // 15-35%
      windowsPotential = 12 + Math.random() * 18;    // 12-30%
      break;
    default:
      insulationPotential = 20 + Math.random() * 20; // 20-40%
      heatingPotential = 15 + Math.random() * 20;    // 15-35%
      windowsPotential = 12 + Math.random() * 15;    // 12-27%
  }
  
  return [
    Math.round(insulationPotential * 100) / 100,     // insulation_improvement_potential
    Math.round(heatingPotential * 100) / 100,        // heating_system_upgrade_potential
    Math.round(windowsPotential * 100) / 100         // windows_improvement_potential
  ];
}

function calculateInvestmentsAndSavings(cityType, consumptionData, improvementData) {
  var totalConsumption = consumptionData[0];
  var annualCost = consumptionData[0] * (0.15 + Math.random() * 0.10);
  
  var insulationPotential = improvementData[0] / 100;
  var heatingPotential = improvementData[1] / 100;
  var windowsPotential = improvementData[2] / 100;
  
  // Investissements selon le type de logement
  var baseInvestment;
  switch (cityType) {
    case 'paris_center':
      baseInvestment = 8000; // Logements plus récents
      break;
    case 'paris_suburb':
      baseInvestment = 12000; // Maisons individuelles
      break;
    case 'lyon':
      baseInvestment = 10000; // Climat froid
      break;
    case 'marseille':
      baseInvestment = 7000; // Climat chaud
      break;
    case 'bordeaux':
      baseInvestment = 9000; // Climat tempéré
      break;
    case 'toulouse':
      baseInvestment = 9000; // Climat tempéré
      break;
    default:
      baseInvestment = 10000;
  }
  
  // Isolation
  var insulationInvestment = baseInvestment * (0.8 + Math.random() * 0.4);
  var insulationSavings = annualCost * insulationPotential * 0.7; // 70% des économies théoriques
  var insulationPayback = insulationInvestment / insulationSavings;
  
  // Système de chauffage
  var heatingInvestment = baseInvestment * (0.6 + Math.random() * 0.4);
  var heatingSavings = annualCost * heatingPotential * 0.8; // 80% des économies théoriques
  var heatingPayback = heatingInvestment / heatingSavings;
  
  // Fenêtres
  var windowsInvestment = baseInvestment * (0.3 + Math.random() * 0.2);
  var windowsSavings = annualCost * windowsPotential * 0.6; // 60% des économies théoriques
  var windowsPayback = windowsInvestment / windowsSavings;
  
  // Totaux
  var totalInvestment = insulationInvestment + heatingInvestment + windowsInvestment;
  var totalSavings = insulationSavings + heatingSavings + windowsSavings;
  var totalPayback = totalInvestment / totalSavings;
  
  return [
    Math.round(insulationInvestment),     // insulation_investment
    Math.round(insulationSavings),        // insulation_savings_annual
    Math.round(insulationPayback * 100) / 100, // insulation_payback_years
    Math.round(heatingInvestment),        // heating_system_investment
    Math.round(heatingSavings),           // heating_system_savings_annual
    Math.round(heatingPayback * 100) / 100, // heating_system_payback_years
    Math.round(windowsInvestment),        // windows_investment
    Math.round(windowsSavings),           // windows_savings_annual
    Math.round(windowsPayback * 100) / 100, // windows_payback_years
    Math.round(totalInvestment),          // total_investment_needed
    Math.round(totalSavings),             // total_savings_annual
    Math.round(totalPayback * 100) / 100  // total_payback_years
  ];
}
