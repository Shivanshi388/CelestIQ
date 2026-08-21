import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; role: string } | null;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // Auto-logged in for this demo
  user: {
    name: 'Mission Control',
    role: 'Admin',
  },
  login: () => set({ isAuthenticated: true, user: { name: 'Mission Control', role: 'Admin' } }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
