// src/stores/authStore.ts

import { create } from 'zustand';
import { AuthStore, LoginCredentials, RegisterData } from "@/types/auth";
import { authService } from "@/services/authService";

export const useAuthStore = create<AuthStore>((set) => ({
  // State
  user: null,
  isAuthenticated: false,
  authMode: 'login',
  
  // Actions
  login: async (credentials: LoginCredentials) => {
    try {
      const user = await authService.login(credentials);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },
  
  register: async (data: RegisterData) => {
    try {
      const user = await authService.register(data);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
}));