// src/services/authService.ts

import { AuthUser, LoginCredentials, RegisterData } from "@/types/auth";
import { MOCK_USERS } from "@/data/auth";

// Simulate API call delay
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    await simulateApiDelay();
    
    // Tìm user theo email
    const user = MOCK_USERS.find(u => u.email === credentials.email);
    
    // Validate credentials
    if (!user || user.password !== credentials.password) {
      throw new Error('Email hoặc mật khẩu không đúng');
    }
    
    // Trả về user không bao gồm password
    const { password, ...safeUser } = user;
    return safeUser;
  },
  
  register: async (data: RegisterData): Promise<AuthUser> => {
    await simulateApiDelay();
    
    // Kiểm tra email đã tồn tại
    const emailExists = MOCK_USERS.some(u => u.email === data.email);
    if (emailExists) {
      throw new Error('Email đã được sử dụng');
    }
    
    // Tạo user mới
    const newUser: AuthUser = {
      id: (MOCK_USERS.length + 1).toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      loyaltyPoints: 0,
    };
    
    // Trong ứng dụng thực, đây sẽ là nơi gọi API
    return newUser;
  }
};