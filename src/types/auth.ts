// src/types/auth.ts

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    loyaltyPoints?: number;
    fullName?: string; // Backend might return fullName instead of name
    accountType?: number;
  }

  export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
  }

  export interface LoginCredentials {
    email: string;
    password: string;
  }

  // API Response types
  export interface LoginResponse {
    token: string;
    user?: AuthUser;
    // Backend might return user data directly or require separate profile call
  }

  export interface RegisterResponse {
    token: string;
    user?: AuthUser;
  }

  export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    authMode: 'login' | 'register';
    loading: boolean;
    error: string | null;
  }

  export interface AuthActions {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
    clearError: () => void;
  }

  export type AuthStore = AuthState & AuthActions;