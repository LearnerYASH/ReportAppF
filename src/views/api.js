
import axios from 'axios';
import { BASE_URL } from '../config/constant';

// Create an Axios instance with headers for CORS support
const api = axios.create({
  baseURL: 'https://spontaneous-figolla-0f6ed4.netlify.app', // Your API base URL
  headers: {
    'Content-Type': 'application/json', // Ensure the content type is set to JSON
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allow necessary HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow necessary headers
  },
});

export default api;
