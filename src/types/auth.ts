// src/types/auth.ts

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    loyaltyPoints: number;
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
  
  export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    authMode: 'login' | 'register';
  }
  
  export interface AuthActions {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
  }
  
  export type AuthStore = AuthState & AuthActions;