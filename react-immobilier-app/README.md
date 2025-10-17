# 🏠 AI Immobilier - Application Professionnelle IA

Application React moderne pour agents immobiliers utilisant 8 agents IA Dust spécialisés.

## 🎯 Fonctionnalités

### 📱 Interface 6 Sections
- **Analyse Locative** - Optimisation rentabilité locative
- **Évaluation Vente** - Maximisation valeur et accélération ventes  
- **Accompagnement Achat** - Guide clients vers meilleurs choix
- **Comptes Rendus** - Emails automatiques quotidiens à 9h
- **Assistant IA** - Chatbot spécialisé pour agents
- **Assistant Client** - Interface conversationnelle pour clients

### 🤖 8 Agents IA Spécialisés
1. **Agent Analyse Marché** - Tendances et prix
2. **Agent Géolocalisation** - Qualité de vie et services
3. **Agent Calcul Rentabilité** - ROI et fiscalité
4. **Agent Énergie** - Audit énergétique et DPE
5. **Agent Analyse Photos** - Détection défauts et état
6. **Agent Recommandations** - Matching propriété-acheteur
7. **Agent Dossier Achat** - Accompagnement complet
8. **Agent Évaluateur** - Synthèse globale et recommandations

### 🎨 Design Écru Élégant
- Palette de couleurs écru sophistiquée
- Interface moderne et professionnelle
- Responsive design pour tous écrans
- Animations fluides et transitions

## 🚀 Installation

```bash
# Cloner le projet
cd react-immobilier-app

# Installer les dépendances
npm install

# Lancer en développement
npm start

# Build de production
npm run build
```

## 📊 Données

L'application utilise 10 bases de données Google Sheets :
- Properties (100 propriétés)
- Market Data (240 entrées)
- Nearby Services (100 services)
- Transport Accessibility (100 scores)
- Financial Analysis (100 analyses)
- Energy Analysis (100 audits)
- Property Photos (500 photos)
- Property Defects (150 défauts)
- Buyer Profiles (20 profils)
- AI Analysis Results (200 résultats)

## 🔧 Configuration

### Variables d'environnement
```env
REACT_APP_DUST_API_URL=https://dust.tt/api/v1
REACT_APP_DUST_API_KEY=your_api_key_here
```

### Connexion aux agents Dust
Les agents sont configurés avec des prompts optimisés et des connexions aux bases de données.

## 📱 Utilisation

1. **Vue Agent** : Outils professionnels d'analyse
2. **Vue Client** : Interface conversationnelle simple
3. **Sélection des agents** : Choisir les agents pertinents
4. **Saisie des informations** : Propriété et photos
5. **Analyse automatique** : Appel aux agents Dust
6. **Résultats structurés** : Rapports professionnels
7. **Export PDF** : Génération de rapports clients
8. **Comptes rendus** : Emails automatiques quotidiens

## 🎨 Palette de Couleurs

```css
--primary-ecru: #f5f5dc
--secondary-ecru: #f8f6f0  
--accent-ecru: #f0ede5
--text-dark: #2c2c2c
--text-medium: #5a5a5a
--text-light: #8a8a8a
--border-ecru: #e8e4d8
```

## 📦 Technologies

- **React 18** - Interface utilisateur
- **React Router** - Navigation
- **Lucide React** - Icônes
- **Framer Motion** - Animations
- **Axios** - API calls
- **jsPDF** - Génération PDF
- **React Dropzone** - Upload photos

## 🔄 Workflow

**Vue Agent :**
1. Agent immobilier accède à l'application
2. Sélectionne l'outil approprié (Analyse Locative/Évaluation Vente/Accompagnement Achat)
3. Choisit les agents IA pertinents
4. Saisit les informations de la propriété
5. Upload des photos si nécessaire
6. Lance l'analyse automatique
7. Consulte les résultats structurés
8. Génère un rapport PDF professionnel
9. Consulte les comptes rendus automatiques

**Vue Client :**
1. Client accède via le toggle
2. Interface conversationnelle simple
3. Assistant IA comprend les besoins
4. Recherche automatique dans la base
5. Propositions personnalisées
6. Accompagnement complet

## 📈 Avantages

- **Rapidité** : Analyses en quelques minutes
- **Précision** : Données réelles et actualisées
- **Professionnalisme** : Rapports structurés et visuels
- **Personnalisation** : Agents adaptés au contexte
- **Efficacité** : Gain de temps considérable

## 🎯 Public Cible

**Agents immobiliers professionnels** cherchant à :
- Optimiser leurs analyses
- Gagner en efficacité
- Proposer des services premium
- Se différencier sur le marché

---

*Développé avec ❤️ pour les professionnels de l'immobilier*
