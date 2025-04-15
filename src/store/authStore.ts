import { create } from 'zustand';
import { AuthState, User } from '../types/auth';
import axios from 'axios';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/doctor-login/', {
        email,
        password,
      });

      const { access, refresh, doctor_id } = response.data;

      // Пример получения профиля врача по ID (опционально)
      const doctorResponse = await axios.get(`http://localhost:8000/api/doctors/${doctor_id}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const user: User = {
        id: doctor_id.toString(),
        name: doctorResponse.data.name,
        email: doctorResponse.data.email,
        role: 'doctor',
        avatar: doctorResponse.data.photo, // Убедись, что `photo` возвращается
        status: 'active',
        department: doctorResponse.data.department || 'Unknown',
        joinDate: doctorResponse.data.created_at,
        specialization: doctorResponse.data.specialization,
        licenseNumber: doctorResponse.data.licenseNumber,
        schedule: doctorResponse.data.schedule,
      };

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      set({ user, isAuthenticated: true });
    } catch (error) {
      throw new Error('Неверный email или пароль');
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, isAuthenticated: false });
  },

  resetPassword: async (email: string) => {
    // Реализуй API сброса пароля при необходимости
    console.log(`Reset password для ${email}`);
  },

  updateAvatar: (avatarUrl: string) => {
    set((state) => ({
      user: state.user ? { ...state.user, avatar: avatarUrl } : null,
    }));
  },
}));
