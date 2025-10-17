# 📊 Checklist des Fausses Bases de Données - Agents Dust Immobilier

## 🎯 Objectif
Créer des fausses bases de données complètes pour que tous les 8 agents Dust fonctionnent parfaitement avec des données réalistes.

---

## ✅ **CHECKLIST GÉNÉRALE**

| Base de Données | Statut | Agent Connecté | Données Requises | Priorité |
|----------------|--------|----------------|------------------|----------|
| [x] **Properties** | ✅ | Tous les agents | 100 propriétés | 🔴 Critique |
| [x] **Property Photos** | ✅ | Agent Analyse Photos | 500 photos | 🔴 Critique |
| [x] **Market Data** | ✅ | Agent Analyse Marché | Données 12 mois | 🔴 Critique |
| [x] **Nearby Services** | ✅ | Agent Géolocalisation | Services par propriété | 🟡 Important |
| [x] **Transport Accessibility** | ✅ | Agent Géolocalisation | Scores mobilité | 🟡 Important |
| [x] **Financial Analysis** | ✅ | Agent Calcul Rentabilité | ROI et rentabilité | 🟡 Important |
| [x] **Energy Analysis** | ✅ | Agent Énergie | Consommations et améliorations | 🟡 Important |
| [x] **Buyer Profiles** | ✅ | Agent Recommandations | 20 profils acheteurs | 🟢 Optionnel |
| [x] **Property Defects** | ✅ | Agent Analyse Photos | Défauts détectés | 🟢 Optionnel |
| [x] **AI Analysis Results** | ✅ | Tous les agents | Résultats analyses | 🟢 Optionnel |

---

## 🏠 **1. TABLE PROPERTIES** (Priorité: 🔴 Critique)

### 🎯 **Agent Connecté**: Tous les agents
### 📊 **Données Requises**: 100 propriétés réalistes

```sql
-- Structure de la table
CREATE TABLE properties (
    id VARCHAR(50) PRIMARY KEY,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    department VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    
    -- Caractéristiques principales
    property_type ENUM('appartement', 'maison', 'studio', 'loft', 'duplex') NOT NULL,
    surface_living DECIMAL(6,2) NOT NULL,
    surface_total DECIMAL(6,2),
    rooms_count INT NOT NULL,
    bedrooms_count INT NOT NULL,
    bathrooms_count INT,
    floor_level INT,
    floors_total INT,
    
    -- État et qualité
    construction_year YEAR,
    renovation_year YEAR,
    condition_level ENUM('neuf', 'excellent', 'bon', 'moyen', 'à_renover') NOT NULL,
    energy_class ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G') NOT NULL,
    ghg_emissions ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G') NOT NULL,
    
    -- Équipements
    has_elevator BOOLEAN DEFAULT FALSE,
    has_balcony BOOLEAN DEFAULT FALSE,
    has_terrace BOOLEAN DEFAULT FALSE,
    has_garden BOOLEAN DEFAULT FALSE,
    has_parking BOOLEAN DEFAULT FALSE,
    has_storage BOOLEAN DEFAULT FALSE,
    
    -- Prix et marché
    price_estimate DECIMAL(10,2),
    price_per_sqm DECIMAL(8,2),
    price_range_min DECIMAL(10,2),
    price_range_max DECIMAL(10,2),
    market_demand_level ENUM('très_faible', 'faible', 'moyen', 'fort', 'très_fort') NOT NULL,
    time_to_sell_estimate INT,
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_source VARCHAR(50) NOT NULL,
    confidence_score DECIMAL(3,2) DEFAULT 0.0
);
```

### 📝 **Données à Créer** (100 propriétés)
- **20 appartements Paris** (75001-75020)
- **15 maisons banlieue** (92, 93, 94)
- **10 studios** (Paris centre)
- **10 lofts** (Paris 11e, 19e)
- **15 appartements Lyon** (69001-69009)
- **10 maisons Marseille** (13001-13016)
- **10 appartements Bordeaux** (33000-33080)
- **10 appartements Toulouse** (31000-31500)

