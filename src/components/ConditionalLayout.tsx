'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuthInit } from '@/hooks/useAuthInit';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Initialize authentication on app startup
  useAuthInit();

  // Define routes that should not have Header and Footer
  const authRoutes = ['/login', '/register', '/forgot-password'];
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};