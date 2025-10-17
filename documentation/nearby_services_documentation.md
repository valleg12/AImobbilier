# 🗺️ Documentation Base de Données - NEARBY SERVICES

## 🎯 **Objectif de la Base de Données**

La base de données **Nearby_Services** contient la géolocalisation et l'analyse des services de proximité pour 100 propriétés, permettant d'évaluer la qualité de vie et l'attractivité d'un quartier.

---

## 📋 **Structure des Données**

### **Propriétés couvertes :** 100 propriétés (PROP_001 à PROP_100)
### **Rayon d'analyse :** 500m autour de chaque propriété

---

## 🏗️ **Description des Colonnes**

### **1. Identifiants**
- **`property_id`** (TEXT) : ID de la propriété (PROP_001 à PROP_100)
- **`city`** (TEXT) : Ville de la propriété
- **`postal_code`** (TEXT) : Code postal

### **2. Transport Public**
- **`metro_stations_count`** (INTEGER) : Nombre de stations métro dans un rayon de 500m
  - *Gamme :* 0-3 stations
  - *Paris :* 1-3 stations
  - *Province :* 0-1 station
- **`metro_nearest_distance`** (DECIMAL) : Distance à la station la plus proche en mètres
  - *Gamme :* 100-2000m (si métro présent)
- **`metro_nearest_name`** (TEXT) : Nom de la station la plus proche
- **`metro_nearest_line`** (TEXT) : Ligne de métro (ex: "Ligne 1", "Ligne B")
- **`bus_nearest_distance`** (DECIMAL) : Distance à l'arrêt de bus le plus proche
  - *Gamme :* 50-800m

### **3. Éducation**
- **`schools_count`** (INTEGER) : Nombre d'écoles dans le rayon
  - *Gamme :* 0-5 écoles
- **`schools_nearest_distance`** (DECIMAL) : Distance à l'école la plus proche
  - *Gamme :* 200-1500m
- **`universities_count`** (INTEGER) : Nombre d'universités/grandes écoles
  - *Gamme :* 0-2 (principalement dans les grandes villes)
- **`universities_nearest_distance`** (DECIMAL) : Distance à l'université la plus proche
  - *Gamme :* 500-3000m (si présente)

### **4. Santé**
- **`pharmacies_count`** (INTEGER) : Nombre de pharmacies
  - *Gamme :* 0-3 pharmacies
- **`pharmacies_nearest_distance`** (DECIMAL) : Distance à la pharmacie la plus proche
  - *Gamme :* 100-1000m
- **`hospitals_count`** (INTEGER) : Nombre d'hôpitaux/cliniques
  - *Gamme :* 0-2
- **`hospitals_nearest_distance`** (DECIMAL) : Distance à l'hôpital le plus proche
  - *Gamme :* 800-5000m

### **5. Commerces**
- **`supermarkets_count`** (INTEGER) : Nombre de supermarchés
  - *Gamme :* 0-3
- **`supermarkets_nearest_distance`** (DECIMAL) : Distance au supermarché le plus proche
  - *Gamme :* 300-2000m
- **`shopping_centers_count`** (INTEGER) : Nombre de centres commerciaux
  - *Gamme :* 0-2
- **`shopping_centers_nearest_distance`** (DECIMAL) : Distance au centre commercial le plus proche
  - *Gamme :* 500-3000m
- **`restaurants_count`** (INTEGER) : Nombre de restaurants
  - *Gamme :* 0-15
- **`restaurants_nearest_distance`** (DECIMAL) : Distance au restaurant le plus proche
  - *Gamme :* 50-800m

### **6. Loisirs**
- **`parks_count`** (INTEGER) : Nombre de parcs/jardins publics
  - *Gamme :* 0-4
- **`parks_nearest_distance`** (DECIMAL) : Distance au parc le plus proche
  - *Gamme :* 200-1500m
- **`cinemas_count`** (INTEGER) : Nombre de cinémas
  - *Gamme :* 0-2
- **`cinemas_nearest_distance`** (DECIMAL) : Distance au cinéma le plus proche
  - *Gamme :* 400-2500m
- **`gyms_count`** (INTEGER) : Nombre de salles de sport
  - *Gamme :* 0-3
- **`gyms_nearest_distance`** (DECIMAL) : Distance à la salle de sport la plus proche
  - *Gamme :* 300-1500m

### **7. Services Essentiels**
- **`banks_count`** (INTEGER) : Nombre de banques
  - *Gamme :* 0-5
- **`banks_nearest_distance`** (DECIMAL) : Distance à la banque la plus proche
  - *Gamme :* 200-1000m
- **`post_offices_count`** (INTEGER) : Nombre de bureaux de poste
  - *Gamme :* 0-2
