# 🔗 Configuration Dust API

## 📋 Informations de connexion

```javascript
API Key: sk-2cbb2377ff6d334edc194f6cd3ce96c8
Domain: https://eu.dust.tt
Workspace ID: Z1YDH1d9W9
Agent ID: AlJDCE6I8v
```

## 🚀 Utilisation

### 1. Structure de l'API Dust

L'API Dust utilise une structure spécifique pour les appels :

```javascript
// URL de base
POST https://eu.dust.tt/api/v1/workspaces/{workspace_id}/agents/{agent_id}/runs

// Headers requis
Authorization: Bearer sk-2cbb2377ff6d334edc194f6cd3ce96c8
Content-Type: application/json

// Payload
{
  "inputs": [
    {
      "messages": [
        {
          "role": "user",
          "content": {
            "text": "Votre message ici"
          }
        }
      ]
    }
  ],
  "stream": false
}
```

### 2. Intégration dans le chatbot

Le chatbot appelle maintenant directement votre agent Dust :

```javascript
// Dans Assistant.jsx
const dustResponse = await DustAPI.callChefOrchestre(userMessage);
```

### 3. Gestion des erreurs

- **Succès** : Réponse de l'agent Dust
- **Échec** : Fallback vers réponses locales
- **Logs** : Console pour debugging

## 🔧 Configuration

### Fichiers modifiés :

1. **`src/config/dust.js`** - Configuration API
2. **`src/services/DustAPI.js`** - Service d'appel
3. **`src/pages/Assistant.jsx`** - Intégration chatbot

### Variables d'environnement (optionnel) :

```env
REACT_APP_DUST_API_KEY=sk-2cbb2377ff6d334edc194f6cd3ce96c8
REACT_APP_DUST_WORKSPACE_ID=Z1YDH1d9W9
REACT_APP_DUST_DOMAIN=https://eu.dust.tt
```

## 🧪 Test

1. Lancer l'application : `npm start`
2. Aller sur le Dashboard
3. Taper un message dans le chatbot
4. Vérifier les logs dans la console

## 📊 Réponse attendue

```javascript
{
  "success": true,
  "message": "Réponse de votre agent Dust",
  "agent_name": "Chef d'orchestre",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "dust_run_id": "run_123456"
}
```

## ⚠️ Points d'attention

1. **API Key** : Valide 10 minutes seulement
2. **Agent ID** : Vérifier que `AlJDCE6I8v` correspond exactement à l'ID de votre agent dans Dust
3. **Workspace** : S'assurer d'être dans le bon workspace
4. **CORS** : Possible restriction côté Dust

## 🔍 Debugging

Ouvrir la console du navigateur pour voir :
- Les appels API
- Les réponses Dust
- Les erreurs éventuelles
