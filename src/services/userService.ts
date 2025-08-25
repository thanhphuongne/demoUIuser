// src/services/userService.ts

import { tokenManager } from './authService';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api';

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

// Types for user API
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  accountType?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const userService = {
  // Get all users (might be admin only)
  getAllUsers: async (): Promise<User[]> => {
    try {
      return await apiRequest('/user');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể lấy danh sách người dùng');
    }
  },
};

// Health check service
export const healthService = {
  checkHealth: async (): Promise<{ status: string; timestamp: string }> => {
    try {
      const response = await fetch('https://localhost:5001/health');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể kiểm tra trạng thái hệ thống');
    }
  },
};
