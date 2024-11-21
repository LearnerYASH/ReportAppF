// src/services/api.js
import axios from 'axios';
import { BASE_URL } from '../config/constant';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://spontaneous-figolla-0f6ed4.netlify.app/', // Your API base URL
});

// Add a request interceptor to include the token


export default api;

