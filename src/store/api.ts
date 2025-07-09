// src/store/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 👈 from your .env
  withCredentials: true, // optional if your backend needs cookies
});

export default api;
