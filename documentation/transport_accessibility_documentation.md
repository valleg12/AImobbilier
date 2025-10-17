# 🚇 Documentation Base de Données - TRANSPORT ACCESSIBILITY

## 🎯 **Objectif de la Base de Données**

La base de données **Transport_Accessibility** contient les données de mobilité et d'accessibilité pour 100 propriétés, permettant d'évaluer la connectivité et les temps de déplacement vers les centres d'intérêt.

---

## 📋 **Structure des Données**

### **Propriétés couvertes :** 100 propriétés (PROP_001 à PROP_100)
### **Centres d'intérêt analysés :** Centre-ville, aéroport, gare, université, hôpital, shopping

---

## 🏗️ **Description des Colonnes**

### **1. Identifiants**
- **`property_id`** (TEXT) : ID de la propriété (PROP_001 à PROP_100)
- **`city`** (TEXT) : Ville de la propriété
- **`postal_code`** (TEXT) : Code postal

### **2. Centre-Ville**
- **`city_center_distance_km`** (DECIMAL) : Distance au centre-ville en km
  - *Gamme :* 0.5 - 25 km
  - *Centre-ville :* 0.5-2 km
  - *Périphérie :* 5-25 km
- **`city_center_drive_time_min`** (INTEGER) : Temps en voiture en minutes
  - *Gamme :* 5-45 minutes
- **`city_center_public_transport_time_min`** (INTEGER) : Temps en transport public
  - *Gamme :* 10-90 minutes
- **`city_center_walk_time_min`** (INTEGER) : Temps à pied
  - *Gamme :* 15-300 minutes (si < 5km)

### **3. Aéroport**
- **`airport_distance_km`** (DECIMAL) : Distance à l'aéroport en km
  - *Gamme :* 8-80 km
  - *Proche :* 8-20 km
  - *Éloigné :* 40-80 km
- **`airport_drive_time_min`** (INTEGER) : Temps en voiture
  - *Gamme :* 15-90 minutes
- **`airport_public_transport_time_min`** (INTEGER) : Temps en transport public
  - *Gamme :* 30-120 minutes

### **4. Gare**
- **`train_station_distance_km`** (DECIMAL) : Distance à la gare principale
  - *Gamme :* 0.5-15 km
  - *Proche :* 0.5-2 km
  - *Éloigné :* 8-15 km
- **`train_station_drive_time_min`** (INTEGER) : Temps en voiture
  - *Gamme :* 5-25 minutes
- **`train_station_public_transport_time_min`** (INTEGER) : Temps en transport public
  - *Gamme :* 10-45 minutes

### **5. Université**
- **`university_distance_km`** (DECIMAL) : Distance à l'université principale
  - *Gamme :* 1-20 km
  - *Campus :* 1-3 km
  - *Éloigné :* 10-20 km
- **`university_drive_time_min`** (INTEGER) : Temps en voiture
  - *Gamme :* 10-35 minutes
- **`university_public_transport_time_min`** (INTEGER) : Temps en transport public
  - *Gamme :* 15-60 minutes

### **6. Hôpital**
- **`hospital_distance_km`** (DECIMAL) : Distance à l'hôpital principal
  - *Gamme :* 1-15 km
  - *Proche :* 1-3 km
  - *Éloigné :* 8-15 km
- **`hospital_drive_time_min`** (INTEGER) : Temps en voiture
  - *Gamme :* 5-30 minutes
- **`hospital_public_transport_time_min`** (INTEGER) : Temps en transport public
  - *Gamme :* 10-50 minutes

### **7. Shopping**
- **`shopping_distance_km`** (DECIMAL) : Distance au centre commercial principal
  - *Gamme :* 0.5-12 km
  - *Proche :* 0.5-2 km
  - *Éloigné :* 6-12 km
- **`shopping_drive_time_min`** (INTEGER) : Temps en voiture
  - *Gamme :* 5-25 minutes
- **`shopping_public_transport_time_min`** (INTEGER) : Temps en transport public
  - *Gamme :* 10-40 minutes

### **8. Scores de Mobilité**
- **`mobility_score`** (DECIMAL) : Score global de mobilité (0-10)
  - *Calcul :* Moyenne pondérée des temps d'accès
- **`public_transport_score`** (DECIMAL) : Score transport public (0-10)
  - *Calcul :* Basé sur temps et fréquence des transports
