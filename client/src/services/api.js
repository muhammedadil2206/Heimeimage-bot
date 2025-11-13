import axios from 'axios';

// Ensure baseURL always includes /api
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    // If URL already ends with /api, use it as is
    if (envUrl.endsWith('/api')) {
      return envUrl;
    }
    // If URL doesn't end with /api, add it
    return envUrl.endsWith('/') ? `${envUrl}api` : `${envUrl}/api`;
  }
  // Fallback for local development
  return import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // optional, if you use cookies for JWT
});

console.log('API Base URL:', api.defaults.baseURL);

export default api;

