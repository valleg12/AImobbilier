# 👥 Documentation Base de Données - BUYER PROFILES

## 🎯 **Objectif de la Base de Données**

La base de données **Buyer_Profiles** contient 20 profils d'acheteurs typiques avec leurs préférences, budgets, et critères de choix, permettant de personnaliser les recommandations et d'optimiser le matching propriété-acheteur.

---

## 📋 **Structure des Données**

### **Profils couverts :** 20 profils variés représentatifs du marché immobilier français
### **Répartition :** Jeunes professionnels, couples, familles, seniors, investisseurs, primo-accédants

---

## 🏗️ **Description des Colonnes**

### **1. Identifiants**
- **`id`** (TEXT) : ID unique du profil (BUYER_001 à BUYER_020)
- **`user_id`** (TEXT) : ID utilisateur associé (USER_001 à USER_020)

### **2. Profil Personnel**
- **`age_range`** (TEXT) : Tranche d'âge
  - *Valeurs :* "26-35", "36-45", "46-55", "56-65"
  - *Distribution :* 26-35(40%), 36-45(35%), 46-55(15%), 56-65(10%)
- **`family_situation`** (TEXT) : Situation familiale
  - *Valeurs :* célibataire, couple, couple_enfants, famille_nombreuse, senior
- **`profession`** (TEXT) : Profession
  - *Types :* Développeur, Consultant, Cadre, Médecin, Enseignant, Retraité, etc.
- **`income_level`** (TEXT) : Niveau de revenus
  - *Valeurs :* faible, moyen, élevé, très_élevé

### **3. Budget et Financement**
- **`budget_min`** (DECIMAL) : Budget minimum en euros
  - *Gamme :* 180,000€ - 500,000€
- **`budget_max`** (DECIMAL) : Budget maximum en euros
  - *Gamme :* 300,000€ - 1,200,000€
- **`budget_comfortable`** (DECIMAL) : Budget confortable en euros
  - *Calcul :* budget_min + (budget_max - budget_min) * 0.6-0.8

### **4. Préférences Immobilières**
- **`preferred_property_type`** (TEXT) : Type de bien préféré
  - *Valeurs :* appartement, maison, studio, loft, duplex
- **`min_rooms`** (INTEGER) : Nombre minimum de pièces
  - *Gamme :* 1-5 pièces
- **`max_rooms`** (INTEGER) : Nombre maximum de pièces
  - *Gamme :* 2-6 pièces
- **`min_surface`** (DECIMAL) : Surface minimum en m²
  - *Gamme :* 25-100 m²
- **`max_surface`** (DECIMAL) : Surface maximum en m²
  - *Gamme :* 65-150 m²

### **5. Préférences de Localisation**
- **`preferred_cities`** (TEXT) : Villes préférées
  - *Valeurs :* Paris, Lyon, Marseille, Toulouse, Bordeaux, etc.
- **`preferred_departments`** (TEXT) : Départements préférés
  - *Valeurs :* 75, 69, 13, 31, 33, 92, 93, 94
- **`max_commute_time`** (INTEGER) : Temps de trajet maximum en minutes
  - *Gamme :* 30-90 minutes
- **`public_transport_required`** (BOOLEAN) : Transport public obligatoire
  - *Distribution :* 70% true, 30% false

### **6. Critères d'Importance**
- **`price_importance`** (TEXT) : Importance du prix
  - *Valeurs :* peu_important, moyen, important, très_important
- **`location_importance`** (TEXT) : Importance de la localisation
  - *Valeurs :* peu_important, moyen, important, très_important
- **`size_importance`** (TEXT) : Importance de la taille
  - *Valeurs :* peu_important, moyen, important, très_important
- **`condition_importance`** (TEXT) : Importance de l'état
  - *Valeurs :* peu_important, moyen, important, très_important
- **`energy_importance`** (TEXT) : Importance de l'énergie
  - *Valeurs :* peu_important, moyen, important, très_important

