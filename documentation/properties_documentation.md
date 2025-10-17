# 🏠 Documentation Base de Données - PROPERTIES

## 🎯 **Objectif de la Base de Données**

La base de données **Properties** contient les caractéristiques détaillées de 100 propriétés immobilières, servant de base centrale pour toutes les analyses des agents. Elle constitue le référentiel principal du système.

---

## 📋 **Structure des Données**

### **Propriétés couvertes :** 100 propriétés (PROP_001 à PROP_100)
### **Répartition géographique :** 20 villes françaises (5 propriétés par ville)
### **Types de biens :** Appartements, maisons, studios, lofts, duplex

---

## 🏗️ **Description des Colonnes**

### **1. Identifiants et Localisation**
- **`id`** (TEXT) : ID unique (PROP_001 à PROP_100)
- **`address`** (TEXT) : Adresse complète
- **`city`** (TEXT) : Ville
- **`postal_code`** (TEXT) : Code postal
- **`department`** (TEXT) : Département
- **`region`** (TEXT) : Région
- **`latitude`** (DECIMAL) : Coordonnée GPS latitude
- **`longitude`** (DECIMAL) : Coordonnée GPS longitude

### **2. Caractéristiques Principales**
- **`property_type`** (TEXT) : Type de bien
  - *Valeurs :* appartement, maison, studio, loft, duplex
  - *Distribution :* appartement(60%), maison(25%), studio(10%), loft(3%), duplex(2%)
- **`surface_living`** (DECIMAL) : Surface habitable en m²
  - *Gamme :* 25-200 m²
- **`surface_total`** (DECIMAL) : Surface totale (terrain inclus)
  - *Gamme :* 30-500 m²
- **`rooms_count`** (INTEGER) : Nombre de pièces
  - *Gamme :* 1-8 pièces
- **`bedrooms_count`** (INTEGER) : Nombre de chambres
  - *Gamme :* 0-6 chambres
- **`bathrooms_count`** (INTEGER) : Nombre de salles de bain
  - *Gamme :* 0-4 salles de bain
- **`floor_level`** (INTEGER) : Étage
  - *Gamme :* 0-15 (0 = RDC, -1 = sous-sol)
- **`floors_total`** (INTEGER) : Nombre d'étages total

### **3. État et Qualité**
- **`construction_year`** (INTEGER) : Année de construction
  - *Gamme :* 1850-2024
- **`renovation_year`** (INTEGER) : Année de dernière rénovation
  - *Gamme :* 1990-2024
- **`condition_level`** (TEXT) : État général
  - *Valeurs :* neuf, excellent, bon, moyen, à_renover
  - *Distribution :* neuf(10%), excellent(25%), bon(35%), moyen(25%), à_renover(5%)
- **`energy_class`** (TEXT) : Classe énergétique DPE
  - *Valeurs :* A, B, C, D, E, F, G
- **`ghg_emissions`** (TEXT) : Classe GES
  - *Valeurs :* A, B, C, D, E, F, G

### **4. Équipements**
- **`has_elevator`** (BOOLEAN) : Présence d'ascenseur
- **`has_balcony`** (BOOLEAN) : Présence de balcon
- **`has_terrace`** (BOOLEAN) : Présence de terrasse
- **`has_garden`** (BOOLEAN) : Présence de jardin
- **`has_parking`** (BOOLEAN) : Présence de parking
- **`has_storage`** (BOOLEAN) : Présence de cave/sous-sol

### **5. Prix et Marché**
- **`price_estimate`** (DECIMAL) : Prix estimé en euros
  - *Gamme :* 150,000€ - 1,500,000€
- **`price_per_sqm`** (DECIMAL) : Prix au m² en euros
  - *Gamme :* 2,000€ - 12,000€
- **`price_range_min`** (DECIMAL) : Fourchette basse
- **`price_range_max`** (DECIMAL) : Fourchette haute
- **`market_demand_level`** (TEXT) : Niveau de demande
  - *Valeurs :* très_faible, faible, moyen, fort, très_fort
- **`time_to_sell_estimate`** (INTEGER) : Temps de vente estimé en jours
  - *Gamme :* 30-180 jours

### **6. Métadonnées**
- **`created_at`** (TIMESTAMP) : Date de création
- **`updated_at`** (TIMESTAMP) : Date de mise à jour
- **`data_source`** (TEXT) : Source des données
  - *Valeurs :* leboncoin, seloger, pap, notaire, estimation
- **`confidence_score`** (DECIMAL) : Score de confiance (0.0-1.0)

---

## 📈 **Méthodologie d'Analyse**

