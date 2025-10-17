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
            mentions: [{ configurationId: this.agentId }],
            context: {
              timezone: "Europe/Paris",
              username: "Client Azura",
              email: null,
              fullName: null,
              profilePictureUrl: null
            }
          },
          blocking: true
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

      // Extraire le contenu de l'agent depuis la structure Dust (copié du DustAPI.js qui fonctionne)
      let responseMessage = "Réponse reçue de l'agent Dust Client";
      
      try {
        // Structure Dust: result.conversation.content[1][0].content
        if (result.conversation && result.conversation.content && result.conversation.content[1] && result.conversation.content[1][0]) {
          const agentMessage = result.conversation.content[1][0];
          if (agentMessage.content) {
            responseMessage = agentMessage.content;
          } else if (agentMessage.contents && agentMessage.contents[0] && agentMessage.contents[0].content) {
            responseMessage = agentMessage.contents[0].content.value || agentMessage.contents[0].content;
          }
        }
        // Fallback pour autres structures
        else if (result.message && result.message.content) {
          responseMessage = result.message.content;
        } else if (result.content) {
          responseMessage = result.content;
        } else if (result.text) {
          responseMessage = result.text;
        } else {
          // Si on ne trouve rien, on affiche les premières lignes du JSON
          responseMessage = JSON.stringify(result).substring(0, 500) + "...";
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
