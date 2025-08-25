// src/hooks/useAuthInit.ts

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const useAuthInit = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication status on app initialization
    checkAuth();
  }, [checkAuth]);
};
