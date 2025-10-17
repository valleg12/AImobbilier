// Configuration Dust API - Version Client 1.0
class DustServiceClient {
  constructor() {
    this.apiKey = 'sk-4a669dc7f20ff258b484bb4531960d73';
    this.workspaceId = 'Z1YDH1d9W9';
    this.agentId = 'bi2A3Fn62i'; // ID agent client
    this.dustUrl = `/.netlify/functions/dust-proxy/v1/w/${this.workspaceId}/assistant/conversations`;
  }

  async callChefOrchestre(message, signal) {
    console.log('🚀 DustServiceClient - Début appel API');
    console.log('📋 Paramètres:', {
      workspaceId: this.workspaceId,
      agentId: this.agentId,
      message: message.substring(0, 100) + '...'
    });

    try {
      const response = await fetch(this.dustUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            content: message,
            mentions: [],
            context: {
              timezone: "Europe/Paris",
              username: "client"
            }
          },
          agent: {
            agent_id: this.agentId
          }
        }),
        signal
      });

      console.log('📡 DustServiceClient - Réponse reçue:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ DustServiceClient - Erreur HTTP:', response.status, errorText);
        throw new Error(`Erreur Dust API: ${response.status} - ${errorText}`);
      }

      const data = await response.text();
      console.log('📥 DustServiceClient - Données brutes:', data);

      if (!data || data.trim() === '') {
        console.error('❌ DustServiceClient - Réponse vide');
        throw new Error('Réponse vide de l\'API Dust');
      }

      let result;
      try {
        result = JSON.parse(data);
        console.log('✅ DustServiceClient - JSON parsé:', result);
      } catch (parseError) {
        console.error('❌ DustServiceClient - Erreur parsing JSON:', parseError);
        throw new Error('Erreur parsing réponse JSON');
      }

      // Extraire le contenu de l'agent depuis la structure Dust
      let responseMessage = "Réponse reçue de l'agent Dust Client";

      try {
        console.log('🔍 DustServiceClient - Structure complète result:', JSON.stringify(result, null, 2));
        
        // Essayer toutes les structures possibles
        if (result.conversation && result.conversation.content) {
          console.log('🔍 DustServiceClient - Conversation content trouvé:', result.conversation.content);
          
          // Structure 1: result.conversation.content[1][0].content
          if (result.conversation.content[1] && result.conversation.content[1][0]) {
            const agentMessage = result.conversation.content[1][0];
            console.log('🔍 DustServiceClient - Agent message [1][0]:', JSON.stringify(agentMessage, null, 2));
            
            if (agentMessage.content) {
              responseMessage = agentMessage.content;
            } else if (agentMessage.contents && agentMessage.contents[0]) {
              if (agentMessage.contents[0].content) {
                responseMessage = agentMessage.contents[0].content.value || agentMessage.contents[0].content;
              } else if (agentMessage.contents[0].text) {
                responseMessage = agentMessage.contents[0].text;
              }
            }
          }
          
          // Structure 2: result.conversation.content[0][0].content (premier message)
          else if (result.conversation.content[0] && result.conversation.content[0][0]) {
            const agentMessage = result.conversation.content[0][0];
            console.log('🔍 DustServiceClient - Agent message [0][0]:', JSON.stringify(agentMessage, null, 2));
            
            if (agentMessage.content) {
              responseMessage = agentMessage.content;
            } else if (agentMessage.contents && agentMessage.contents[0]) {
              if (agentMessage.contents[0].content) {
                responseMessage = agentMessage.contents[0].content.value || agentMessage.contents[0].content;
              } else if (agentMessage.contents[0].text) {
                responseMessage = agentMessage.contents[0].text;
              }
            }
          }
          
          // Structure 3: Parcourir tous les messages
          else {
            console.log('🔍 DustServiceClient - Parcours de tous les messages...');
            for (let i = 0; i < result.conversation.content.length; i++) {
              const messageGroup = result.conversation.content[i];
              if (Array.isArray(messageGroup)) {
                for (let j = 0; j < messageGroup.length; j++) {
                  const msg = messageGroup[j];
                  console.log(`🔍 DustServiceClient - Message [${i}][${j}]:`, JSON.stringify(msg, null, 2));
                  
                  if (msg.content && msg.content !== message) {
                    responseMessage = msg.content;
                    break;
                  } else if (msg.contents && msg.contents[0]) {
                    if (msg.contents[0].content && msg.contents[0].content !== message) {
                      responseMessage = msg.contents[0].content.value || msg.contents[0].content;
                      break;
                    } else if (msg.contents[0].text && msg.contents[0].text !== message) {
                      responseMessage = msg.contents[0].text;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
        
        // Fallback pour autres structures
        else if (result.message && result.message.content) {
          responseMessage = result.message.content;
        } else if (result.content) {
          responseMessage = result.content;
        } else if (result.text) {
          responseMessage = result.text;
        } else if (result.assistant_message && result.assistant_message.content) {
          responseMessage = result.assistant_message.content;
        } else if (result.response && result.response.content) {
          responseMessage = result.response.content;
        } else {
          // Si on ne trouve rien, on affiche les premières lignes du JSON
          console.log('❌ DustServiceClient - Aucune structure reconnue, affichage du JSON complet');
          responseMessage = "Structure de réponse non reconnue. Réponse brute:\n" + JSON.stringify(result, null, 2).substring(0, 1000) + "...";
        }
        
        // Vérifier si on a trouvé une réponse différente du message utilisateur
        if (responseMessage === message) {
          console.log('❌ DustServiceClient - Message identique détecté, recherche alternative...');
          responseMessage = "Je n'ai pas pu extraire la réponse de l'agent. Structure de réponse:\n" + JSON.stringify(result, null, 2).substring(0, 1000) + "...";
        }
        
      } catch (parseError) {
        console.error('❌ DustServiceClient - Erreur parsing réponse agent:', parseError);
        responseMessage = "Erreur lors de l'extraction de la réponse de l'agent client";
      }

      console.log('✅ DustServiceClient - Message final:', responseMessage);

      return {
        success: true,
        message: responseMessage,
        agent_name: "Assistant Client Azura",
        timestamp: new Date().toISOString(),
        raw_result: result
      };

    } catch (error) {
      console.error('❌ DustServiceClient - Erreur complète:', error);
      
      return {
        success: false,
        message: `Erreur: ${error.message}`,
        agent_name: "Assistant Client Azura",
        timestamp: new Date().toISOString(),
        error: error.message,
        details: {
          name: error.name,
          workspaceId: this.workspaceId,
          agentId: this.agentId,
          url: this.dustUrl
        }
      };
    }
  }
}

const DustAPIClient = new DustServiceClient();
export default DustAPIClient;
