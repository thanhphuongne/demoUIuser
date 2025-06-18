import React from 'react';
import { Calendar, MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SportBook</span>
            </div>
            <p className="text-gray-300 mb-4">
              Hệ thống đặt sân thể thao hàng đầu tại Quy Nhon. Kết nối cộng đồng thể thao, 
              đặt sân dễ dàng, tìm đội nhanh chóng.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="/booking" className="text-gray-300 hover:text-sky-400 transition-colors">Đặt sân</a></li>
              <li><a href="/teams" className="text-gray-300 hover:text-sky-400 transition-colors">Tìm đội</a></li>
              <li><a href="/fields" className="text-gray-300 hover:text-sky-400 transition-colors">Khám phá sân</a></li>
              <li><a href="#" className="text-gray-300 hover:text-sky-400 transition-colors">Hỗ trợ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Quy Nhon, Binh Dinh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">support@sportbook.vn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 SportBook. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};