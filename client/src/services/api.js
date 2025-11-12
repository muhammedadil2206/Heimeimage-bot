import axios from 'axios';

// In production (same domain), use relative path. In dev or if VITE_API_BASE_URL is set, use that.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

console.log('API Base URL:', API_BASE_URL);

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes timeout for image generation
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to log all requests
apiClient.interceptors.request.use(
  (config) => {
    console.log('=== API Request ===');
    console.log('URL:', config.baseURL + config.url);
    console.log('Method:', config.method?.toUpperCase());
    console.log('Headers:', Object.keys(config.headers || {}));
    console.log('Has Auth Header:', !!config.headers?.Authorization);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('=== API Response ===');
    console.log('Status:', response.status);
    console.log('URL:', response.config.url);
    return response;
  },
  (error) => {
    console.error('=== API Error ===');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    
    // Network error (no response from server)
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server took too long to respond');
      return Promise.reject(new Error('Request timeout. The server took too long to respond. Please try again.'));
    }
    
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error('Network error - cannot reach server');
      console.error('Request URL:', error.config?.url);
      console.error('Base URL:', error.config?.baseURL);
      console.error('Full URL:', error.config?.baseURL + error.config?.url);
      return Promise.reject(new Error(`Cannot connect to server. Please make sure the backend is running on ${API_BASE_URL}. Error: ${error.message}`));
    }
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused - server is not running or wrong URL');
      return Promise.reject(new Error(`Cannot connect to server at ${API_BASE_URL}. Please check if the backend is running and the URL is correct.`));
    }
    
    // Server responded with error status
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      // Handle 401 Unauthorized - token is invalid or expired
      if (error.response.status === 401) {
        const errorMessage = error.response?.data?.message || 'Invalid or expired token';
        console.error('401 Unauthorized - Token is invalid or expired');
        
        // Clear invalid token from localStorage
        try {
          localStorage.removeItem('heimage_auth');
          console.log('Cleared invalid token from localStorage');
        } catch (storageError) {
          console.error('Failed to clear localStorage:', storageError);
        }
        
        // Return a specific error that can be handled by the app
        return Promise.reject(new Error('SESSION_EXPIRED'));
      }
      
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        `Server error: ${error.response.status} ${error.response.statusText}`;
      return Promise.reject(new Error(message));
    }
    
    // Request was made but no response received
    if (error.request) {
      console.error('No response received from server');
      console.error('Request config:', error.config);
      return Promise.reject(new Error('No response from server. Please check if the backend is running.'));
    }
    
    // Something else happened
    const message = error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

