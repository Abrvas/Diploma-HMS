import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Измените на точный URL
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;  
  }
  return config;
});

// Добавляем перехватчик для обновления токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('/api/token/refresh/', {
          refresh: refreshToken,
        });
        
        localStorage.setItem('access_token', response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        
        return api(originalRequest);
      } catch (error) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;