# ⚡ Documentation Base de Données - ENERGY ANALYSIS

## 🎯 **Objectif de la Base de Données**

La base de données **Energy_Analysis** contient les analyses énergétiques détaillées pour 100 propriétés, permettant d'évaluer la consommation, les performances énergétiques, et les opportunités d'économies.

---

## 📋 **Structure des Données**

### **Propriétés couvertes :** 100 propriétés (PROP_001 à PROP_100)
### **Analyses incluses :** DPE, consommations, travaux d'amélioration, ROI écologique

---

## 🏗️ **Description des Colonnes**

### **1. Identifiants**
- **`property_id`** (TEXT) : ID de la propriété (PROP_001 à PROP_100)
- **`property_type`** (TEXT) : Type de bien (appartement, maison, studio, loft, duplex)
- **`surface_living`** (DECIMAL) : Surface habitable en m²
- **`construction_year`** (INTEGER) : Année de construction
  - *Gamme :* 1850-2024

### **2. Diagnostic de Performance Énergétique (DPE)**
- **`energy_class`** (TEXT) : Classe énergétique (A, B, C, D, E, F, G)
  - *Distribution :* A(5%), B(15%), C(25%), D(30%), E(20%), F(4%), G(1%)
- **`ghg_emissions_class`** (TEXT) : Classe GES (A, B, C, D, E, F, G)
- **`energy_consumption_kwh_m2`** (DECIMAL) : Consommation énergétique kWh/m²/an
  - *Gamme :* 50-450 kWh/m²/an
  - *Classe A :* 50-90 kWh/m²/an
  - *Classe G :* 250-450 kWh/m²/an

### **3. Consommations Détaillées**
- **`heating_consumption_kwh`** (DECIMAL) : Consommation chauffage en kWh/an
  - *Gamme :* 3,000-45,000 kWh/an
- **`hot_water_consumption_kwh`** (DECIMAL) : Consommation eau chaude en kWh/an
  - *Gamme :* 1,500-8,000 kWh/an
- **`electricity_consumption_kwh`** (DECIMAL) : Consommation électricité en kWh/an
  - *Gamme :* 2,000-12,000 kWh/an
- **`total_consumption_kwh`** (DECIMAL) : Consommation totale en kWh/an
  - *Calcul :* heating + hot_water + electricity

### **4. Coûts Énergétiques**
- **`energy_cost_annual`** (DECIMAL) : Coût énergétique annuel en euros
  - *Gamme :* 800€ - 4,500€
- **`heating_cost_annual`** (DECIMAL) : Coût chauffage annuel
  - *Gamme :* 400€ - 2,800€
- **`hot_water_cost_annual`** (DECIMAL) : Coût eau chaude annuel
  - *Gamme :* 200€ - 800€
- **`electricity_cost_annual`** (DECIMAL) : Coût électricité annuel
  - *Gamme :* 300€ - 1,200€

### **5. Équipements Actuels**
- **`heating_system`** (TEXT) : Système de chauffage
  - *Types :* Gaz, Électricité, Fioul, Bois, Pompe à chaleur, Chauffage urbain
- **`hot_water_system`** (TEXT) : Système eau chaude
  - *Types :* Chauffe-eau électrique, Gaz, Thermodynamique, Solaire
- **`insulation_level`** (TEXT) : Niveau d'isolation
  - *Niveaux :* Très bonne, Bonne, Moyenne, Insuffisante, Très insuffisante
- **`window_type`** (TEXT) : Type de fenêtres
  - *Types :* Simple vitrage, Double vitrage, Triple vitrage

### **6. Travaux d'Amélioration Recommandés**
- **`priority_1_work`** (TEXT) : Travaux prioritaires 1
  - *Types :* Isolation toiture, Isolation murs, Remplacement chauffage, Fenêtres
- **`priority_1_cost`** (DECIMAL) : Coût travaux prioritaires 1
  - *Gamme :* 3,000€ - 25,000€
- **`priority_1_savings_annual`** (DECIMAL) : Économies annuelles travaux 1
  - *Gamme :* 200€ - 1,500€
- **`priority_2_work`** (TEXT) : Travaux prioritaires 2
- **`priority_2_cost`** (DECIMAL) : Coût travaux prioritaires 2
- **`priority_2_savings_annual`** (DECIMAL) : Économies annuelles travaux 2

### **7. Retour sur Investissement**
- **`roi_priority_1_years`** (DECIMAL) : ROI travaux prioritaires 1 en années
  - *Gamme :* 3-15 ans
- **`roi_priority_2_years`** (DECIMAL) : ROI travaux prioritaires 2 en années
- **`total_investment_needed`** (DECIMAL) : Investissement total nécessaire
  - *Gamme :* 5,000€ - 50,000€
- **`total_savings_potential`** (DECIMAL) : Économies totales potentielles
  - *Gamme :* 400€ - 2,500€/an

### **8. Aides et Subventions**
- **`available_aids`** (TEXT) : Aides disponibles
  - *Types :* MaPrimeRénov', CEE, Anah, Collectivités locales
- **`aids_amount`** (DECIMAL) : Montant des aides en euros
  - *Gamme :* 500€ - 15,000€
