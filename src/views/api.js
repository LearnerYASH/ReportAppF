import axios from 'axios';


// Create an Axios instance
const api = axios.create({
  baseURL: 'http://3.108.187.6:8000', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
