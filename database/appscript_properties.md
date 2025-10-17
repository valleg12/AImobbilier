# 🏠 AppScript - Création Table Properties

## 📋 **Prompt AppScript pour Table Properties**

Voici le prompt à copier-coller dans AppScript pour créer la première base de données :

```
Crée une feuille Google Sheets nommée "Properties" avec les colonnes suivantes et 100 lignes de données réalistes :

COLONNES :
- id (ex: PROP_001, PROP_002, etc.)
- address (adresses complètes françaises)
- city (Paris, Lyon, Marseille, Toulouse, Nice, Nantes, Montpellier, Strasbourg, Bordeaux, Lille, Rennes, Reims, Saint-Étienne, Le Havre, Toulon, Grenoble, Dijon, Angers, Nîmes, Villeurbanne)
- postal_code (codes postaux français correspondants)
- department (nom du département)
- region (nom de la région)
- latitude (coordonnées GPS réelles)
- longitude (coordonnées GPS réelles)
- property_type (appartement, maison, studio, loft, duplex)
- surface_living (30 à 200 m²)
- surface_total (surface_living + 10 à 50 m²)
- rooms_count (2 à 8 pièces)
- bedrooms_count (1 à 6 chambres)
- bathrooms_count (1 à 4 salles de bain)
- floor_level (0 à 10)
- floors_total (2 à 15)
- construction_year (1960 à 2023)
- renovation_year (2010 à 2023, ou vide si pas de rénovation)
- condition_level (neuf, excellent, bon, moyen, à_renover)
- energy_class (A, B, C, D, E, F, G)
- ghg_emissions (A, B, C, D, E, F, G)
- has_elevator (TRUE/FALSE)
- has_balcony (TRUE/FALSE)
- has_terrace (TRUE/FALSE)
- has_garden (TRUE/FALSE)
- has_parking (TRUE/FALSE)
- has_storage (TRUE/FALSE)
- price_estimate (150000 à 1500000 €)
- price_per_sqm (calculé automatiquement)
- price_range_min (price_estimate - 10%)
- price_range_max (price_estimate + 10%)
- market_demand_level (très_faible, faible, moyen, fort, très_fort)
- time_to_sell_estimate (15 à 120 jours)
- data_source (leboncoin, seloger, pap, orpi, century21)
- confidence_score (0.70 à 0.95)

DISTRIBUTION DES 100 PROPRIÉTÉS :
- 20 appartements Paris (75001-75020)
- 15 maisons banlieue parisienne (92, 93, 94)
- 10 studios Paris centre
- 10 lofts Paris 11e et 19e
- 15 appartements Lyon (69001-69009)
- 10 maisons Marseille (13001-13016)
- 10 appartements Bordeaux (33000-33080)
- 10 appartements Toulouse (31000-31500)

CONTRAINTES :
- Les prix doivent être cohérents avec la localisation (Paris plus cher que province)
- Les surfaces doivent correspondre au nombre de pièces
- Les coordonnées GPS doivent être réalistes pour chaque adresse
- Les énergies classes doivent être cohérentes avec l'âge du bien
- Les équipements doivent être logiques (ascenseur si > 4 étages)
- Les prix au m² doivent être dans la fourchette du marché local

Génère des données réalistes et cohérentes pour chaque propriété.
```

## 🎯 **Vérifications à Faire**

Une fois la feuille créée, vérifiez que :
- ✅ **100 lignes** de données générées
- ✅ **Toutes les colonnes** sont remplies
- ✅ **Prix cohérents** avec la localisation
- ✅ **Coordonnées GPS** réalistes
- ✅ **Relations logiques** (surface/pièces, prix/m²)
- ✅ **Variété** dans les types et localisations

## ✅ **Validation**

Dites-moi **"OK la BDD Properties est créée"** et je validerai sur le fichier checklist pour passer à la suivante !

---

**Prêt à créer la première base de données ?** 🚀
