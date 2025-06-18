import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, Calendar, Users, Search, MapPin } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Header: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, toggleAuthModal, logout } = useAuthStore();
  
  const navigation = [
    { name: 'Trang chủ', href: '/', icon: MapPin },
    { name: 'Đặt sân', href: '/booking', icon: Calendar },
    { name: 'Tìm đội', href: '/teams', icon: Users },
    { name: 'Khám phá', href: '/fields', icon: Search },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SportBook</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-sky-600 bg-sky-50'
                      : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-sky-600">{user.loyaltyPoints} điểm</p>
                  </div>
                </div>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-sky-600">
                    <Menu className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Trang cá nhân
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Cài đặt
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleAuthModal('login')}
                  className="text-gray-700 hover:text-sky-600 font-medium"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => toggleAuthModal('register')}
                  className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-sky-600 bg-sky-50'
                    : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};