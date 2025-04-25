import axios from 'axios';
import env from '../config/env.config';

const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Authorization': `Bearer ${env.apiKey}`,
    'Content-Type': 'application/json',
  },
});

export const fetchResources = async () => {
  try {
    const response = await api.get('/resources');
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

export default api; 