- **`net_investment`** (DECIMAL) : Investissement net après aides
  - *Calcul :* total_investment_needed - aids_amount

### **9. Impact Environnemental**
- **`co2_emissions_annual`** (DECIMAL) : Émissions CO2 annuelles en tonnes
  - *Gamme :* 0.5-8 tonnes CO2/an
- **`co2_reduction_potential`** (DECIMAL) : Réduction CO2 potentielle en tonnes
  - *Gamme :* 0.2-3 tonnes CO2/an
- **`energy_efficiency_score`** (DECIMAL) : Score d'efficacité énergétique (0-10)
  - *Calcul :* Basé sur classe énergétique et consommations

---

## 📈 **Méthodologie d'Analyse**

### **1. Calcul de l'Efficacité Énergétique**
```sql
-- Score d'efficacité énergétique
SELECT property_id,
       CASE energy_class
         WHEN 'A' THEN 10
         WHEN 'B' THEN 8.5
         WHEN 'C' THEN 7
         WHEN 'D' THEN 5.5
         WHEN 'E' THEN 4
         WHEN 'F' THEN 2.5
         WHEN 'G' THEN 1
       END as efficiency_score
FROM energy_analysis;
```

### **2. Analyse des Économies Potentielles**
```sql
-- Économies annuelles par type de travaux
SELECT priority_1_work,
       AVG(priority_1_savings_annual) as economie_moyenne,
       AVG(roi_priority_1_years) as roi_moyen
FROM energy_analysis
GROUP BY priority_1_work
ORDER BY economie_moyenne DESC;
```

### **3. Classement par Performance**
```sql
-- Propriétés les plus énergivores
SELECT property_id,
       energy_class,
       energy_consumption_kwh_m2,
       energy_cost_annual,
       total_savings_potential
FROM energy_analysis
WHERE energy_class IN ('F', 'G')
ORDER BY energy_cost_annual DESC;
```

### **4. Optimisation des Investissements**
```sql
-- Travaux les plus rentables
SELECT property_id,
       priority_1_work,
       priority_1_cost,
       priority_1_savings_annual,
       roi_priority_1_years,
       CASE 
         WHEN roi_priority_1_years <= 5 THEN 'Très rentable'
         WHEN roi_priority_1_years <= 8 THEN 'Rentable'
         WHEN roi_priority_1_years <= 12 THEN 'Moyennement rentable'
         ELSE 'Peu rentable'
       END as rentabilite_class
FROM energy_analysis
ORDER BY roi_priority_1_years;
```

---

## 🎯 **Utilisation par l'Agent Énergie**

### **Questions Types à Répondre :**

1. **"Quelle est la performance énergétique de cette propriété ?"**
   - Analyser `energy_class` et `energy_consumption_kwh_m2`
   - Comparer avec moyennes secteur
   - Identifier points d'amélioration

2. **"Combien coûte l'énergie par an ?"**
   - Calculer `energy_cost_annual` détaillé
   - Analyser répartition par poste (chauffage, eau chaude, électricité)
   - Comparer avec moyennes régionales

3. **"Quels travaux d'amélioration recommander ?"**
   - Analyser `priority_1_work` et `priority_2_work`
   - Évaluer `priority_1_cost` et `priority_2_cost`
   - Calculer `roi_priority_1_years` et `roi_priority_2_years`

4. **"Quelles économies sont possibles ?"**
   - Analyser `total_savings_potential`
   - Calculer `co2_reduction_potential`
   - Évaluer impact environnemental

5. **"Quelles aides sont disponibles ?"**
   - Lister `available_aids`
   - Calculer `aids_amount`
   - Évaluer `net_investment` après aides

### **Métriques Clés à Calculer :**

- **Score Énergétique :** `(10 - position_classe_energetique)`
- **Coût au m² :** `energy_cost_annual / surface_living`
- **Potentiel d'Économie :** `total_savings_potential / energy_cost_annual * 100`
- **ROI Écologique :** `co2_reduction_potential / total_investment_needed`
- **Efficacité Globale :** Moyenne pondérée des scores énergétiques

### **Recommandations Types :**

- **Très performant :** Classe A-B, coût < 15€/m²/an
- **Performant :** Classe C, coût 15-25€/m²/an
- **Moyen :** Classe D-E, coût 25-35€/m²/an
- **À améliorer :** Classe F-G, coût > 35€/m²/an

---

## ⚠️ **Points d'Attention**

1. **Évolution des prix énergie :** Calculs basés sur prix actuels
2. **Comportement occupants :** Consommations moyennes, ajuster selon usage
3. **Qualité des travaux :** ROI basé sur estimations standard
4. **Aides publiques :** Vérifier actualité des dispositifs
5. **Maintenance :** Coûts de maintenance non inclus dans ROI

---

## 🔗 **Interactions avec Autres Agents**

- **Agent Calcul Rentabilité :** Coûts énergétiques dans calculs de rentabilité
- **Agent Analyse Marché :** Performance énergétique impact sur prix
- **Agent Recommandations :** Économies énergétiques selon profil acheteur
- **Agent Évaluateur :** Synthèse globale incluant performance énergétique