- **`car_dependency_score`** (DECIMAL) : Score de dépendance à la voiture (0-10)
  - *Calcul :* Différence temps voiture vs transport public

---

## 📈 **Méthodologie d'Analyse**

### **1. Score de Mobilité Global**
```sql
-- Calcul du score de mobilité
SELECT property_id,
       (10 - (city_center_public_transport_time_min / 10)) +
       (10 - (airport_public_transport_time_min / 15)) +
       (10 - (train_station_public_transport_time_min / 8)) +
       (10 - (university_public_transport_time_min / 12)) +
       (10 - (hospital_public_transport_time_min / 10)) +
       (10 - (shopping_public_transport_time_min / 8)) / 6 as mobility_score
FROM transport_accessibility;
```

### **2. Analyse de Connectivité**
```sql
-- Temps d'accès moyens par mode de transport
SELECT 
  AVG(city_center_drive_time_min) as avg_car_to_center,
  AVG(city_center_public_transport_time_min) as avg_pt_to_center,
  AVG(city_center_public_transport_time_min) - AVG(city_center_drive_time_min) as time_difference
FROM transport_accessibility
GROUP BY city;
```

### **3. Classification par Mobilité**
```sql
-- Classification des propriétés par accessibilité
SELECT property_id, city,
       CASE 
         WHEN mobility_score >= 8 THEN 'Excellente'
         WHEN mobility_score >= 6 THEN 'Bonne'
         WHEN mobility_score >= 4 THEN 'Moyenne'
         ELSE 'Faible'
       END as accessibilite_class
FROM transport_accessibility
ORDER BY mobility_score DESC;
```

---

## 🎯 **Utilisation par l'Agent Géolocalisation**

### **Questions Types à Répondre :**

1. **"Comment accéder au centre-ville depuis cette propriété ?"**
   - Analyser `city_center_distance_km` et temps d'accès
   - Comparer voiture vs transport public
   - Évaluer praticité selon mode de transport

2. **"L'accès aux transports longue distance est-il pratique ?"**
   - Évaluer `airport_distance_km` et `train_station_distance_km`
   - Analyser temps d'accès en transport public
   - Identifier contraintes logistiques

3. **"Cette localisation convient-elle aux étudiants ?"**
   - Analyser `university_distance_km` et temps d'accès
   - Évaluer `public_transport_score`
   - Considérer fréquence des transports

4. **"L'accès aux services essentiels est-il satisfaisant ?"**
   - Analyser `hospital_distance_km` et `shopping_distance_km`
   - Évaluer temps d'accès selon mode de transport
   - Identifier services les plus éloignés

5. **"Quel est le niveau de mobilité de cette localisation ?"**
   - Calculer `mobility_score` global
   - Analyser `car_dependency_score`
   - Comparer avec moyennes ville/région

### **Métriques Clés à Calculer :**

- **Score Transport Public :** `(60 - temps_moyen_transport_public) / 6`
- **Score Voiture :** `(30 - temps_moyen_voiture) / 3`
- **Indépendance Voiture :** `10 - (différence_temps_voiture_transport / 10)`
- **Connectivité Globale :** Moyenne pondérée des scores d'accès
- **Équilibre Mobilité :** `(transport_public_score + indépendance_voiture) / 2`

### **Recommandations Types :**

- **Excellente mobilité :** Tous services < 30min transport public, score > 8/10
- **Bonne mobilité :** Services essentiels < 45min, score 6-8/10
- **Mobilité moyenne :** Services accessibles mais temps élevés, score 4-6/10
- **Mobilité faible :** Dépendance forte à la voiture, score < 4/10

---

## ⚠️ **Points d'Attention**

1. **Temps réels :** Les temps sont indicatifs, inclure variations trafic
2. **Fréquence transports :** Non prise en compte, ajuster selon horaires
3. **Horaires de pointe :** Temps calculés en conditions normales
4. **Travaux/perturbations :** Non considérés, vérifier actualité
5. **Coûts transport :** Non inclus, calculer selon besoins

---

## 🔗 **Interactions avec Autres Agents**

- **Agent Analyse Marché :** Impact mobilité sur prix immobiliers
- **Agent Recommandations :** Mobilité selon profil acheteur
- **Agent Calcul Rentabilité :** Mobilité comme facteur de valorisation
- **Agent Évaluateur :** Synthèse globale incluant accessibilité
