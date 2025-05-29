// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  role: string | null;
  name: string | null;
  doctorId: number | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('access') || null,
  role: localStorage.getItem('role') || null,
  name: localStorage.getItem('name') || null,
  doctorId: localStorage.getItem('doctor_id')
    ? parseInt(localStorage.getItem('doctor_id')!)
    : null,

  login: async (email, password) => {
    const response = await fetch('http://localhost:8000/api/doctor/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();

    // сохранить в localStorage
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    localStorage.setItem('doctor_id', data.doctor_id);
    localStorage.setItem('name', data.name);
    localStorage.setItem('role', data.role);

    // сохранить в Zustand
    set({
      accessToken: data.access,
      role: data.role,
      name: data.name,
      doctorId: data.doctor_id,
    });
  },

  logout: () => {
    localStorage.clear();
    set({
      accessToken: null,
      role: null,
      name: null,
      doctorId: null,
    });
  },
}));
