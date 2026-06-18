import axios from 'axios';

// Single Axios instance — base URL from env, falls back to local static file.
const axiosInstance = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL ?? '/',
  timeout: 15000,
  headers: { Accept: 'application/json' },
});

export default axiosInstance;
