# 📊 Documentation Base de Données - MARKET DATA

## 🎯 **Objectif de la Base de Données**

La base de données **Market_Data** contient les données de marché immobilier pour 20 villes françaises sur 12 mois, permettant d'analyser les tendances, évolutions de prix, et dynamiques de marché.

---

## 📋 **Structure des Données**

### **Villes couvertes (20) :**
- **Paris** (75) - Marché premium
- **Lyon** (69) - Marché dynamique
- **Marseille** (13) - Marché contrasté
- **Toulouse** (31) - Marché en croissance
- **Bordeaux** (33) - Marché attractif
- **Nantes** (44) - Marché stable
- **Montpellier** (34) - Marché étudiant
- **Strasbourg** (67) - Marché transfrontalier
- **Lille** (59) - Marché industriel
- **Rennes** (35) - Marché technologique
- **Reims** (51) - Marché patrimonial
- **Le Havre** (76) - Marché portuaire
- **Saint-Étienne** (42) - Marché en reconversion
- **Toulon** (83) - Marché maritime
- **Grenoble** (38) - Marché montagnard
- **Dijon** (21) - Marché viticole
- **Angers** (49) - Marché culturel
- **Nîmes** (30) - Marché historique
- **Villeurbanne** (69) - Marché périurbain
- **Saint-Denis** (93) - Marché métropolitain

### **Période :** 12 mois consécutifs (Janvier à Décembre)

---

## 🏗️ **Description des Colonnes**

### **1. Identifiants**
- **`city`** (TEXT) : Nom de la ville
- **`month`** (INTEGER) : Mois (1-12)
- **`year`** (INTEGER) : Année (2024)

### **2. Prix et Évolution**
- **`avg_price_per_sqm`** (DECIMAL) : Prix moyen au m² en euros
  - *Gamme typique :* 2,000€ - 12,000€
  - *Paris :* 8,000€ - 12,000€
  - *Province :* 2,000€ - 4,500€
- **`price_evolution_pct`** (DECIMAL) : Évolution mensuelle en %
  - *Gamme :* -5% à +8%
  - *Saisonnalité :* Printemps (+2-4%), Hiver (-1-2%)

### **3. Volume de Transactions**
- **`transactions_count`** (INTEGER) : Nombre de transactions
  - *Gamme :* 50 - 800 transactions/mois
  - *Paris :* 400-800
  - *Province :* 50-300
- **`new_listings_count`** (INTEGER) : Nouvelles annonces
  - *Ratio typique :* 1.2-1.8x transactions

### **4. Dynamique de Marché**
- **`demand_level`** (TEXT) : Niveau de demande
  - *Valeurs :* "très_faible", "faible", "moyen", "fort", "très_fort"
- **`supply_level`** (TEXT) : Niveau d'offre
  - *Valeurs :* "très_faible", "faible", "moyen", "fort", "très_fort"
- **`market_trend`** (TEXT) : Tendance générale
  - *Valeurs :* "haussière", "baissière", "stable"

### **5. Temps de Vente**
- **`time_to_sell_avg`** (INTEGER) : Temps moyen de vente en jours
  - *Gamme :* 30 - 180 jours
  - *Paris :* 45-90 jours
  - *Province :* 60-150 jours

### **6. Fourchettes de Prix**
- **`price_range_min`** (DECIMAL) : Prix minimum observé
- **`price_range_max`** (DECIMAL) : Prix maximum observé
- **`price_pressure`** (TEXT) : Pression sur les prix
  - *Valeurs :* "baisse", "stable", "hausse_moderee", "hausse_forte"

### **7. Indicateurs de Performance**
- **`market_activity_score`** (DECIMAL) : Score d'activité (0-10)
  - *Calcul :* (transactions + nouvelles_annonces) / 100
- **`market_stability`** (TEXT) : Stabilité du marché
  - *Valeurs :* "instable", "modere", "stable", "tres_stable"
- **`growth_potential`** (TEXT) : Potentiel de croissance
  - *Valeurs :* "faible", "modere", "fort", "tres_fort"

### **8. Facteurs Contextuels**
- **`economic_indicators`** (TEXT) : Indicateurs économiques
  - *Valeurs :* "recession", "stagnation", "croissance_lente", "croissance_forte"
