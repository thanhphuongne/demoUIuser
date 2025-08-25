// src/services/authService.ts

import { AuthUser, LoginCredentials, RegisterData } from "@/types/auth";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api';

// Token management
const TOKEN_KEY = 'auth_token';

export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  }
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = tokenManager.getToken();

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // Store the token
      if (response.token) {
        tokenManager.setToken(response.token);
      }

      // Map backend user format to frontend format
      const user: AuthUser = {
        id: response.user.id,
        name: response.user.fullName || response.user.displayName || 'User',
        email: response.user.email,
        phone: response.user.phone || '',
        avatar: response.user.profilePhotoUrl,
        loyaltyPoints: 0, // Default since not provided by API
        fullName: response.user.fullName,
        accountType: response.user.accountType === 'Customer' ? 0 : 1
      };

      return user;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Đăng nhập thất bại');
    }
  },

  register: async (data: RegisterData): Promise<AuthUser> => {
    try {
      // Map frontend data to backend API format
      const registerPayload = {
        email: data.email,
        password: data.password,
        confirmPassword: data.password, // Assuming frontend validates this
        fullName: data.name,
        accountType: 0 // Default account type based on your Postman collection
      };

      const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerPayload),
      });

      // Store the token
      if (response.token) {
        tokenManager.setToken(response.token);
      }

      // Map backend user format to frontend format
      const user: AuthUser = {
        id: response.user.id,
        name: response.user.fullName || response.user.displayName || 'User',
        email: response.user.email,
        phone: response.user.phone || data.phone,
        avatar: response.user.profilePhotoUrl,
        loyaltyPoints: 0, // Default since not provided by API
        fullName: response.user.fullName,
        accountType: response.user.accountType === 'Customer' ? 0 : 1
      };

      return user;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Đăng ký thất bại');
    }
  },

  getProfile: async (): Promise<AuthUser> => {
    try {
      const response = await apiRequest('/auth/profile', {
        method: 'GET',
      });

      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể lấy thông tin người dùng');
    }
  },

  checkAuth: async (): Promise<boolean> => {
    try {
      await apiRequest('/auth/check', {
        method: 'GET',
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  logout: (): void => {
    tokenManager.removeToken();
  }
};