### **7. Métadonnées**
- **`created_at`** (TIMESTAMP) : Date de création du profil
- **`updated_at`** (TIMESTAMP) : Date de dernière mise à jour

---

## 👥 **Types de Profils Détaillés**

### **1. Jeunes Professionnels (3 profils)**
- **Caractéristiques :** 26-35 ans, célibataires, revenus moyens-élevés
- **Budget :** 250,000€ - 500,000€
- **Préférences :** Appartements 2-3 pièces, 45-70 m², transport public obligatoire
- **Critères :** Localisation très importante, prix important, énergie peu importante

### **2. Jeunes Couples (2 profils)**
- **Caractéristiques :** 26-35 ans, couple, revenus élevés
- **Budget :** 350,000€ - 700,000€
- **Préférences :** Appartements 3-4 pièces, 60-90 m²
- **Critères :** Localisation et taille très importantes, prix important

### **3. Familles avec Enfants (3 profils)**
- **Caractéristiques :** 36-45 ans, couple avec enfants, revenus élevés
- **Budget :** 450,000€ - 1,000,000€
- **Préférences :** Appartements/maisons 4-5 pièces, 80-120 m²
- **Critères :** Taille très importante, localisation importante, énergie importante

### **4. Familles Nombreuses (2 profils)**
- **Caractéristiques :** 36-45 ans, famille nombreuse, revenus moyens-élevés
- **Budget :** 400,000€ - 800,000€
- **Préférences :** Maisons 5-6 pièces, 100-150 m²
- **Critères :** Taille très importante, prix important

### **5. Couples sans Enfants (2 profils)**
- **Caractéristiques :** 46-55 ans, couple, revenus élevés
- **Budget :** 500,000€ - 1,200,000€
- **Préférences :** Appartements/maisons 3-5 pièces, 70-120 m²
- **Critères :** Localisation très importante, état très important

### **6. Seniors (3 profils)**
- **Caractéristiques :** 56-65 ans, situation variée, revenus moyens-élevés
- **Budget :** 300,000€ - 800,000€
- **Préférences :** Appartements 2-4 pièces, 50-80 m²
- **Critères :** Localisation très importante, état très important, énergie importante

### **7. Investisseurs (2 profils)**
- **Caractéristiques :** 36-55 ans, revenus très élevés
- **Budget :** 200,000€ - 1,500,000€
- **Préférences :** Appartements/studios 1-3 pièces, 25-80 m²
- **Critères :** Prix très important, localisation importante, taille peu importante

### **8. Primo-Accédants (3 profils)**
- **Caractéristiques :** 26-35 ans, revenus faibles-moyens
- **Budget :** 180,000€ - 400,000€
- **Préférences :** Appartements 2-3 pièces, 40-65 m²
- **Critères :** Prix très important, taille importante, état moyen

---

## 📈 **Méthodologie d'Analyse**

### **1. Matching Propriété-Profil**
```sql
-- Score de compatibilité propriété-profil
SELECT p.property_id,
       b.id as buyer_id,
       -- Score budget (0-3 points)
       CASE 
         WHEN p.price BETWEEN b.budget_min AND b.budget_max THEN 3
         WHEN p.price BETWEEN b.budget_min AND b.budget_comfortable THEN 2
         WHEN p.price <= b.budget_max * 1.1 THEN 1
         ELSE 0
       END +
       -- Score type de bien (0-2 points)
       CASE WHEN p.property_type = b.preferred_property_type THEN 2 ELSE 0 END +
       -- Score taille (0-2 points)
       CASE 
         WHEN p.surface_living BETWEEN b.min_surface AND b.max_surface THEN 2
         WHEN p.surface_living BETWEEN b.min_surface * 0.9 AND b.max_surface * 1.1 THEN 1
         ELSE 0
       END +
       -- Score localisation (0-2 points)
       CASE WHEN p.city = b.preferred_cities THEN 2 ELSE 1 END +
       -- Score transport (0-1 point)
       CASE WHEN b.public_transport_required AND transport_score > 7 THEN 1 ELSE 0 END
       as compatibility_score
FROM properties p, buyer_profiles b;
```

