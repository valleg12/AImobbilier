// Proxy côté serveur pour contourner CORS
export const proxyDustRequest = async (payload) => {
  const response = await fetch('/api/dust-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    throw new Error(`Proxy error: ${response.status}`);
  }
  
  return response.json();
};
