# 💰 Documentation Base de Données - FINANCIAL ANALYSIS

## 🎯 **Objectif de la Base de Données**

La base de données **Financial_Analysis** contient les analyses financières détaillées pour 100 propriétés, permettant de calculer la rentabilité, le ROI, et d'optimiser les stratégies d'investissement immobilier.

---

## 📋 **Structure des Données**

### **Propriétés couvertes :** 100 propriétés (PROP_001 à PROP_100)
### **Scénarios analysés :** Achat cash, crédit, investissement locatif, revente

---

## 🏗️ **Description des Colonnes**

### **1. Identifiants**
- **`property_id`** (TEXT) : ID de la propriété (PROP_001 à PROP_100)
- **`property_type`** (TEXT) : Type de bien (appartement, maison, studio, loft, duplex)
- **`surface_living`** (DECIMAL) : Surface habitable en m²

### **2. Prix et Financement**
- **`purchase_price`** (DECIMAL) : Prix d'achat en euros
  - *Gamme :* 150,000€ - 1,200,000€
- **`market_value`** (DECIMAL) : Valeur de marché estimée
  - *Gamme :* 140,000€ - 1,100,000€
- **`loan_amount`** (DECIMAL) : Montant emprunté
  - *Gamme :* 0€ - 960,000€ (80% max)
- **`down_payment`** (DECIMAL) : Apport personnel
  - *Gamme :* 30,000€ - 240,000€ (20% min)

### **3. Crédit Immobilier**
- **`interest_rate`** (DECIMAL) : Taux d'intérêt annuel
  - *Gamme :* 2.5% - 4.5%
- **`loan_term_years`** (INTEGER) : Durée du crédit en années
  - *Gamme :* 15-25 ans
- **`monthly_payment`** (DECIMAL) : Mensualité de crédit
  - *Gamme :* 800€ - 4,500€
- **`total_interest_paid`** (DECIMAL) : Intérêts totaux sur la durée
  - *Gamme :* 25,000€ - 180,000€

### **4. Charges et Coûts**
- **`property_tax_annual`** (DECIMAL) : Taxe foncière annuelle
  - *Gamme :* 800€ - 3,500€
- **`insurance_annual`** (DECIMAL) : Assurance habitation annuelle
  - *Gamme :* 300€ - 1,200€
- **`maintenance_annual`** (DECIMAL) : Maintenance annuelle
  - *Gamme :* 1,000€ - 4,000€
- **`condo_fees_monthly`** (DECIMAL) : Charges copropriété mensuelles
  - *Gamme :* 0€ - 400€ (appartements)

### **5. Investissement Locatif**
- **`rental_income_monthly`** (DECIMAL) : Loyer mensuel potentiel
  - *Gamme :* 600€ - 3,500€
- **`rental_yield_gross`** (DECIMAL) : Rendement locatif brut
  - *Gamme :* 2.5% - 6.8%
- **`rental_yield_net`** (DECIMAL) : Rendement locatif net
  - *Gamme :* 1.8% - 5.2%
- **`vacancy_rate`** (DECIMAL) : Taux de vacance estimé
  - *Gamme :* 2% - 8%

### **6. Fiscalité**
- **`tax_regime`** (TEXT) : Régime fiscal (LMNP, Pinel, Déclaration)
- **`tax_savings_annual`** (DECIMAL) : Économies fiscales annuelles
  - *Gamme :* 0€ - 8,000€
- **`depreciation_annual`** (DECIMAL) : Amortissement annuel
  - *Gamme :* 0€ - 15,000€

### **7. Scénarios Financiers**
- **`scenario_5_years_profit`** (DECIMAL) : Profit sur 5 ans
  - *Gamme :* -15,000€ à +120,000€
- **`scenario_10_years_profit`** (DECIMAL) : Profit sur 10 ans
  - *Gamme :* -10,000€ à +280,000€
- **`break_even_months`** (INTEGER) : Point d'équilibre en mois
  - *Gamme :* 12-60 mois

### **8. Métriques de Performance**
- **`roi_annual`** (DECIMAL) : ROI annuel
  - *Gamme :* 1.5% - 8.5%
- **`cash_flow_monthly`** (DECIMAL) : Cash-flow mensuel
  - *Gamme :* -800€ à +1,200€
- **`leverage_ratio`** (DECIMAL) : Ratio de levier financier
  - *Gamme :* 0 (cash) à 4.0
