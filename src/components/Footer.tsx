'use client';
import React from 'react';
import { Calendar, MapPin, Phone, Mail, Facebook, Instagram, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white text-gray-900 border-t border-gray-200/50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gray-100/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-gray-100/15 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-0 w-24 h-24 bg-gray-100/25 rounded-full blur-lg"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="group cursor-pointer">
              <div className="mb-4">
                <img
                  src="/SportHub-Logo.png"
                  alt="SportBook Logo"
                  className="h-16 max-w-none group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-gray-600 text-base leading-relaxed max-w-md">
                Hệ thống đặt sân thể thao hàng đầu tại Quy Nhơn. Kết nối cộng đồng thể thao, đặt sân dễ dàng, tìm đội nhanh chóng.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a href="#" className="group relative rounded-full bg-white p-3 text-green-600 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100/50">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="group relative rounded-full bg-white p-3 text-green-600 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100/50">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-green-700 mb-4 tracking-wide relative">
              Liên kết nhanh
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/booking", text: "Đặt sân" },
                { href: "/teams", text: "Tìm đội" },
                { href: "/fields", text: "Khám phá sân" },
                { href: "#", text: "Hỗ trợ" }
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="group flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-green-700 mb-4 tracking-wide relative">
              Liên hệ
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "Quy Nhơn, Bình Định" },
                { icon: Phone, text: "+84 123 456 789" },
                { icon: Mail, text: "support@sportbook.vn" }
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="group flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:shadow-md transition-shadow duration-200">
                      <Icon className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium group-hover:text-green-700 transition-colors duration-200">
                      {contact.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-350">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-gray-500 text-sm font-medium">
                © 2025 SportBook. Tất cả quyền được bảo lưu.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-green-600 transition-colors duration-200 font-medium">Điều khoản</a>
              <a href="#" className="hover:text-green-600 transition-colors duration-200 font-medium">Bảo mật</a>
              <a href="#" className="hover:text-green-600 transition-colors duration-200 font-medium">Cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};