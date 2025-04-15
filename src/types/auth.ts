export type Role = 'doctor' | 'nurse' | 'admin' | 'director' | 'receptionist' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  status?: string;
  department?: string;
  joinDate?: string;
  specialization?: string;
  licenseNumber?: string;
  schedule?: {
    start: string;
    end: string;
    days: string[];
  };
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