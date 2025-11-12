import { apiClient } from '../services/api';

/**
 * Check if the backend server is running and accessible
 */
export const checkServerHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return {
      isHealthy: response.status === 200,
      message: 'Server is running',
      data: response.data,
    };
  } catch (error) {
    console.error('Server health check failed:', error);
    return {
      isHealthy: false,
      message: error.message || 'Cannot reach server',
      error: error.code || 'UNKNOWN',
    };
  }
};

