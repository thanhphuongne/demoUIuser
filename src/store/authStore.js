import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  showAuthModal: false,
  authMode: 'login',
  
  login: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      name: 'Nguyễn Văn An',
      email: email,
      phone: '+84 123 456 789',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      loyaltyPoints: 250,
      favoritesSports: ['football', 'badminton']
    };
    
    set({ user: mockUser, isAuthenticated: true, showAuthModal: false });
  },
  
  register: async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      name: data.name,
      email: data.email,
      phone: data.phone,
      loyaltyPoints: 0,
      favoritesSports: []
    };
    
    set({ user: mockUser, isAuthenticated: true, showAuthModal: false });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  toggleAuthModal: (mode = 'login') => {
    set(state => ({ 
      showAuthModal: !state.showAuthModal, 
      authMode: mode 
    }));
  }
}));