### **2. Analyse des Préférences par Segment**
```sql
-- Préférences moyennes par segment
SELECT 
  CASE 
    WHEN age_range = '26-35' AND family_situation = 'célibataire' THEN 'Jeunes Professionnels'
    WHEN age_range = '26-35' AND family_situation = 'couple' THEN 'Jeunes Couples'
    WHEN family_situation = 'couple_enfants' THEN 'Familles'
    WHEN family_situation = 'senior' THEN 'Seniors'
    WHEN profession LIKE '%Investisseur%' THEN 'Investisseurs'
    ELSE 'Autres'
  END as segment,
  AVG(budget_comfortable) as budget_moyen,
  AVG(min_surface) as surface_min_moyenne,
  AVG(max_surface) as surface_max_moyenne
FROM buyer_profiles
GROUP BY segment;
```

### **3. Critères d'Importance par Profil**
```sql
-- Hiérarchie des critères par profil
SELECT id, age_range, family_situation,
       price_importance,
       location_importance,
       size_importance,
       condition_importance,
       energy_importance
FROM buyer_profiles
ORDER BY 
  CASE 
    WHEN price_importance = 'très_important' THEN 1
    WHEN price_importance = 'important' THEN 2
    ELSE 3
  END,
  budget_comfortable;
```

---

## 🎯 **Utilisation par l'Agent Recommandations**

### **Questions Types à Répondre :**

1. **"Quel profil correspond le mieux à ce bien ?"**
   - Calculer score de compatibilité avec tous les profils
   - Analyser correspondance budget, taille, type, localisation
   - Identifier profils les plus compatibles

2. **"Quelles propriétés recommander à ce profil ?"**
   - Filtrer propriétés selon critères du profil
   - Pondérer selon `importance` de chaque critère
   - Classer par score de compatibilité

3. **"Comment adapter la stratégie de vente ?"**
   - Analyser `critères_importance` du profil cible
   - Mettre en avant les points forts selon le profil
   - Adapter argumentaire commercial

4. **"Quels sont les profils les plus représentés sur ce marché ?"**
   - Analyser répartition des profils par ville/région
   - Identifier segments dominants
   - Adapter stratégie marketing

5. **"Comment optimiser le matching propriété-acheteur ?"**
   - Calculer scores de compatibilité croisés
   - Identifier meilleures correspondances
   - Recommander ajustements prix/caractéristiques

### **Métriques Clés à Calculer :**

- **Score Compatibilité :** Moyenne pondérée des critères selon importance
- **Taux de Correspondance :** % de propriétés compatibles par profil
- **Segmentation Marché :** Répartition des profils par zone
- **Potentiel Négociation :** Selon `price_importance` et budget
- **Urgence Achat :** Selon profil et critères de choix

### **Recommandations Types :**

- **Match Parfait :** Score > 8/10, tous critères importants satisfaits
- **Bon Match :** Score 6-8/10, critères principaux satisfaits
- **Match Moyen :** Score 4-6/10, compromis possibles
- **Mauvais Match :** Score < 4/10, incompatibilité majeure

---

## ⚠️ **Points d'Attention**

1. **Évolution des profils :** Préférences peuvent changer selon contexte économique
2. **Flexibilité :** Certains profils peuvent s'adapter plus que d'autres
3. **Critères cachés :** Préférences non exprimées dans le profil
4. **Concurrence :** Plusieurs profils peuvent viser le même bien
5. **Évolution personnelle :** Profils peuvent évoluer (mariage, enfants, etc.)

---

## 🔗 **Interactions avec Autres Agents**

- **Agent Analyse Marché :** Profils dominants impact sur prix
- **Agent Géolocalisation :** Services selon préférences profils
- **Agent Calcul Rentabilité :** Rentabilité selon profil investisseur
- **Agent Évaluateur :** Synthèse globale incluant matching profils