### 🎯 **Exemple de Données**
```sql
INSERT INTO properties VALUES 
('PROP_001', '15 Rue de Rivoli, 75001 Paris', 'Paris', '75001', 'Paris', 'Île-de-France', 48.8566, 2.3522, 'appartement', 75.5, 85.0, 3, 2, 1, 4, 6, 1985, 2020, 'bon', 'C', 'D', TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, 425000, 5629, 395000, 455000, 'fort', 45, NOW(), NOW(), 'leboncoin', 0.85),
('PROP_002', '28 Avenue des Champs-Élysées, 75008 Paris', 'Paris', '75008', 'Paris', 'Île-de-France', 48.8566, 2.3522, 'appartement', 120.0, 130.0, 4, 3, 2, 2, 7, 1970, 2015, 'excellent', 'B', 'C', TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, 850000, 7083, 780000, 920000, 'très_fort', 25, NOW(), NOW(), 'seloger', 0.92);
```

---

## 📸 **2. TABLE PROPERTY_PHOTOS** (Priorité: 🔴 Critique)

### 🎯 **Agent Connecté**: Agent Analyse Photos
### 📊 **Données Requises**: 500 photos avec métadonnées

```sql
CREATE TABLE property_photos (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    photo_url TEXT NOT NULL,
    photo_type ENUM('exterieur', 'interieur', 'cuisine', 'salon', 'chambre', 'sdb', 'balcon', 'parking') NOT NULL,
    room_name VARCHAR(100),
    photo_quality ENUM('excellente', 'bonne', 'moyenne', 'faible') NOT NULL,
    has_defects BOOLEAN DEFAULT FALSE,
    defects_detected TEXT,
    ai_analysis_score DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

### 📝 **Données à Créer** (500 photos)
- **5 photos par propriété** en moyenne
- **Types variés** : extérieur, salon, chambre, cuisine, SDB
- **Qualités différentes** : excellente (30%), bonne (50%), moyenne (15%), faible (5%)
- **Défauts détectés** : 20% des photos avec défauts

### 🎯 **Exemple de Données**
```sql
INSERT INTO property_photos VALUES 
('PHOTO_001', 'PROP_001', 'https://fake-images.com/prop001_salon.jpg', 'salon', 'Salon principal', 'bonne', FALSE, NULL, 0.85, NOW()),
('PHOTO_002', 'PROP_001', 'https://fake-images.com/prop001_cuisine.jpg', 'cuisine', 'Cuisine équipée', 'moyenne', TRUE, '["humidité", "usure"]', 0.65, NOW());
```

---

## 📊 **3. TABLE MARKET_DATA** (Priorité: 🔴 Critique)

### 🎯 **Agent Connecté**: Agent Analyse Marché
### 📊 **Données Requises**: Données 12 mois pour 20 villes

```sql
CREATE TABLE market_data (
    id VARCHAR(50) PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10),
    department VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    date_month DATE NOT NULL,
    
    -- Prix moyens
    avg_price_per_sqm DECIMAL(8,2) NOT NULL,
    avg_price_total DECIMAL(10,2) NOT NULL,
    price_trend ENUM('hausse', 'stabilite', 'baisse') NOT NULL,
    price_evolution_pct DECIMAL(5,2),
    
    -- Volume de transactions
    transactions_count INT NOT NULL,
    transactions_trend ENUM('hausse', 'stabilite', 'baisse') NOT NULL,
    
    -- Temps de vente
    avg_time_to_sell INT NOT NULL,
    time_to_sell_trend ENUM('hausse', 'stabilite', 'baisse') NOT NULL,
    
    -- Demande
    demand_level ENUM('très_faible', 'faible', 'moyen', 'fort', 'très_fort') NOT NULL,
    demand_trend ENUM('hausse', 'stabilite', 'baisse') NOT NULL,
    
    -- Offre
    supply_count INT NOT NULL,
    supply_level ENUM('surabondance', 'abondance', 'equilibre', 'rareté', 'pénurie') NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 📝 **Données à Créer** (240 entrées)
- **20 villes** × **12 mois** = 240 entrées
- **Villes** : Paris, Lyon, Marseille, Toulouse, Nice, Nantes, Montpellier, Strasbourg, Bordeaux, Lille, Rennes, Reims, Saint-Étienne, Le Havre, Toulon, Grenoble, Dijon, Angers, Nîmes, Villeurbanne
- **Évolutions réalistes** : +2% à +8% par an selon la ville

### 🎯 **Exemple de Données**
```sql
INSERT INTO market_data VALUES 
('MARKET_001', 'Paris', '75001', 'Paris', 'Île-de-France', '2024-01-01', 8500.00, 450000.00, 'hausse', 3.2, 1250, 'stabilite', 65, 'baisse', 'très_fort', 'hausse', 890, 'rareté', NOW()),
('MARKET_002', 'Lyon', '69001', 'Rhône', 'Auvergne-Rhône-Alpes', '2024-01-01', 4200.00, 280000.00, 'hausse', 2.8, 680, 'hausse', 45, 'stabilite', 'fort', 'hausse', 450, 'equilibre', NOW());
```

