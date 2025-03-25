import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://rphkpzbmj5.us-east-1.awsapprunner.com/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;
