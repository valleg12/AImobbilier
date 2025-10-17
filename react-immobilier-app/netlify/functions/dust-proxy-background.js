exports.handler = async (event, context) => {
  // Augmenter le timeout à 30 secondes
  context.callbackWaitsForEmptyEventLoop = false;
  
  // Vérifier que c'est une requête POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Extraire le chemin de l'URL
    const path = event.path.replace('/.netlify/functions/dust-proxy-background', '');
    const dustUrl = `https://eu.dust.tt/api${path}`;
    
    console.log('Proxying request to:', dustUrl);
    
    // Faire la requête vers l'API Dust
    const response = await fetch(dustUrl, {
      method: 'POST',
      headers: {
        'Authorization': event.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: event.body
    });

    const data = await response.text();
    console.log('Dust API response status:', response.status);
    console.log('Dust API response body:', data);
    
    // Vérifier si la réponse est valide
    if (!data || data.trim() === '') {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Empty response from Dust API' })
      };
    }
    
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: data
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
