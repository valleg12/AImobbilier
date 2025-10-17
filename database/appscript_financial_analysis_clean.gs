function createFinancialAnalysisDatabase() {
  // Création de la feuille Financial Analysis
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('Financial_Analysis');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'property_id',
    'rental_yield', 'monthly_rent_estimate', 'annual_rent_estimate',
    'property_tax_annual', 'maintenance_cost_annual', 'insurance_cost_annual', 'management_fees_annual',
    'total_charges_annual', 'net_rental_income', 'net_yield',
    'tax_regime', 'tax_benefits_annual', 'after_tax_yield',
    'scenario_optimistic_yield', 'scenario_realistic_yield', 'scenario_pessimistic_yield',
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
  var financialData = [];
  
  // Générer les analyses financières pour chaque propriété
  for (var i = 0; i < propertyIds.length; i++) {
    var propertyId = propertyIds[i][0];
    var financial = generateFinancialAnalysisForProperty(propertyId);
    financialData.push(financial);
  }
  
  // Ajouter toutes les données
  if (financialData.length > 0) {
    sheet.getRange(2, 1, financialData.length, headers.length).setValues(financialData);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données Financial Analysis créée avec ' + financialData.length + ' entrées !');
}

function generateFinancialAnalysisForProperty(propertyId) {
  // Déterminer le type de ville basé sur l'ID de propriété
  var cityType = getCityTypeFromPropertyId(propertyId);
  
  // Générer les données selon le type de ville
  var financial = [
    'FIN_' + propertyId.substring(4), // ID basé sur l'ID de la propriété
    propertyId
  ];
  
  // Calculs de base
  var baseData = calculateBaseFinancialData(cityType);
  financial = financial.concat(baseData);
  
  // Charges
  var chargesData = calculateChargesData(cityType, baseData);
  financial = financial.concat(chargesData);
  
  // Fiscalité
  var taxData = calculateTaxData(cityType, baseData, chargesData);
  financial = financial.concat(taxData);
  
  // Scénarios
  var scenariosData = calculateScenariosData(baseData, chargesData);
  financial = financial.concat(scenariosData);
  
  // Date de création
  financial.push(new Date().toISOString());
  
  return financial;
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

function calculateBaseFinancialData(cityType) {
  var rentalYield, monthlyRent, annualRent;
  
  // Rendement locatif selon la ville (en %)
  switch (cityType) {
    case 'paris_center':
      rentalYield = 3.0 + Math.random() * 1.5; // 3.0-4.5%
      break;
    case 'paris_suburb':
      rentalYield = 4.0 + Math.random() * 2.0; // 4.0-6.0%
      break;
    case 'lyon':
      rentalYield = 4.5 + Math.random() * 2.0; // 4.5-6.5%
      break;
    case 'marseille':
      rentalYield = 5.0 + Math.random() * 2.5; // 5.0-7.5%
      break;
    case 'bordeaux':
      rentalYield = 4.0 + Math.random() * 2.0; // 4.0-6.0%
      break;
    case 'toulouse':
      rentalYield = 4.5 + Math.random() * 2.5; // 4.5-7.0%
      break;
    default:
      rentalYield = 4.0 + Math.random() * 2.0; // 4.0-6.0%
  }
  
  // Prix d'achat estimé selon la ville
  var propertyPrice = getPropertyPriceByCityType(cityType);
  
  // Calcul du loyer mensuel basé sur le rendement
  annualRent = propertyPrice * (rentalYield / 100);
  monthlyRent = annualRent / 12;
  
  return [
    Math.round(rentalYield * 100) / 100,      // rental_yield
    Math.round(monthlyRent),                  // monthly_rent_estimate
    Math.round(annualRent)                    // annual_rent_estimate
  ];
}

function getPropertyPriceByCityType(cityType) {
  // Prix d'achat moyen selon la ville
  switch (cityType) {
    case 'paris_center':
      return 450000 + Math.random() * 200000; // 450k-650k
    case 'paris_suburb':
      return 350000 + Math.random() * 150000; // 350k-500k
    case 'lyon':
      return 280000 + Math.random() * 120000; // 280k-400k
    case 'marseille':
      return 250000 + Math.random() * 100000; // 250k-350k
    case 'bordeaux':
      return 220000 + Math.random() * 80000;  // 220k-300k
    case 'toulouse':
      return 200000 + Math.random() * 70000;  // 200k-270k
    default:
      return 250000 + Math.random() * 100000; // 250k-350k
  }
}

function calculateChargesData(cityType, baseData) {
  var annualRent = baseData[2];
  var propertyPrice = getPropertyPriceByCityType(cityType);
  
  // Taxe foncière (0.5% à 1.5% du prix d'achat)
  var propertyTaxRate = 0.005 + Math.random() * 0.01;
  var propertyTax = propertyPrice * propertyTaxRate;
  
  // Frais de maintenance (8% à 15% du loyer annuel)
  var maintenanceRate = 0.08 + Math.random() * 0.07;
  var maintenanceCost = annualRent * maintenanceRate;
  
  // Assurance (0.3% à 0.8% du prix d'achat)
  var insuranceRate = 0.003 + Math.random() * 0.005;
  var insuranceCost = propertyPrice * insuranceRate;
  
  // Frais de gestion (5% à 10% du loyer annuel)
  var managementRate = 0.05 + Math.random() * 0.05;
  var managementFees = annualRent * managementRate;
  
  // Total des charges
  var totalCharges = propertyTax + maintenanceCost + insuranceCost + managementFees;
  
  // Revenus locatifs nets
  var netRentalIncome = annualRent - totalCharges;
  
  // Rendement net
  var netYield = (netRentalIncome / propertyPrice) * 100;
  
  return [
    Math.round(propertyTax),        // property_tax_annual
    Math.round(maintenanceCost),    // maintenance_cost_annual
    Math.round(insuranceCost),      // insurance_cost_annual
    Math.round(managementFees),     // management_fees_annual
    Math.round(totalCharges),       // total_charges_annual
    Math.round(netRentalIncome),    // net_rental_income
    Math.round(netYield * 100) / 100 // net_yield
  ];
}

function calculateTaxData(cityType, baseData, chargesData) {
  var annualRent = baseData[2];
  var netRentalIncome = chargesData[5];
  
  // Régime fiscal (distribution réaliste)
  var taxRegimes = ['lmnp', 'lmp', 'deficit_foncier', 'pinel', 'autre'];
  var regimeWeights = [0.60, 0.25, 0.10, 0.03, 0.02]; // 60% LMNP, 25% LMP, etc.
  var taxRegime = getWeightedRandomTaxRegime(taxRegimes, regimeWeights);
  
  var taxBenefits, afterTaxYield;
  
  switch (taxRegime) {
    case 'lmnp':
      // LMNP - avantages sur les charges et amortissement
      taxBenefits = netRentalIncome * (0.15 + Math.random() * 0.10); // 15-25%
      afterTaxYield = (netRentalIncome - taxBenefits * 0.3) / getPropertyPriceByCityType(cityType) * 100;
      break;
      
    case 'lmp':
      // LMP - régime micro-foncier
      taxBenefits = netRentalIncome * (0.10 + Math.random() * 0.05); // 10-15%
      afterTaxYield = (netRentalIncome - taxBenefits * 0.5) / getPropertyPriceByCityType(cityType) * 100;
      break;
      
    case 'deficit_foncier':
      // Déficit foncier - réduction d'impôt
      taxBenefits = netRentalIncome * (0.20 + Math.random() * 0.15); // 20-35%
      afterTaxYield = (netRentalIncome - taxBenefits * 0.2) / getPropertyPriceByCityType(cityType) * 100;
      break;
      
    case 'pinel':
      // Pinel - avantages fiscaux importants
      taxBenefits = annualRent * (0.12 + Math.random() * 0.08); // 12-20%
      afterTaxYield = (netRentalIncome + taxBenefits) / getPropertyPriceByCityType(cityType) * 100;
      break;
      
    default:
      // Autre régime
      taxBenefits = netRentalIncome * (0.05 + Math.random() * 0.05); // 5-10%
      afterTaxYield = (netRentalIncome - taxBenefits * 0.4) / getPropertyPriceByCityType(cityType) * 100;
  }
  
  return [
    taxRegime,                                    // tax_regime
    Math.round(taxBenefits),                      // tax_benefits_annual
    Math.round(afterTaxYield * 100) / 100        // after_tax_yield
  ];
}

function calculateScenariosData(baseData, chargesData) {
  var realisticYield = baseData[0]; // rental_yield
  var netYield = chargesData[6];
  
  // Scénario optimiste (+20% à +40%)
  var optimisticYield = netYield * (1.2 + Math.random() * 0.2);
  
  // Scénario pessimiste (-15% à -30%)
  var pessimisticYield = netYield * (0.7 + Math.random() * 0.15);
  
  return [
    Math.round(optimisticYield * 100) / 100,     // scenario_optimistic_yield
    Math.round(netYield * 100) / 100,           // scenario_realistic_yield
    Math.round(pessimisticYield * 100) / 100    // scenario_pessimistic_yield
  ];
}

function getWeightedRandomTaxRegime(taxRegimes, weights) {
  var random = Math.random();
  var cumulativeWeight = 0;
  
  for (var i = 0; i < taxRegimes.length; i++) {
    cumulativeWeight += weights[i];
    if (random <= cumulativeWeight) {
      return taxRegimes[i];
    }
  }
  
  return taxRegimes[taxRegimes.length - 1]; // Fallback
}