### **1. Analyse par Type de Bien**
```sql
-- Statistiques par type de propriété
SELECT property_type,
       COUNT(*) as nombre,
       AVG(surface_living) as surface_moyenne,
       AVG(price_estimate) as prix_moyen,
       AVG(price_per_sqm) as prix_m2_moyen
FROM properties
GROUP BY property_type
ORDER BY nombre DESC;
```

### **2. Analyse Géographique**
```sql
-- Prix par ville et région
SELECT city, region,
       AVG(price_per_sqm) as prix_m2_moyen,
       AVG(surface_living) as surface_moyenne,
       COUNT(*) as nombre_biens
FROM properties
GROUP BY city, region
ORDER BY prix_m2_moyen DESC;
```

### **3. Analyse par État**
```sql
-- État des biens et impact sur prix
SELECT condition_level,
       AVG(price_per_sqm) as prix_m2_moyen,
       AVG(time_to_sell_estimate) as temps_vente_moyen,
       COUNT(*) as nombre
FROM properties
GROUP BY condition_level
ORDER BY prix_m2_moyen DESC;
```

### **4. Analyse des Équipements**
```sql
-- Impact des équipements sur le prix
SELECT 
  has_elevator,
  has_balcony,
  has_terrace,
  has_garden,
  has_parking,
  AVG(price_per_sqm) as prix_m2_moyen
FROM properties
GROUP BY has_elevator, has_balcony, has_terrace, has_garden, has_parking
ORDER BY prix_m2_moyen DESC;
```

---

## 🎯 **Utilisation par Tous les Agents**

### **Agent Analyse Marché :**
- **Données utilisées :** `price_estimate`, `price_per_sqm`, `market_demand_level`, `time_to_sell_estimate`
- **Analyses :** Comparaison prix, tendances marché, positionnement

### **Agent Géolocalisation :**
- **Données utilisées :** `address`, `city`, `latitude`, `longitude`, `postal_code`
- **Analyses :** Services de proximité, accessibilité, qualité de vie

### **Agent Calcul Rentabilité :**
- **Données utilisées :** `price_estimate`, `surface_living`, `property_type`
- **Analyses :** ROI, rentabilité locative, coûts d'acquisition

### **Agent Énergie :**
- **Données utilisées :** `energy_class`, `ghg_emissions`, `construction_year`, `renovation_year`
- **Analyses :** Performance énergétique, travaux d'amélioration

### **Agent Analyse Photos :**
- **Données utilisées :** `condition_level`, `property_type`, `surface_living`
- **Analyses :** État général, défauts, coûts de rénovation

### **Agent Recommandations :**
- **Données utilisées :** Toutes les caractéristiques
- **Analyses :** Matching avec profils acheteurs, recommandations personnalisées

### **Agent Dossier Achat :**
- **Données utilisées :** `price_estimate`, `property_type`, `condition_level`
- **Analyses :** Checklist personnalisée, budget total, démarches

### **Agent Évaluateur :**
- **Données utilisées :** Toutes les données + résultats des autres agents
- **Analyses :** Synthèse globale, score final, recommandation

---

## 📊 **Métriques Clés**

### **Prix et Valorisation :**
- **Prix moyen au m² :** `AVG(price_per_sqm)`
- **Fourchette de prix :** `price_range_min` - `price_range_max`
- **Écart prix/estimation :** `|price_estimate - market_value| / market_value`

### **Caractéristiques :**
- **Surface moyenne :** `AVG(surface_living)`
- **Distribution des types :** `COUNT(*) GROUP BY property_type`
- **État moyen :** Moyenne pondérée des `condition_level`

### **Marché :**
- **Temps de vente moyen :** `AVG(time_to_sell_estimate)`
- **Niveau de demande :** Distribution des `market_demand_level`
- **Confiance des données :** `AVG(confidence_score)`

---

## ⚠️ **Points d'Attention**

1. **Cohérence des données :** Vérifier cohérence entre prix et caractéristiques
2. **Actualisation :** Prix et estimations à mettre à jour régulièrement
3. **Sources multiples :** Différentes sources peuvent donner des prix différents
4. **Confiance :** `confidence_score` à prendre en compte dans les analyses
5. **Évolutions :** Caractéristiques peuvent changer (rénovations, équipements)

---

## 🔗 **Relations avec Autres Bases**

- **Property_Photos :** 1 propriété → 5 photos en moyenne
- **Market_Data :** 1 propriété → données marché de sa ville
- **Nearby_Services :** 1 propriété → services dans un rayon de 500m
- **Transport_Accessibility :** 1 propriété → accessibilité transports
- **Financial_Analysis :** 1 propriété → analyse financière détaillée
- **Energy_Analysis :** 1 propriété → audit énergétique
- **Property_Defects :** 1 propriété → 1.5 défauts en moyenne
- **Buyer_Profiles :** N profils → matching avec toutes propriétés
- **AI_Analysis_Results :** 1 propriété → 2 analyses en moyenne
