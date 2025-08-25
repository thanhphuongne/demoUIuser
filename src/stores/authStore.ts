// src/stores/authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore, LoginCredentials, RegisterData } from "@/types/auth";
import { authService, tokenManager } from "@/services/authService";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      authMode: 'login',
      loading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ loading: true, error: null });
        try {
          const user = await authService.login(credentials);
          set({
            user,
            isAuthenticated: true,
            loading: false,
            error: null
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Đăng nhập thất bại',
            isAuthenticated: false,
            user: null
          });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ loading: true, error: null });
        try {
          const user = await authService.register(data);
          set({
            user,
            isAuthenticated: true,
            loading: false,
            error: null
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Đăng ký thất bại',
            isAuthenticated: false,
            user: null
          });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          loading: false
        });
      },

      checkAuth: async () => {
        const token = tokenManager.getToken();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        set({ loading: true });
        try {
          const isValid = await authService.checkAuth();
          if (isValid) {
            // Get user profile if auth is valid
            const user = await authService.getProfile();
            set({
              user,
              isAuthenticated: true,
              loading: false,
              error: null
            });
          } else {
            // Token is invalid, clear it
            authService.logout();
            set({
              user: null,
              isAuthenticated: false,
              loading: false
            });
          }
        } catch (error) {
          // Token is invalid or network error
          authService.logout();
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null // Don't show error for silent auth check
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);