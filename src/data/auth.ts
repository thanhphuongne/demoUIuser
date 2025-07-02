// src/data/auth.ts

import { AuthUser, RegisterData } from "@/types/auth";

// Mock user data với mật khẩu riêng
export const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    email: 'user1@example.com',
    phone: '+84 123 456 789',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    loyaltyPoints: 250,
    password: 'pass123'
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    email: 'user2@example.com',
    phone: '+84 987 654 321',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    loyaltyPoints: 150,
    password: 'abc@456'
  },
  {
    id: '3',
    name: 'Lê Văn Cường',
    email: 'user3@example.com',
    phone: '+84 555 666 777',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    loyaltyPoints: 500,
    password: 'qwerty789'
  },
];