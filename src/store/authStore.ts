import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

// Mock user data - in real app this would come from your API
const mockUsers: Record<string, User> = {
  'admin@mediflow.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@mediflow.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    status: 'active',
    department: 'Administration',
    joinDate: '2023-01-01',
  },
  'doctor@mediflow.com': {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@mediflow.com',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150',
    status: 'active',
    department: 'Cardiology',
    specialization: 'Cardiologist',
    licenseNumber: 'MD12345',
    joinDate: '2023-01-01',
    schedule: {
      start: '09:00',
      end: '17:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
  },
  'cashier@mediflow.com': {
    id: '3',
    name: 'Emma Wilson',
    email: 'cashier@mediflow.com',
    role: 'cashier',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150&h=150',
    status: 'active',
    department: 'Finance',
    joinDate: '2023-01-01',
  },
  'director@mediflow.com': {
    id: '4',
    name: 'Michael Chen',
    email: 'director@mediflow.com',
    role: 'director',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150',
    status: 'active',
    department: 'Management',
    joinDate: '2023-01-01',
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const user = mockUsers[email.toLowerCase()];
    if (user && password === 'password') {
      set({ user, isAuthenticated: true });
      return;
    }
    throw new Error('Invalid credentials');
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  resetPassword: async (email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const user = mockUsers[email.toLowerCase()];
    if (!user) {
      throw new Error('Email not found');
    }
  },
  updateAvatar: (avatarUrl: string) => {
    set((state) => ({
      user: state.user ? { ...state.user, avatar: avatarUrl } : null,
    }));
  }
}));