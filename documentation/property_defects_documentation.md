# 🔍 Documentation Base de Données - PROPERTY DEFECTS

## 🎯 **Objectif de la Base de Données**

La base de données **Property_Defects** contient les défauts détectés par analyse d'images pour 100 propriétés, permettant d'évaluer l'état général, estimer les coûts de rénovation, et prioriser les travaux.

---

## 📋 **Structure des Données**

### **Défauts couverts :** 150 défauts répartis sur 100 propriétés
### **Catégories :** Structure, Électricité, Plomberie, Menuiserie, Finitions, Chauffage, Sécurité

---

## 🏗️ **Description des Colonnes**

### **1. Identifiants**
- **`id`** (TEXT) : ID unique du défaut (DEFECT_0001 à DEFECT_0150)
- **`property_id`** (TEXT) : ID de la propriété concernée (PROP_001 à PROP_100)
- **`photo_id`** (TEXT) : ID de la photo où le défaut a été détecté

### **2. Classification du Défaut**
- **`defect_type`** (TEXT) : Type spécifique de défaut
  - *Structure :* fissure_mur, fissure_plafond, fissure_sol, humidite_mur, efflorescence
  - *Électricité :* prise_defaillante, interrupteur_casse, cable_visible, tableau_electrique_vetuste
  - *Plomberie :* fuite_robinet, fuite_chasse_eau, canalisation_bouchee, chauffe_eau_defaillant
  - *Menuiserie :* fenetre_casse, porte_qui_grippe, volets_abimes, parquet_abime
  - *Finitions :* peinture_ecaille, papier_peint_decollage, carrelage_casse, joint_carrelage_abime
  - *Chauffage :* radiateur_rouille, chaudiere_vetuste
  - *Énergie :* isolation_insuffisante, simple_vitrage
  - *Sécurité :* serrure_defaillante, detecteur_fumee_manquant, gaz_non_conforme

- **`defect_category`** (TEXT) : Catégorie générale
  - *Valeurs :* structure, electricite, plomberie, menuiserie, finition, chauffage, energie, securite

- **`severity_level`** (TEXT) : Niveau de gravité
  - *Valeurs :* faible, moyen, important, critique
  - *Distribution :* faible(40%), moyen(35%), important(20%), critique(5%)

### **3. Description et Localisation**
- **`description`** (TEXT) : Description détaillée du défaut
  - *Exemples :* "Fissure verticale de 3.2cm sur le mur", "Prise électrique défaillante avec brûlures visibles"
- **`location_room`** (TEXT) : Pièce concernée
  - *Valeurs :* salon, cuisine, chambre, salle_de_bain, entree, couloir, balcon, cave, grenier
- **`location_area`** (TEXT) : Zone spécifique dans la pièce
  - *Valeurs :* mur_nord, mur_sud, mur_est, mur_ouest, plafond, sol, coin, fenetre, porte

### **4. Évaluation Financière**
- **`estimated_cost_repair`** (DECIMAL) : Coût estimé de réparation en euros
  - *Faible :* 50€ - 200€
  - *Moyen :* 200€ - 800€
  - *Important :* 800€ - 2,500€
  - *Critique :* 2,500€ - 8,000€

### **5. Priorisation et Détection**
- **`urgency_level`** (TEXT) : Niveau d'urgence
  - *Valeurs :* non_urgent, peu_urgent, urgent, tres_urgent, critique
  - *Corrélation :* faible → non_urgent, critique → tres_urgent
- **`detection_method`** (TEXT) : Méthode de détection
  - *Valeurs :* analyse_photo, inspection_visuelle, test_fonctionnel, controle_norme
- **`confidence_score`** (DECIMAL) : Score de confiance de la détection (0.0-1.0)
  - *Faible :* 0.6-0.8 (défauts subtils)
  - *Moyen :* 0.7-0.9 (défauts visibles)
  - *Important :* 0.8-0.95 (défauts évidents)
  - *Critique :* 0.9-0.98 (défauts majeurs)

### **6. Métadonnées**
- **`detected_at`** (TIMESTAMP) : Date de détection (30 derniers jours)
- **`detected_by_agent`** (TEXT) : Agent ayant détecté le défaut ("Agent_Analyse_Photos")

---

## 📈 **Méthodologie d'Analyse**

