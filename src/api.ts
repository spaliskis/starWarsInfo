import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://swapi.dev/api/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;