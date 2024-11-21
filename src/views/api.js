// src/services/api.js
import axios from 'axios';
import { BASE_URL } from '../config/constant';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://spontaneous-figolla-0f6ed4.netlify.app/api', // Your API base URL
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