- **`seasonal_factor`** (DECIMAL) : Facteur saisonnier (-0.2 à +0.3)
- **`competition_level`** (TEXT) : Niveau de concurrence
  - *Valeurs :* "faible", "modere", "forte", "tres_forte"

---

## 📈 **Méthodologie d'Analyse**

### **1. Analyse de Tendance**
```sql
-- Évolution sur 12 mois
SELECT city, 
       AVG(price_evolution_pct) as evolution_moyenne,
       SUM(price_evolution_pct) as evolution_cumulee
FROM market_data 
GROUP BY city
ORDER BY evolution_cumulee DESC;
```

### **2. Comparaison Inter-Villes**
```sql
-- Prix au m² moyen par ville
SELECT city, 
       AVG(avg_price_per_sqm) as prix_moyen,
       STDDEV(avg_price_per_sqm) as volatilite
FROM market_data 
GROUP BY city
ORDER BY prix_moyen DESC;
```

### **3. Analyse Saisonnière**
```sql
-- Facteurs saisonniers par mois
SELECT month,
       AVG(price_evolution_pct) as evolution_moyenne,
       AVG(seasonal_factor) as facteur_saisonnier
FROM market_data 
GROUP BY month
ORDER BY month;
```

### **4. Indicateurs de Liquidité**
```sql
-- Temps de vente vs activité
SELECT city,
       AVG(time_to_sell_avg) as temps_moyen,
       AVG(transactions_count) as volume_moyen,
       AVG(time_to_sell_avg) / AVG(transactions_count) as ratio_liquidite
FROM market_data 
GROUP BY city;
```

---

## 🎯 **Utilisation par l'Agent Analyse Marché**

### **Questions Types à Répondre :**

1. **"Quelle est la tendance du marché à [VILLE] ?"**
   - Analyser `market_trend` et `price_evolution_pct`
   - Calculer évolution sur 12 mois
   - Identifier facteurs saisonniers

2. **"Comment évoluent les prix au m² dans cette zone ?"**
   - Comparer `avg_price_per_sqm` mois par mois
   - Calculer taux de croissance annuel
   - Identifier pics et creux

3. **"Quel est le temps de vente moyen ?"**
   - Analyser `time_to_sell_avg`
   - Corréler avec `demand_level` et `supply_level`
   - Identifier facteurs d'accélération/ralentissement

4. **"Y a-t-il des opportunités de négociation ?"**
   - Analyser `price_pressure` et `competition_level`
   - Comparer `price_range_min/max`
   - Évaluer `market_stability`

5. **"Comment se positionne ce bien par rapport au marché ?"**
   - Comparer prix du bien avec `avg_price_per_sqm`
   - Analyser position dans `price_range_min/max`
   - Évaluer attractivité selon `market_activity_score`

### **Métriques Clés à Calculer :**

- **Évolution annuelle :** `SUM(price_evolution_pct)`
- **Volatilité :** `STDDEV(price_evolution_pct)`
- **Liquidité :** `AVG(transactions_count) / AVG(time_to_sell_avg)`
- **Équilibre offre/demande :** `demand_level` vs `supply_level`
- **Score attractivité :** `(market_activity_score + growth_potential) / 2`

### **Recommandations Types :**

- **Marché haussier :** Négociation limitée, prix ferme
- **Marché baissier :** Négociation possible, prix flexible
- **Marché équilibré :** Négociation modérée, prix de marché
- **Fortes transactions :** Vente rapide probable
- **Faibles transactions :** Vente plus longue

---

## ⚠️ **Points d'Attention**

1. **Saisonnalité :** Toujours corriger avec `seasonal_factor`
2. **Volatilité :** Considérer `market_stability` dans les prévisions
3. **Contexte économique :** Intégrer `economic_indicators`
4. **Concurrence :** Adapter stratégie selon `competition_level`
5. **Données récentes :** Privilégier les derniers mois pour l'actualité

---

## 🔗 **Interactions avec Autres Agents**

- **Agent Géolocalisation :** Données de localisation pour affiner l'analyse
- **Agent Calcul Rentabilité :** Prix de marché pour calculs de rentabilité
- **Agent Recommandations :** Tendance marché pour conseils acheteurs
- **Agent Évaluateur :** Synthèse globale incluant analyse marché
