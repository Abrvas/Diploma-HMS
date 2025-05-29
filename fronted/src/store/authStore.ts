import { create } from 'zustand';
import api from '../utils/api';
import { LoginResponse, User } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateAvatar: (avatarUrl: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      console.log('Отправка запроса авторизации...');
      const response = await api.post<LoginResponse>('/doctor/login/', {
        email,
        password,
      });
      console.log('Ответ сервера:', response.data);

      const { access, refresh, doctor_id } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Обновляем URL для получения данных пользователя
      const userResponse = await api.get<User>(`/staff-user/${doctor_id}/`);

      set({ 
        user: userResponse.data,
        isAuthenticated: true 
      });
    } catch (error: any) {
      console.error('Ошибка авторизации:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, isAuthenticated: false });
  },
  resetPassword: async (email: string) => {
    try {
      await api.post(`/reset-password/`, { email });
    } catch (error: any) {
      console.error('Ошибка сброса пароля:', error.response?.data || error.message);
      throw error;
    }
  },
  updateAvatar: (avatarUrl: string) => {
    set((state) => ({
      user: state.user ? { ...state.user, avatar: avatarUrl } : null,
    }));
  }
}));