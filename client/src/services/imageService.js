import { apiClient } from './api';

export const generateImage = async ({ prompt, style, token }) => {
  if (!token) {
    throw new Error('Authentication token is required');
  }
  
  try {
    console.log('Calling API: /image/generate');
    console.log('Request payload:', { prompt, style });
    console.log('Token present:', !!token);
    
    const response = await apiClient.post(
      '/image/generate',
      { prompt, style },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log('API response received:', {
      status: response.status,
      hasImageUrl: !!response.data?.imageUrl,
      imageUrlLength: response.data?.imageUrl?.length || 0,
    });
    
    return response.data;
  } catch (error) {
    console.error('=== Image Service Error ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Has response:', !!error.response);
    console.error('Has request:', !!error.request);
    console.error('Response status:', error.response?.status);
    console.error('Response data:', error.response?.data);
    
    // Re-throw the error (it's already formatted by the interceptor)
    throw error;
  }
};

export const fetchHistory = async (token) => {
  const { data } = await apiClient.get('/history', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

