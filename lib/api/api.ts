import axios from 'axios';

// Для клієнтських запитів використовуємо безпосередньо бекенд API
const API_BASE_URL = 'https://notehub-api.goit.study';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Інтерсептор для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);