export type Role = 'doctor' | 'nurse' | 'admin' | 'director' | 'receptionist' | 'cashier';

export interface LoginResponse {
  access: string;
  refresh: string;
  doctor_id: number;
  email: string;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  photo?: string; // аватар пользователя
  position: string;
  department?: string;
  created_at: string;
}

export interface SystemSettings {
  id: string;
  name: string;
  value: string;
  description: string;
  category: string;
  updatedAt: string;
  updatedBy: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateAvatar: (avatarUrl: string) => void;
}