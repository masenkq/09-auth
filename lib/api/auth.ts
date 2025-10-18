import axios from 'axios';

const BASE_URL = 'https://notehub-api.goit.study';

export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
  },

  register: async (userData: { email: string; password: string }) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${BASE_URL}/auth/logout`);
    return response.data;
  },

  getSession: async () => {
    const response = await axios.get(`${BASE_URL}/auth/session`);
    return response.data;
  },
};