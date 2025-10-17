exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const payload = JSON.parse(event.body);
    
    // Appel direct à l'API Dust (comme le test qui fonctionne)
    const dustResponse = await fetch('https://eu.dust.tt/api/v1/w/Z1YDH1d9W9/assistant/conversations', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-4a669dc7f20ff258b484bb4531960d73',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await dustResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        success: false 
      }),
    };
  }
};
