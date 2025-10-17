# 🏠 Bases de Données Immobilier - Architecture Complète

## 📊 Vue d'Ensemble des Bases de Données

### 🎯 **Objectif**
Créer un écosystème de données complet pour alimenter les 8 agents Dust du secteur immobilier avec des informations fiables, structurées et en temps réel.

---

## 🗄️ **1. BASE DE DONNÉES PROPRIÉTÉS**

### 📋 **Table: properties**
```sql
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
    time_to_sell_estimate INT, -- en jours
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_source VARCHAR(50) NOT NULL, -- 'leboncoin', 'seloger', 'pap', etc.
    confidence_score DECIMAL(3,2) DEFAULT 0.0 -- 0.0 à 1.0
);
```

### 📸 **Table: property_photos**
```sql
CREATE TABLE property_photos (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    photo_url TEXT NOT NULL,
    photo_type ENUM('exterieur', 'interieur', 'cuisine', 'salon', 'chambre', 'sdb', 'balcon', 'parking') NOT NULL,
    room_name VARCHAR(100),
    photo_quality ENUM('excellente', 'bonne', 'moyenne', 'faible') NOT NULL,
    has_defects BOOLEAN DEFAULT FALSE,
    defects_detected TEXT, -- JSON array des défauts détectés
    ai_analysis_score DECIMAL(3,2), -- Score d'analyse IA (0.0 à 1.0)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

### 🔧 **Table: property_defects**
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

---

## 🏪 **2. BASE DE DONNÉES MARCHÉ IMMOBILIER**

### 📈 **Table: market_data**
```sql
CREATE TABLE market_data (
    id VARCHAR(50) PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10),
    department VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    
    -- Données temporelles
    date_month DATE NOT NULL,
    
    -- Prix moyens
    avg_price_per_sqm DECIMAL(8,2) NOT NULL,
    avg_price_total DECIMAL(10,2) NOT NULL,
    price_trend ENUM('hausse', 'stabilite', 'baisse') NOT NULL,
    price_evolution_pct DECIMAL(5,2), -- Evolution en %
    
    -- Volume de transactions
    transactions_count INT NOT NULL,
    transactions_trend ENUM('hausse', 'stabilite', 'baisse') NOT NULL,
    
    -- Temps de vente
    avg_time_to_sell INT NOT NULL, -- en jours
    time_to_sell_trend ENUM('hausse', 'stabilite', 'baisse') NOT NULL,
    
    -- Demande
    demand_level ENUM('très_faible', 'faible', 'moyen', 'fort', 'très_fort') NOT NULL,
    demand_trend ENUM('hausse', 'stabilite', 'baisse') NOT NULL,
    
    -- Offre
    supply_count INT NOT NULL,
    supply_level ENUM('surabondance', 'abondance', 'equilibre', 'rareté', 'pénurie') NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_city_date (city, date_month)
);
```

### 🏘️ **Table: comparable_properties**
```sql
CREATE TABLE comparable_properties (
    id VARCHAR(50) PRIMARY KEY,
    target_property_id VARCHAR(50) NOT NULL,
    comparable_property_id VARCHAR(50) NOT NULL,
    similarity_score DECIMAL(3,2) NOT NULL, -- 0.0 à 1.0
    
    -- Facteurs de comparaison
    location_similarity DECIMAL(3,2) NOT NULL,
    size_similarity DECIMAL(3,2) NOT NULL,
    condition_similarity DECIMAL(3,2) NOT NULL,
    amenities_similarity DECIMAL(3,2) NOT NULL,
    
    -- Prix de référence
    comparable_price DECIMAL(10,2) NOT NULL,
    price_difference_pct DECIMAL(5,2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (target_property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (comparable_property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

---

## 🗺️ **3. BASE DE DONNÉES GÉOLOCALISATION**

### 🏢 **Table: nearby_services**
```sql
CREATE TABLE nearby_services (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    
    -- Services de transport
    metro_stations_count INT DEFAULT 0,
    metro_nearest_distance INT, -- en mètres
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
    parks_size_avg DECIMAL(8,2), -- en m²
    
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

### 🚗 **Table: transport_accessibility**
```sql
CREATE TABLE transport_accessibility (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    
    -- Accès au centre-ville
    city_center_distance INT, -- en mètres
    city_center_time_walk INT, -- en minutes
    city_center_time_transport INT, -- en minutes
    
    -- Accès aux gares/aéroports
    main_station_distance INT,
    main_station_time_walk INT,
    main_station_time_transport INT,
    
    airport_distance INT,
    airport_time_transport INT,
    
    -- Scores de mobilité
    walkability_score DECIMAL(3,2), -- 0.0 à 1.0
    public_transport_score DECIMAL(3,2), -- 0.0 à 1.0
    car_accessibility_score DECIMAL(3,2), -- 0.0 à 1.0
    overall_mobility_score DECIMAL(3,2), -- 0.0 à 1.0
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

---

## 💰 **4. BASE DE DONNÉES FINANCIÈRE**

### 💸 **Table: financial_analysis**
```sql
CREATE TABLE financial_analysis (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    
    -- Investissement locatif
    rental_yield DECIMAL(5,2), -- Rendement locatif en %
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

### 📊 **Table: market_comparison**
```sql
CREATE TABLE market_comparison (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    
    -- Comparaison avec le marché local
    market_avg_price_per_sqm DECIMAL(8,2),
    property_price_per_sqm DECIMAL(8,2),
    price_vs_market_pct DECIMAL(5,2), -- Différence en %
    
    -- Positionnement
    price_percentile INT, -- Percentile de prix (0-100)
    market_position ENUM('très_sous_évalué', 'sous_évalué', 'marché', 'sur_évalué', 'très_sur_évalué') NOT NULL,
    
    -- Opportunités
    negotiation_potential ENUM('excellent', 'bon', 'moyen', 'faible', 'aucun') NOT NULL,
    investment_potential ENUM('excellent', 'bon', 'moyen', 'faible', 'risqué') NOT NULL,
    
    -- Recommandations
    recommended_action ENUM('acheter_immédiatement', 'négocier_prix', 'attendre', 'éviter') NOT NULL,
    recommended_price_range_min DECIMAL(10,2),
    recommended_price_range_max DECIMAL(10,2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

---

## ⚡ **5. BASE DE DONNÉES ÉNERGIE**

### 🔋 **Table: energy_analysis**
```sql
CREATE TABLE energy_analysis (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    
    -- Consommations actuelles
    current_energy_consumption DECIMAL(8,2), -- kWh/an
    current_heating_consumption DECIMAL(8,2), -- kWh/an
    current_hot_water_consumption DECIMAL(8,2), -- kWh/an
    
    -- Coûts énergétiques
    current_energy_cost_annual DECIMAL(8,2), -- €/an
    energy_cost_per_sqm DECIMAL(6,2), -- €/m²/an
    
    -- Améliorations possibles
    insulation_improvement_potential DECIMAL(5,2), -- % d'économie
    heating_system_upgrade_potential DECIMAL(5,2), -- % d'économie
    windows_improvement_potential DECIMAL(5,2), -- % d'économie
    
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

---

## 👤 **6. BASE DE DONNÉES PROFILS ACHETEURS**

### 🧑‍💼 **Table: buyer_profiles**
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
    preferred_cities TEXT, -- JSON array
    preferred_departments TEXT, -- JSON array
    max_commute_time INT, -- en minutes
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

### 🎯 **Table: property_recommendations**
```sql
CREATE TABLE property_recommendations (
    id VARCHAR(50) PRIMARY KEY,
    buyer_profile_id VARCHAR(50) NOT NULL,
    property_id VARCHAR(50) NOT NULL,
    
    -- Score de compatibilité
    compatibility_score DECIMAL(3,2) NOT NULL, -- 0.0 à 1.0
    
    -- Scores détaillés
    price_compatibility DECIMAL(3,2) NOT NULL,
    location_compatibility DECIMAL(3,2) NOT NULL,
    size_compatibility DECIMAL(3,2) NOT NULL,
    condition_compatibility DECIMAL(3,2) NOT NULL,
    energy_compatibility DECIMAL(3,2) NOT NULL,
    
    -- Recommandations
    recommendation_level ENUM('excellent', 'bon', 'moyen', 'faible') NOT NULL,
    recommendation_reason TEXT,
    negotiation_advice TEXT,
    potential_issues TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (buyer_profile_id) REFERENCES buyer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

---

## 📊 **7. BASE DE DONNÉES ANALYSES IA**

### 🤖 **Table: ai_analysis_results**
```sql
CREATE TABLE ai_analysis_results (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    agent_type ENUM('evaluateur', 'photos', 'geolocalisation', 'marche', 'rentabilite', 'energie', 'dossier', 'recommandations') NOT NULL,
    
    -- Résultats de l'analyse
    analysis_data JSON NOT NULL, -- Données structurées de l'analyse
    confidence_score DECIMAL(3,2) NOT NULL, -- 0.0 à 1.0
    processing_time_ms INT NOT NULL,
    
    -- Métadonnées
    model_version VARCHAR(50) NOT NULL,
    input_data_hash VARCHAR(64) NOT NULL, -- Hash des données d'entrée
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX idx_property_agent (property_id, agent_type)
);
```

---

## 🔄 **8. SCRIPT DE CRÉATION ET POPULATION**

### 📝 **Script SQL de création**
```sql
-- Création de la base de données
CREATE DATABASE IF NOT EXISTS immobilier_agents;
USE immobilier_agents;

-- Exécuter tous les CREATE TABLE ci-dessus
-- ...

-- Index pour optimiser les performances
CREATE INDEX idx_properties_location ON properties(city, postal_code);
CREATE INDEX idx_properties_type_surface ON properties(property_type, surface_living);
CREATE INDEX idx_properties_price ON properties(price_estimate);
CREATE INDEX idx_market_data_date ON market_data(date_month);
CREATE INDEX idx_services_property ON nearby_services(property_id);
```

### 🌱 **Script de population initiale**
```python
# population_initial.py
import requests
import json
from datetime import datetime, timedelta

def populate_initial_data():
    """
    Population initiale des bases de données avec des données réelles
    """
    
    # 1. Données de propriétés (scraping Leboncoin, SeLoger)
    properties_data = scrape_property_sites()
    
    # 2. Données de marché (API OpenData)
    market_data = fetch_market_data()
    
    # 3. Données géolocalisation (OpenStreetMap API)
    location_data = fetch_location_data()
    
    # 4. Données énergétiques (ADEME API)
    energy_data = fetch_energy_data()
    
    return {
        'properties': properties_data,
        'market': market_data,
        'location': location_data,
        'energy': energy_data
    }
```

---

## 🎯 **RÉSUMÉ DE L'ARCHITECTURE**

### 📊 **8 Bases de Données Principales**
1. **Properties** - Propriétés et photos
2. **Market Data** - Données de marché et comparaisons
3. **Geolocation** - Services et accessibilité
4. **Financial** - Analyses financières et rentabilité
5. **Energy** - Consommations et améliorations
6. **Buyer Profiles** - Profils acheteurs et recommandations
7. **AI Analysis** - Résultats des analyses IA
8. **Defects** - Défauts détectés et réparations

### 🔗 **Interconnexions**
- Chaque propriété a des relations avec toutes les autres tables
- Les agents Dust peuvent accéder aux données via des APIs REST
- Mise à jour en temps réel des analyses IA
- Historique des évolutions de marché

### 📈 **Volume Estimé**
- **50,000+ propriétés** en base initiale
- **500,000+ photos** analysées par IA
- **10,000+ services** géolocalisés
- **1,000+ analyses** par jour par agent

**Prêt à implémenter cette architecture ?** 🚀