---

## 🏢 **4. TABLE NEARBY_SERVICES** (Priorité: 🟡 Important)

### 🎯 **Agent Connecté**: Agent Géolocalisation
### 📊 **Données Requises**: Services pour chaque propriété

```sql
CREATE TABLE nearby_services (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    
    -- Services de transport
    metro_stations_count INT DEFAULT 0,
    metro_nearest_distance INT,
    metro_nearest_name VARCHAR(100),
    metro_nearest_line VARCHAR(50),
    
    bus_stops_count INT DEFAULT 0,
    bus_nearest_distance INT,
    
    train_stations_count INT DEFAULT 0,
    train_nearest_distance INT,
    train_nearest_name VARCHAR(100),
    
    -- Services éducatifs
    schools_count INT DEFAULT 0,
    schools_nearest_distance INT,
    schools_rating_avg DECIMAL(3,2),
    
    universities_count INT DEFAULT 0,
    universities_nearest_distance INT,
    
    -- Services médicaux
    hospitals_count INT DEFAULT 0,
    hospitals_nearest_distance INT,
    
    pharmacies_count INT DEFAULT 0,
    pharmacies_nearest_distance INT,
    
    doctors_count INT DEFAULT 0,
    doctors_nearest_distance INT,
    
    -- Services commerciaux
    supermarkets_count INT DEFAULT 0,
    supermarkets_nearest_distance INT,
    
    restaurants_count INT DEFAULT 0,
    restaurants_nearest_distance INT,
    restaurants_rating_avg DECIMAL(3,2),
    
    shopping_centers_count INT DEFAULT 0,
    shopping_centers_nearest_distance INT,
    
    -- Services de loisirs
    parks_count INT DEFAULT 0,
    parks_nearest_distance INT,
    parks_size_avg DECIMAL(8,2),
    
    gyms_count INT DEFAULT 0,
    gyms_nearest_distance INT,
    
    cinemas_count INT DEFAULT 0,
    cinemas_nearest_distance INT,
    
    -- Services financiers
    banks_count INT DEFAULT 0,
    banks_nearest_distance INT,
    
    atms_count INT DEFAULT 0,
    atms_nearest_distance INT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

### 📝 **Données à Créer** (100 entrées)
- **1 entrée par propriété**
- **Services variés** selon la localisation (centre-ville vs banlieue)
- **Distances réalistes** : 50m à 2000m selon le service

---

## 🚗 **5. TABLE TRANSPORT_ACCESSIBILITY** (Priorité: 🟡 Important)

### 🎯 **Agent Connecté**: Agent Géolocalisation
### 📊 **Données Requises**: Scores de mobilité par propriété

```sql
CREATE TABLE transport_accessibility (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    
    -- Accès au centre-ville
    city_center_distance INT,
    city_center_time_walk INT,
    city_center_time_transport INT,
    
    -- Accès aux gares/aéroports
    main_station_distance INT,
    main_station_time_walk INT,
    main_station_time_transport INT,
    
    airport_distance INT,
    airport_time_transport INT,
    
    -- Scores de mobilité
    walkability_score DECIMAL(3,2),
    public_transport_score DECIMAL(3,2),
    car_accessibility_score DECIMAL(3,2),
    overall_mobility_score DECIMAL(3,2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

### 📝 **Données à Créer** (100 entrées)
- **Scores réalistes** : 0.3 à 1.0
- **Temps de trajet** : 5min à 60min selon la distance

---

## 💰 **6. TABLE FINANCIAL_ANALYSIS** (Priorité: 🟡 Important)

### 🎯 **Agent Connecté**: Agent Calcul Rentabilité
### 📊 **Données Requises**: Analyses financières pour chaque propriété

```sql
CREATE TABLE financial_analysis (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    
    -- Investissement locatif
    rental_yield DECIMAL(5,2),
    monthly_rent_estimate DECIMAL(8,2),
    annual_rent_estimate DECIMAL(10,2),
    
    -- Charges
    property_tax_annual DECIMAL(8,2),
    maintenance_cost_annual DECIMAL(8,2),
    insurance_cost_annual DECIMAL(8,2),
    management_fees_annual DECIMAL(8,2),
    
    -- Total charges
    total_charges_annual DECIMAL(10,2),
    net_rental_income DECIMAL(10,2),
    net_yield DECIMAL(5,2),
    
    -- Fiscalité
    tax_regime ENUM('lmnp', 'lmp', 'deficit_foncier', 'pinel', 'autre') NOT NULL,
    tax_benefits_annual DECIMAL(8,2),
    after_tax_yield DECIMAL(5,2),
    
    -- Scénarios
    scenario_optimistic_yield DECIMAL(5,2),
    scenario_realistic_yield DECIMAL(5,2),
    scenario_pessimistic_yield DECIMAL(5,2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

### 📝 **Données à Créer** (100 entrées)
- **Rendements réalistes** : 2% à 8% selon la localisation
- **Régimes fiscaux variés** : LMNP (60%), LMP (25%), autres (15%)

---

## ⚡ **7. TABLE ENERGY_ANALYSIS** (Priorité: 🟡 Important)

### 🎯 **Agent Connecté**: Agent Énergie
### 📊 **Données Requises**: Consommations et améliorations énergétiques

```sql
CREATE TABLE energy_analysis (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    
    -- Consommations actuelles
    current_energy_consumption DECIMAL(8,2),
    current_heating_consumption DECIMAL(8,2),
    current_hot_water_consumption DECIMAL(8,2),
    
    -- Coûts énergétiques
    current_energy_cost_annual DECIMAL(8,2),
    energy_cost_per_sqm DECIMAL(6,2),
    
    -- Améliorations possibles
    insulation_improvement_potential DECIMAL(5,2),
    heating_system_upgrade_potential DECIMAL(5,2),
    windows_improvement_potential DECIMAL(5,2),
    
    -- Investissements recommandés
    insulation_investment DECIMAL(8,2),
    insulation_savings_annual DECIMAL(8,2),
    insulation_payback_years DECIMAL(4,2),
    
    heating_system_investment DECIMAL(8,2),
    heating_system_savings_annual DECIMAL(8,2),
    heating_system_payback_years DECIMAL(4,2),
    
    windows_investment DECIMAL(8,2),
    windows_savings_annual DECIMAL(8,2),
    windows_payback_years DECIMAL(4,2),
    
    -- Total
    total_investment_needed DECIMAL(10,2),
    total_savings_annual DECIMAL(8,2),
    total_payback_years DECIMAL(4,2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

### 📝 **Données à Créer** (100 entrées)
- **Consommations variées** : 8000 à 25000 kWh/an selon la surface
- **Potentiel d'amélioration** : 15% à 45% selon l'âge du bien

---

## 👤 **8. TABLE BUYER_PROFILES** (Priorité: 🟢 Optionnel)

### 🎯 **Agent Connecté**: Agent Recommandations
### 📊 **Données Requises**: 20 profils acheteurs variés

```sql
CREATE TABLE buyer_profiles (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    
    -- Profil personnel
    age_range ENUM('18-25', '26-35', '36-45', '46-55', '56-65', '65+') NOT NULL,
    family_situation ENUM('célibataire', 'couple', 'couple_enfants', 'famille_nombreuse', 'senior') NOT NULL,
    profession VARCHAR(100),
    income_level ENUM('faible', 'moyen', 'élevé', 'très_élevé') NOT NULL,
    
    -- Budget
    budget_min DECIMAL(10,2) NOT NULL,
    budget_max DECIMAL(10,2) NOT NULL,
    budget_comfortable DECIMAL(10,2) NOT NULL,
    
    -- Préférences
    preferred_property_type ENUM('appartement', 'maison', 'studio', 'loft') NOT NULL,
    min_rooms INT NOT NULL,
    max_rooms INT,
    min_surface DECIMAL(6,2) NOT NULL,
    max_surface DECIMAL(6,2),
    
    -- Localisation
    preferred_cities TEXT,
    preferred_departments TEXT,
    max_commute_time INT,
    public_transport_required BOOLEAN DEFAULT TRUE,
    
    -- Critères importants
    price_importance ENUM('très_important', 'important', 'moyen', 'peu_important') NOT NULL,
    location_importance ENUM('très_important', 'important', 'moyen', 'peu_important') NOT NULL,
    size_importance ENUM('très_important', 'important', 'moyen', 'peu_important') NOT NULL,
    condition_importance ENUM('très_important', 'important', 'moyen', 'peu_important') NOT NULL,
    energy_importance ENUM('très_important', 'important', 'moyen', 'peu_important') NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 📝 **Données à Créer** (20 profils)
- **Profils variés** : jeunes actifs, familles, retraités, investisseurs
- **Budgets différents** : 200K à 1M€
- **Priorités variées** : prix, localisation, taille, état

---

## 🔧 **9. TABLE PROPERTY_DEFECTS** (Priorité: 🟢 Optionnel)

### 🎯 **Agent Connecté**: Agent Analyse Photos
### 📊 **Données Requises**: Défauts pour 30% des propriétés

```sql
CREATE TABLE property_defects (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    defect_type ENUM('fissure', 'humidite', 'usure', 'electricite', 'plomberie', 'chauffage', 'isolation', 'autre') NOT NULL,
    severity ENUM('mineur', 'modere', 'majeur', 'critique') NOT NULL,
    location VARCHAR(200),
    estimated_repair_cost DECIMAL(8,2),
    repair_priority ENUM('urgent', 'important', 'normal', 'cosmetique') NOT NULL,
    description TEXT,
    detected_by ENUM('ai_analysis', 'manual_input', 'expert_visit') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

### 📝 **Données à Créer** (50 défauts)
- **30 propriétés** avec défauts (sur 100)
- **Types variés** : humidité (40%), usure (25%), électricité (15%), autres (20%)

---

## 🤖 **10. TABLE AI_ANALYSIS_RESULTS** (Priorité: 🟢 Optionnel)

### 🎯 **Agent Connecté**: Tous les agents
### 📊 **Données Requises**: Résultats d'analyses pour démonstration

```sql
CREATE TABLE ai_analysis_results (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    agent_type ENUM('evaluateur', 'photos', 'geolocalisation', 'marche', 'rentabilite', 'energie', 'dossier', 'recommandations') NOT NULL,
    
    -- Résultats de l'analyse
    analysis_data JSON NOT NULL,
    confidence_score DECIMAL(3,2) NOT NULL,
    processing_time_ms INT NOT NULL,
    
    -- Métadonnées
    model_version VARCHAR(50) NOT NULL,
    input_data_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX idx_property_agent (property_id, agent_type)
);
```

### 📝 **Données à Créer** (800 entrées)
- **8 agents** × **100 propriétés** = 800 analyses
- **JSON structuré** avec résultats détaillés
- **Scores de confiance** : 0.7 à 0.95

---

## 🚀 **SCRIPT DE CRÉATION COMPLET**

### 📝 **Script SQL Unifié**
```sql
-- Création de la base de données
CREATE DATABASE IF NOT EXISTS immobilier_agents_fake;
USE immobilier_agents_fake;

-- Exécuter tous les CREATE TABLE ci-dessus
-- Puis exécuter tous les INSERT avec les données d'exemple

-- Index pour optimiser les performances
CREATE INDEX idx_properties_location ON properties(city, postal_code);
CREATE INDEX idx_properties_type_surface ON properties(property_type, surface_living);
CREATE INDEX idx_properties_price ON properties(price_estimate);
CREATE INDEX idx_market_data_date ON market_data(date_month);
CREATE INDEX idx_services_property ON nearby_services(property_id);
```

---

## 📊 **RÉSUMÉ DES DONNÉES À CRÉER**

### 🔢 **Volume Total**
- **100 propriétés** avec caractéristiques complètes
- **500 photos** avec analyses IA
- **240 entrées marché** (20 villes × 12 mois)
- **100 services** de proximité
- **100 analyses financières**
- **100 analyses énergétiques**
- **20 profils acheteurs**
- **50 défauts détectés**
- **800 résultats IA**

### ⏱️ **Temps Estimé de Création**
- **Tables SQL** : 2 heures
- **Données propriétés** : 4 heures
- **Données marché** : 2 heures
- **Données services** : 3 heures
- **Données financières** : 2 heures
- **Données énergétiques** : 2 heures
- **Tests et validation** : 2 heures
- **TOTAL** : ~17 heures

### 🎯 **Priorités de Création**
1. **🔴 Critique** : Properties, Photos, Market Data
2. **🟡 Important** : Services, Transport, Financial, Energy
3. **🟢 Optionnel** : Buyer Profiles, Defects, AI Results

**Commencez par les bases critiques, puis ajoutez les autres selon vos besoins !** 🚀
