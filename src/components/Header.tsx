'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, 
  User, 
  Calendar, 
  Users, 
  Search, 
  X,
  Gift,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname(); 
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = () => {
      setUserMenuOpen(false);
      setMobileMenuOpen(false);
    };

    if (mobileMenuOpen || userMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen, userMenuOpen]);
  
  const navigation = [
    { name: 'Trang chủ', href: '/', icon: Home },
    { name: 'Đặt sân', href: '/booking', icon: Calendar },
    { name: 'Tìm đội', href: '/teams', icon: Users },
    { name: 'Khám phá', href: '/fields', icon: Search },
  ];

  const userMenuItems = [
    { name: 'Trang cá nhân', href: '/dashboard', icon: User },
    { name: 'Cài đặt', href: '/profile', icon: Settings },
  ];

  const NavigationLink = ({ item }: { item: typeof navigation[0] }) => {
    const Icon = item.icon;
    const isActive = mounted ? pathname === item.href : false;
    
    return (
      <Link
        href={item.href}
        className={`relative flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 group ${
          isActive
            ? 'text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30'
            : 'text-gray-700 hover:text-green-600 hover:bg-green-50 hover:shadow-md'
        }`}
      >
        <Icon className={`w-4 h-4 transition-all duration-300 group-hover:scale-110 ${
          isActive ? 'text-white drop-shadow-sm' : 'text-gray-600 group-hover:text-green-600'
        }`} />
        <span className="font-semibold tracking-wide">{item.name}</span>
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
        )}
      </Link>
    );
  };

  const MobileNavigationLink = ({ item }: { item: typeof navigation[0] }) => {
    const Icon = item.icon;
    const isActive = mounted ? pathname === item.href : false;
    
    return (
      <Link
        href={item.href}
        className={`flex items-center space-x-3 px-4 py-4 rounded-xl text-base font-semibold transition-all duration-200 ${
          isActive
            ? 'text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30'
            : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <Icon className="w-5 h-5" />
        <span>{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b-2 border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img src="/SportHub-Logo.png" alt="Logo" className="h-30 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 bg-gray-50/80 backdrop-blur-sm rounded-full p-2 shadow-inner">
              {navigation.map((item) => (
                <NavigationLink key={item.name} item={item} />
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!userMenuOpen);
                    }}
                    className="relative group"
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-green-600 p-0.5 shadow-lg shadow-green-500/30 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 transform transition-all duration-200 origin-top-right">
                      <div className="px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 p-0.5">
                            <div className="w-full h-full rounded-full bg-white p-0.5">
                              {user.avatar ? (
                                <img 
                                  src={user.avatar} 
                                  alt={user.name} 
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                                  <User className="w-6 h-6 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-base font-bold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-3">
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-green-100 px-3 py-1.5 rounded-full">
                            <Gift className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-bold text-green-700">{user.loyaltyPoints} điểm</span>
                          </div>
                        </div>
                      </div>
                      
                      {userMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                      
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => router.push('/login')}
                    className="text-gray-700 hover:text-green-600 font-bold px-5 py-2.5 rounded-full hover:bg-green-50 transition-all duration-200 tracking-wide"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => router.push('/register')}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200 hover:scale-105 font-bold tracking-wide"
                  >
                    Đăng ký
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2.5 rounded-full hover:bg-green-50 transition-all duration-200 hover:shadow-md"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm">
          <div className="absolute top-18 left-0 right-0 bg-white/95 backdrop-blur-xl border-b-2 border-green-100 shadow-2xl">
            <div className="px-4 py-6 space-y-3">
              {navigation.map((item) => (
                <MobileNavigationLink key={item.name} item={item} />
              ))}
              
              {/* Mobile User Info */}
              {isAuthenticated && user && (
                <div className="pt-4 border-t-2 border-green-100 mt-6">
                  <div className="flex items-center space-x-4 px-4 py-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-gray-900">{user.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Gift className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700 font-bold">{user.loyaltyPoints} điểm</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};