function createMarketDataDatabase() {
  // Création de la feuille Market Data
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.insertSheet('Market_Data');
  
  // En-têtes des colonnes
  var headers = [
    'id', 'city', 'postal_code', 'department', 'region', 'date_month',
    'avg_price_per_sqm', 'avg_price_total', 'price_trend', 'price_evolution_pct',
    'transactions_count', 'transactions_trend', 'avg_time_to_sell', 'time_to_sell_trend',
    'demand_level', 'demand_trend', 'supply_count', 'supply_level', 'created_at'
  ];
  
  // Ajouter les en-têtes
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Villes et leurs données de base
  var cities = [
    {name: 'Paris', postal: '75001', dept: 'Paris', region: 'Île-de-France', basePrice: 8500, baseTransactions: 1250},
    {name: 'Lyon', postal: '69001', dept: 'Rhône', region: 'Auvergne-Rhône-Alpes', basePrice: 4200, baseTransactions: 680},
    {name: 'Marseille', postal: '13001', dept: 'Bouches-du-Rhône', region: 'Provence-Alpes-Côte d\'Azur', basePrice: 3200, baseTransactions: 520},
    {name: 'Toulouse', postal: '31000', dept: 'Haute-Garonne', region: 'Occitanie', basePrice: 2800, baseTransactions: 450},
    {name: 'Nice', postal: '06000', dept: 'Alpes-Maritimes', region: 'Provence-Alpes-Côte d\'Azur', basePrice: 4500, baseTransactions: 380},
    {name: 'Nantes', postal: '44000', dept: 'Loire-Atlantique', region: 'Pays de la Loire', basePrice: 3200, baseTransactions: 420},
    {name: 'Montpellier', postal: '34000', dept: 'Hérault', region: 'Occitanie', basePrice: 3500, baseTransactions: 350},
    {name: 'Strasbourg', postal: '67000', dept: 'Bas-Rhin', region: 'Grand Est', basePrice: 2800, baseTransactions: 320},
    {name: 'Bordeaux', postal: '33000', dept: 'Gironde', region: 'Nouvelle-Aquitaine', basePrice: 3800, baseTransactions: 480},
    {name: 'Lille', postal: '59000', dept: 'Nord', region: 'Hauts-de-France', basePrice: 2200, baseTransactions: 380},
    {name: 'Rennes', postal: '35000', dept: 'Ille-et-Vilaine', region: 'Bretagne', basePrice: 3000, baseTransactions: 350},
    {name: 'Reims', postal: '51100', dept: 'Marne', region: 'Grand Est', basePrice: 1800, baseTransactions: 280},
    {name: 'Saint-Étienne', postal: '42000', dept: 'Loire', region: 'Auvergne-Rhône-Alpes', basePrice: 1500, baseTransactions: 250},
    {name: 'Le Havre', postal: '76600', dept: 'Seine-Maritime', region: 'Normandie', basePrice: 1600, baseTransactions: 200},
    {name: 'Toulon', postal: '83000', dept: 'Var', region: 'Provence-Alpes-Côte d\'Azur', basePrice: 3200, baseTransactions: 300},
    {name: 'Grenoble', postal: '38000', dept: 'Isère', region: 'Auvergne-Rhône-Alpes', basePrice: 2800, baseTransactions: 320},
    {name: 'Dijon', postal: '21000', dept: 'Côte-d\'Or', region: 'Bourgogne-Franche-Comté', basePrice: 2000, baseTransactions: 250},
    {name: 'Angers', postal: '49000', dept: 'Maine-et-Loire', region: 'Pays de la Loire', basePrice: 2200, baseTransactions: 280},
    {name: 'Nîmes', postal: '30000', dept: 'Gard', region: 'Occitanie', basePrice: 1800, baseTransactions: 220},
    {name: 'Villeurbanne', postal: '69100', dept: 'Rhône', region: 'Auvergne-Rhône-Alpes', basePrice: 3500, baseTransactions: 180}
  ];
  
  var marketData = [];
  var dataIndex = 1;
  
  // Générer 12 mois de données pour chaque ville (240 entrées au total)
  for (var cityIndex = 0; cityIndex < cities.length; cityIndex++) {
    var city = cities[cityIndex];
    
    for (var month = 1; month <= 12; month++) {
      var date = new Date(2024, month - 1, 1);
      var dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      
      // Évolution des prix sur l'année (tendance générale + variation mensuelle)
      var yearlyTrend = 0.02 + (Math.random() - 0.5) * 0.01; // +1% à +3% par an
      var monthlyVariation = (Math.random() - 0.5) * 0.02; // ±1% par mois
      var priceEvolution = yearlyTrend / 12 + monthlyVariation;
      
      var currentPrice = city.basePrice * (1 + priceEvolution * month);
      var avgPriceTotal = currentPrice * 75; // Surface moyenne de 75m²
      
      // Tendance des prix
      var priceTrend = priceEvolution > 0.005 ? 'hausse' : (priceEvolution < -0.005 ? 'baisse' : 'stabilite');
      
      // Transactions (variation saisonnière)
      var seasonalFactor = getSeasonalFactor(month);
      var transactionsCount = Math.floor(city.baseTransactions * seasonalFactor * (0.8 + Math.random() * 0.4));
      var transactionsTrend = Math.random() > 0.5 ? 'hausse' : (Math.random() > 0.5 ? 'baisse' : 'stabilite');
      
      // Temps de vente (inversement proportionnel à la demande)
      var baseTimeToSell = getBaseTimeToSell(city.name);
      var avgTimeToSell = Math.floor(baseTimeToSell * (0.8 + Math.random() * 0.4));
      var timeToSellTrend = Math.random() > 0.5 ? 'baisse' : (Math.random() > 0.5 ? 'hausse' : 'stabilite');
      
      // Niveau de demande
      var demandLevel = getDemandLevel(city.name, month);
      var demandTrend = Math.random() > 0.5 ? 'hausse' : (Math.random() > 0.5 ? 'baisse' : 'stabilite');
      
      // Offre
      var supplyCount = Math.floor(transactionsCount * (1.5 + Math.random() * 1.0));
      var supplyLevel = getSupplyLevel(supplyCount, transactionsCount);
      
      var marketEntry = [
        'MARKET_' + String(dataIndex).padStart(3, '0'),
        city.name,
        city.postal,
        city.dept,
        city.region,
        dateStr,
        Math.round(currentPrice * 100) / 100,
        Math.round(avgPriceTotal),
        priceTrend,
        Math.round(priceEvolution * 10000) / 100, // En pourcentage
        transactionsCount,
        transactionsTrend,
        avgTimeToSell,
        timeToSellTrend,
        demandLevel,
        demandTrend,
        supplyCount,
        supplyLevel,
        new Date().toISOString()
      ];
      
      marketData.push(marketEntry);
      dataIndex++;
    }
  }
  
  // Ajouter toutes les données
  if (marketData.length > 0) {
    sheet.getRange(2, 1, marketData.length, headers.length).setValues(marketData);
  }
  
  // Formater la feuille
  sheet.autoResizeColumns(1, headers.length);
  
  SpreadsheetApp.getUi().alert('Base de données Market Data créée avec ' + marketData.length + ' entrées !');
}