- **`risk_score`** (DECIMAL) : Score de risque (0-10)
  - *Calcul :* Basé sur volatilité et liquidité

---

## 📈 **Méthodologie d'Analyse**

### **1. Calcul du ROI**
```sql
-- ROI annuel net
SELECT property_id,
       (rental_yield_net + (scenario_5_years_profit / 5 / purchase_price * 100)) as roi_annual_complet
FROM financial_analysis;
```

### **2. Analyse de Rentabilité**
```sql
-- Classement par rentabilité
SELECT property_id,
       CASE 
         WHEN rental_yield_net >= 5 THEN 'Très rentable'
         WHEN rental_yield_net >= 3.5 THEN 'Rentable'
         WHEN rental_yield_net >= 2.5 THEN 'Moyennement rentable'
         ELSE 'Peu rentable'
       END as rentabilite_class
FROM financial_analysis
ORDER BY rental_yield_net DESC;
```

### **3. Optimisation Fiscal**
```sql
-- Impact des régimes fiscaux
SELECT tax_regime,
       AVG(tax_savings_annual) as economie_moyenne,
       AVG(rental_yield_net) as rendement_moyen
FROM financial_analysis
GROUP BY tax_regime;
```

### **4. Analyse de Risque**
```sql
-- Propriétés à risque
SELECT property_id,
       cash_flow_monthly,
       risk_score,
       CASE 
         WHEN cash_flow_monthly < 0 AND risk_score > 7 THEN 'Risque élevé'
         WHEN cash_flow_monthly < 0 OR risk_score > 5 THEN 'Risque modéré'
         ELSE 'Risque faible'
       END as niveau_risque
FROM financial_analysis;
```

---

## 🎯 **Utilisation par l'Agent Calcul Rentabilité**

### **Questions Types à Répondre :**

1. **"Quelle est la rentabilité de cet investissement ?"**
   - Analyser `rental_yield_gross` et `rental_yield_net`
   - Calculer ROI sur différentes périodes
   - Comparer avec benchmarks marché

2. **"Combien coûte réellement cette propriété par mois ?"**
   - Calculer coût total : `monthly_payment` + charges + maintenance
   - Analyser `cash_flow_monthly`
   - Identifier coûts cachés

3. **"Quel régime fiscal choisir ?"**
   - Comparer `tax_regime` et `tax_savings_annual`
   - Analyser impact sur `rental_yield_net`
   - Recommander optimisation fiscale

4. **"Quand serai-je rentable ?"**
   - Analyser `break_even_months`
   - Calculer `scenario_5_years_profit` et `scenario_10_years_profit`
   - Identifier facteurs d'accélération

5. **"Quel est le niveau de risque ?"**
   - Évaluer `risk_score` et `leverage_ratio`
   - Analyser `cash_flow_monthly` et `vacancy_rate`
   - Recommander stratégies de réduction de risque

### **Métriques Clés à Calculer :**

- **Rendement Brut :** `(rental_income_monthly * 12) / purchase_price * 100`
- **Rendement Net :** `((rental_income_monthly - charges_mensuelles) * 12) / purchase_price * 100`
- **Cash-Flow :** `rental_income_monthly - monthly_payment - charges_mensuelles`
- **ROI Total :** `(profit_total + économies_fiscales) / apport_initial * 100`
- **Effet de Levier :** `roi_avec_credit / roi_sans_credit`

### **Recommandations Types :**

- **Excellent investissement :** ROI > 6%, cash-flow > 200€/mois
- **Bon investissement :** ROI 4-6%, cash-flow positif
- **Investissement moyen :** ROI 2.5-4%, cash-flow proche de zéro
- **Investissement risqué :** ROI < 2.5%, cash-flow négatif

---

## ⚠️ **Points d'Attention**

1. **Évolution des taux :** Les calculs basés sur taux actuels
2. **Vacance locative :** Taux estimé, ajuster selon marché local
3. **Coûts de maintenance :** Estimations moyennes, prévoir imprévus
4. **Fiscalité :** Réglementation actuelle, vérifier évolutions
5. **Liquidité :** Temps de vente non pris en compte dans ROI

---

## 🔗 **Interactions avec Autres Agents**

- **Agent Analyse Marché :** Prix de marché pour calculs de rentabilité
- **Agent Géolocalisation :** Localisation impact sur loyers
- **Agent Recommandations :** Rentabilité selon profil investisseur
- **Agent Évaluateur :** Synthèse globale incluant performance financière
