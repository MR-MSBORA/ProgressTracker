import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request Interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔴 If unauthorized → logout
    if (error.response?.status === 401) {
      localStorage.removeItem('token');

      // avoid infinite redirect loop
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;