function getSeasonalFactor(month) {
  // Facteurs saisonniers pour l'immobilier
  var seasonalFactors = {
    1: 0.7,   // Janvier - bas
    2: 0.8,   // Février - bas
    3: 1.1,   // Mars - hausse
    4: 1.2,   // Avril - fort
    5: 1.3,   // Mai - très fort
    6: 1.2,   // Juin - fort
    7: 0.9,   // Juillet - moyen
    8: 0.8,   // Août - bas
    9: 1.1,   // Septembre - hausse
    10: 1.2,  // Octobre - fort
    11: 1.0,  // Novembre - normal
    12: 0.8   // Décembre - bas
  };
  
  return seasonalFactors[month] || 1.0;
}

function getBaseTimeToSell(cityName) {
  // Temps de vente de base selon la ville
  var baseTimes = {
    'Paris': 45,
    'Lyon': 55,
    'Marseille': 65,
    'Toulouse': 60,
    'Nice': 70,
    'Nantes': 50,
    'Montpellier': 55,
    'Strasbourg': 60,
    'Bordeaux': 50,
    'Lille': 65,
    'Rennes': 55,
    'Reims': 70,
    'Saint-Étienne': 80,
    'Le Havre': 75,
    'Toulon': 65,
    'Grenoble': 60,
    'Dijon': 70,
    'Angers': 65,
    'Nîmes': 75,
    'Villeurbanne': 50
  };
  
  return baseTimes[cityName] || 60;
}

function getDemandLevel(cityName, month) {
  // Niveau de demande selon la ville et la saison
  var baseDemand = {
    'Paris': 'très_fort',
    'Lyon': 'fort',
    'Marseille': 'moyen',
    'Toulouse': 'fort',
    'Nice': 'fort',
    'Nantes': 'fort',
    'Montpellier': 'fort',
    'Strasbourg': 'moyen',
    'Bordeaux': 'fort',
    'Lille': 'moyen',
    'Rennes': 'fort',
    'Reims': 'faible',
    'Saint-Étienne': 'faible',
    'Le Havre': 'faible',
    'Toulon': 'moyen',
    'Grenoble': 'moyen',
    'Dijon': 'moyen',
    'Angers': 'moyen',
    'Nîmes': 'faible',
    'Villeurbanne': 'fort'
  };
  
  var demand = baseDemand[cityName] || 'moyen';
  
  // Variation saisonnière
  if (month >= 3 && month <= 6) { // Printemps
    if (demand === 'faible') return 'moyen';
    if (demand === 'moyen') return 'fort';
  } else if (month >= 7 && month <= 8) { // Été
    if (demand === 'fort') return 'moyen';
    if (demand === 'très_fort') return 'fort';
  }
  
  return demand;
}

function getSupplyLevel(supplyCount, transactionsCount) {
  var ratio = supplyCount / transactionsCount;
  
  if (ratio > 3) return 'surabondance';
  if (ratio > 2) return 'abondance';
  if (ratio > 1.5) return 'equilibre';
  if (ratio > 1) return 'rareté';
  return 'pénurie';
}
