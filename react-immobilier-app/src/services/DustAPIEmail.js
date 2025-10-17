// Configuration Dust API - Version Email 1.0
class DustServiceEmail {
  constructor() {
    this.apiKey = 'sk-4a669dc7f20ff258b484bb4531960d73';
    this.workspaceId = 'Z1YDH1d9W9';
    this.agentId = 'YX4V29pLKw'; // ID agent email
    this.dustUrl = `/.netlify/functions/dust-proxy/v1/w/${this.workspaceId}/assistant/conversations`;
  }

  async callChefOrchestre(userMessage, signal, conversationId = null) {
    console.log('🚀 DustServiceEmail - Début appel API');
    console.log('📋 Paramètres:', {
      workspaceId: this.workspaceId,
      agentId: this.agentId,
      message: userMessage.substring(0, 100) + '...'
    });

    // Structure API Dust avec fonction Netlify (sans CORS)
    const dustUrl = `/.netlify/functions/dust-proxy/v1/w/${this.workspaceId}/assistant/conversations`;
    
    try {

      // Payload EXACT comme le test qui fonctionne
      const dustPayload = {
        message: {
          content: userMessage,
          mentions: [{ configurationId: this.agentId }],
          context: {
            timezone: "Europe/Paris",
            username: "Agent Email",
            email: null,
            fullName: null,
            profilePictureUrl: null
          }
        },
        blocking: true
      };

      if (conversationId) {
        dustPayload.conversationId = conversationId;
      }

      console.log('📝 Appel API Dust Email:', { 
        url: dustUrl, 
        payload: dustPayload,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        workspaceId: this.workspaceId,
        agentId: this.agentId
      });

            const dustResponse = await fetch(dustUrl, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dustPayload),
              signal
            });

      console.log('📡 Réponse Dust Email:', {
        status: dustResponse.status,
        statusText: dustResponse.statusText,
        ok: dustResponse.ok
      });

            if (!dustResponse.ok) {
              const errorText = await dustResponse.text();
              console.error('❌ Erreur Dust API Email:', {
                status: dustResponse.status,
                statusText: dustResponse.statusText,
                errorText,
                headers: Object.fromEntries(dustResponse.headers.entries())
              });
              throw new Error(`Erreur Dust API: ${dustResponse.status} - ${errorText}`);
            }

            // Vérifier si la réponse est vide
            const responseText = await dustResponse.text();
            console.log('📄 Réponse brute Dust Email:', responseText);
            
            if (!responseText || responseText.trim() === '') {
              throw new Error('Réponse vide de l\'API Dust');
            }
            
            let result;
            try {
              result = JSON.parse(responseText);
            } catch (parseError) {
              console.error('❌ Erreur parsing JSON Email:', parseError);
              console.error('📄 Texte reçu:', responseText);
              throw new Error(`Erreur parsing JSON: ${parseError.message}`);
            }

      console.log('✅ Résultat Dust Email complet:', result);

      // Extraire le contenu de l'agent depuis la structure Dust (copié du DustAPI.js qui fonctionne)
      let responseMessage = "Réponse reçue de l'agent Dust Email";
      
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
        console.error('❌ Erreur parsing réponse agent Email:', parseError);
        responseMessage = "Erreur lors de l'extraction de la réponse de l'agent email";
      }
      
      console.log('📤 Message final envoyé Email:', responseMessage);
      console.log('📊 Structure complète result Email:', result);
      
      return {
        success: true,
        message: responseMessage,
        agent_name: 'Assistant Email',
        timestamp: new Date().toISOString(),
        conversation_id: result.conversationId || null,
        raw_result: result
      };

    } catch (error) {
      console.error('❌ Erreur Dust API Email détaillée:', {
        error: error,
        message: error.message,
        name: error.name,
        stack: error.stack,
        url: dustUrl,
        workspaceId: this.workspaceId,
        agentId: this.agentId
      });
      
      return {
        success: false,
        message: `Erreur: ${error.message}`,
        agent_name: 'Assistant Email',
        timestamp: new Date().toISOString(),
        error: error.message,
        details: {
          name: error.name,
          workspaceId: this.workspaceId,
          agentId: this.agentId,
          url: dustUrl
        }
      };
    }
  }
}

const DustAPIEmail = new DustServiceEmail();
export default DustAPIEmail;