### **1. Analyse par Gravité**
```sql
-- Répartition des défauts par gravité
SELECT severity_level,
       COUNT(*) as nombre_defauts,
       AVG(estimated_cost_repair) as cout_moyen,
       AVG(confidence_score) as confiance_moyenne
FROM property_defects
GROUP BY severity_level
ORDER BY 
  CASE severity_level
    WHEN 'critique' THEN 1
    WHEN 'important' THEN 2
    WHEN 'moyen' THEN 3
    WHEN 'faible' THEN 4
  END;
```

### **2. Analyse par Catégorie**
```sql
-- Défauts par catégorie et coût total
SELECT defect_category,
       COUNT(*) as nombre_defauts,
       SUM(estimated_cost_repair) as cout_total,
       AVG(estimated_cost_repair) as cout_moyen
FROM property_defects
GROUP BY defect_category
ORDER BY cout_total DESC;
```

### **3. Analyse par Localisation**
```sql
-- Défauts par pièce
SELECT location_room,
       COUNT(*) as nombre_defauts,
       AVG(estimated_cost_repair) as cout_moyen,
       STRING_AGG(defect_type, ', ') as types_defauts
FROM property_defects
GROUP BY location_room
ORDER BY nombre_defauts DESC;
```

### **4. Priorisation des Travaux**
```sql
-- Défauts prioritaires par urgence et coût
SELECT property_id,
       defect_type,
       severity_level,
       urgency_level,
       estimated_cost_repair,
       confidence_score
FROM property_defects
WHERE urgency_level IN ('urgent', 'tres_urgent', 'critique')
ORDER BY 
  CASE urgency_level
    WHEN 'critique' THEN 1
    WHEN 'tres_urgent' THEN 2
    WHEN 'urgent' THEN 3
  END,
  estimated_cost_repair DESC;
```

---

## 🎯 **Utilisation par l'Agent Analyse Photos**

### **Questions Types à Répondre :**

1. **"Quels défauts ont été détectés dans cette propriété ?"**
   - Lister tous les défauts avec `severity_level` et `description`
   - Analyser `confidence_score` pour fiabilité
   - Identifier défauts critiques prioritaires

2. **"Quel est l'état général de cette propriété ?"**
   - Calculer score global basé sur `severity_level` et nombre de défauts
   - Analyser répartition par `defect_category`
   - Évaluer impact sur valeur immobilière

3. **"Combien coûterait la rénovation ?"**
   - Calculer `SUM(estimated_cost_repair)` par propriété
   - Analyser répartition des coûts par catégorie
   - Prioriser selon `urgency_level`

4. **"Quels travaux sont les plus urgents ?"**
   - Filtrer par `urgency_level` = 'urgent', 'tres_urgent', 'critique'
   - Analyser `estimated_cost_repair` et `confidence_score`
   - Recommander ordre d'intervention

5. **"Y a-t-il des défauts cachés ou non détectés ?"**
   - Analyser `confidence_score` < 0.8
   - Identifier pièces sans défauts détectés
   - Recommander inspection approfondie

### **Métriques Clés à Calculer :**

- **Score État Global :** `(10 - nombre_defauts_importants - nombre_defauts_critiques)`
- **Coût Total Rénovation :** `SUM(estimated_cost_repair)`
- **Urgence Moyenne :** Moyenne pondérée des `urgency_level`
- **Fiabilité Détection :** `AVG(confidence_score)`
- **Ratio Défauts/Coût :** `nombre_defauts / cout_total`

### **Recommandations Types :**

- **Excellent état :** 0-2 défauts mineurs, coût < 1,000€
- **Bon état :** 2-5 défauts mineurs/moyens, coût 1,000-3,000€
- **État moyen :** 5-10 défauts variés, coût 3,000-8,000€
- **État dégradé :** >10 défauts ou défauts critiques, coût > 8,000€

---

## ⚠️ **Points d'Attention**

1. **Limitations détection :** Analyse photo uniquement, défauts cachés non détectés
2. **Coûts estimatifs :** Prix indicatifs, ajuster selon région et prestataire
3. **Urgence relative :** Priorité selon contexte (vente, location, habitation)
4. **Défauts combinés :** Certains défauts peuvent s'aggraver mutuellement
5. **Maintenance préventive :** Défauts mineurs peuvent évoluer rapidement

---

## 🔗 **Interactions avec Autres Agents**

- **Agent Calcul Rentabilité :** Coûts de rénovation dans calculs de rentabilité
- **Agent Analyse Marché :** État de la propriété impact sur prix
- **Agent Recommandations :** État selon profil acheteur et budget
- **Agent Évaluateur :** Synthèse globale incluant état de la propriété