- **`post_offices_nearest_distance`** (DECIMAL) : Distance au bureau de poste le plus proche
  - *Gamme :* 300-1500m

### **8. Métriques de Qualité**
- **`walkability_score`** (DECIMAL) : Score de marchabilité (0-10)
  - *Calcul :* Basé sur la densité et proximité des services
- **`service_density_score`** (DECIMAL) : Score de densité de services (0-10)
  - *Calcul :* Nombre total de services / 10

---

## 📈 **Méthodologie d'Analyse**

### **1. Score de Marchabilité**
```sql
-- Calcul du score de marchabilité
SELECT property_id,
       CASE 
         WHEN metro_nearest_distance <= 500 THEN 3
         WHEN metro_nearest_distance <= 1000 THEN 2
         WHEN metro_nearest_distance <= 1500 THEN 1
         ELSE 0
       END +
       CASE 
         WHEN supermarkets_nearest_distance <= 500 THEN 2
         WHEN supermarkets_nearest_distance <= 1000 THEN 1
         ELSE 0
       END +
       CASE 
         WHEN restaurants_count >= 5 THEN 2
         WHEN restaurants_count >= 2 THEN 1
         ELSE 0
       END +
       CASE 
         WHEN parks_nearest_distance <= 500 THEN 1
         WHEN parks_nearest_distance <= 1000 THEN 0.5
         ELSE 0
       END as walkability_score
FROM nearby_services;
```

### **2. Analyse par Type de Service**
```sql
-- Services les mieux desservis
SELECT 
  AVG(supermarkets_count) as avg_supermarkets,
  AVG(restaurants_count) as avg_restaurants,
  AVG(pharmacies_count) as avg_pharmacies,
  AVG(parks_count) as avg_parks
FROM nearby_services
GROUP BY city;
```

### **3. Comparaison Inter-Quartiers**
```sql
-- Classement par qualité de services
SELECT property_id, city,
       (supermarkets_count + restaurants_count + pharmacies_count + parks_count) as total_services,
       walkability_score,
       service_density_score
FROM nearby_services
ORDER BY total_services DESC, walkability_score DESC;
```

---

## 🎯 **Utilisation par l'Agent Géolocalisation**

### **Questions Types à Répondre :**

1. **"Quels services sont disponibles près de cette propriété ?"**
   - Lister tous les services avec distances
   - Calculer scores de proximité
   - Identifier services manquants

2. **"Comment évaluer la qualité de vie dans ce quartier ?"**
   - Analyser `walkability_score` et `service_density_score`
   - Comparer avec moyennes ville/région
   - Identifier points forts/faibles

3. **"L'accès aux transports est-il pratique ?"**
   - Évaluer `metro_stations_count` et `metro_nearest_distance`
   - Analyser `bus_nearest_distance`
   - Calculer temps de trajet estimé

4. **"Ce quartier convient-il à une famille ?"**
   - Analyser services éducation (`schools_count`, `universities_count`)
   - Évaluer services santé (`pharmacies_count`, `hospitals_count`)
   - Considérer loisirs (`parks_count`, `cinemas_count`)

5. **"Quels sont les avantages/inconvénients de cette localisation ?"**
   - Synthèse des services disponibles
   - Identification des lacunes
   - Recommandations d'amélioration

### **Métriques Clés à Calculer :**

- **Score Transport :** `(metro_stations_count * 3) + (bus_nearest_distance <= 500 ? 2 : 0)`
- **Score Éducation :** `schools_count + (universities_count * 2)`
- **Score Santé :** `pharmacies_count + (hospitals_count * 3)`
- **Score Commerce :** `supermarkets_count + restaurants_count + shopping_centers_count`
- **Score Loisirs :** `parks_count + cinemas_count + gyms_count`
- **Score Global :** Moyenne pondérée de tous les scores

### **Recommandations Types :**

- **Excellent :** Tous services < 500m, score > 8/10
- **Bon :** Services essentiels < 800m, score 6-8/10
- **Moyen :** Services de base présents, score 4-6/10
- **Faible :** Services limités, score < 4/10

---

## ⚠️ **Points d'Attention**

1. **Distances réelles :** Les distances sont à vol d'oiseau, ajouter 20-30% pour trajet réel
2. **Horaires d'ouverture :** Non inclus, à préciser selon besoin
3. **Qualité des services :** Non évaluée, se baser sur réputation locale
4. **Évolution future :** Nouveaux projets non pris en compte
5. **Saisonnalité :** Certains services peuvent varier selon saisons

---

## 🔗 **Interactions avec Autres Agents**

- **Agent Analyse Marché :** Impact services sur prix immobiliers
- **Agent Recommandations :** Services selon profil acheteur
- **Agent Calcul Rentabilité :** Services comme facteur de valorisation
- **Agent Évaluateur :** Synthèse globale incluant qualité de vie
