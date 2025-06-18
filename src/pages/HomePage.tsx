import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Star, MapPin, Clock, Trophy, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const HomePage: React.FC = () => {
  const { isAuthenticated, toggleAuthModal } = useAuthStore();

  const sports = [
    {
      id: 'football',
      name: 'Bóng đá',
      icon: '⚽',
      description: 'Sân cỏ tự nhiên và nhân tạo',
      price: '200.000đ - 500.000đ/giờ',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: 'badminton',
      name: 'Cầu lông',
      icon: '🏸',
      description: 'Sân trong nhà, thoáng mát',
      price: '80.000đ - 150.000đ/giờ',
      image: 'https://images.pexels.com/photos/8224103/pexels-photo-8224103.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: 'pickle',
      name: 'Pickle Ball',
      icon: '🎾',
      description: 'Môn thể thao mới nổi',
      price: '100.000đ - 200.000đ/giờ',
      image: 'https://images.pexels.com/photos/8224122/pexels-photo-8224122.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  const popularFields = [
    {
      id: 1,
      name: 'Sân bóng Quy Nhon Center',
      location: 'Trung tâm Quy Nhon',
      rating: 4.8,
      reviews: 124,
      price: '300.000đ/giờ',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=500',
      amenities: ['Đỗ xe', 'Căn tin', 'WC', 'Thay đồ']
    },
    {
      id: 2,
      name: 'Sân cầu lông Hoàng Gia',
      location: 'Lê Hồng Phong',
      rating: 4.9,
      reviews: 89,
      price: '120.000đ/giờ',
      image: 'https://images.pexels.com/photos/8224103/pexels-photo-8224103.jpeg?auto=compress&cs=tinysrgb&w=500',
      amenities: ['Điều hòa', 'Đỗ xe', 'WC', 'Nước uống']
    },
    {
      id: 3,
      name: 'Sân Pickle Ball Marina',
      location: 'Ven biển Quy Nhon',
      rating: 4.7,
      reviews: 67,
      price: '150.000đ/giờ',
      image: 'https://images.pexels.com/photos/8224122/pexels-photo-8224122.jpeg?auto=compress&cs=tinysrgb&w=500',
      amenities: ['View biển', 'Đỗ xe', 'Café', 'WC']
    }
  ];

  const handleBookNow = () => {
    if (isAuthenticated) {
      // Navigate to booking
    } else {
      toggleAuthModal('login');
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-600 via-sky-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Đặt sân thể thao
              <span className="block text-emerald-300">dễ dàng tại Quy Nhon</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-sky-100">
              Kết nối cộng đồng thể thao • Đặt sân nhanh chóng • Tìm đội dễ dàng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookNow}
                className="bg-white text-sky-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Đặt sân ngay
              </button>
              <Link
                to="/teams"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-sky-700 transition-colors"
              >
                Tìm đội chơi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Các môn thể thao phổ biến
          </h2>
          <p className="text-lg text-gray-600">
            Lựa chọn môn thể thao yêu thích và bắt đầu đặt sân
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sports.map((sport) => (
            <div
              key={sport.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-4xl">{sport.icon}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{sport.name}</h3>
                <p className="text-gray-600 mb-3">{sport.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sky-600 font-semibold">{sport.price}</span>
                  <Link
                    to={`/booking?sport=${sport.id}`}
                    className="text-sky-600 hover:text-sky-700 font-medium flex items-center space-x-1"
                  >
                    <span>Đặt sân</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Fields */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sân thể thao nổi bật
            </h2>
            <p className="text-lg text-gray-600">
              Những sân được đánh giá cao nhất tại Quy Nhon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularFields.map((field) => (
              <div
                key={field.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={field.image}
                    alt={field.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{field.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{field.name}</h3>
                  <div className="flex items-center space-x-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{field.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 mb-4">
                    <span className="text-sm">{field.reviews} đánh giá</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {field.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sky-600 font-bold">{field.price}</span>
                    <button
                      onClick={handleBookNow}
                      className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors text-sm"
                    >
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Đặt sân dễ dàng</h3>
            <p className="text-gray-600">
              Chỉ 4 bước đơn giản để đặt sân yêu thích. Xem thời gian thật, thanh toán an toàn.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kết nối đội nhóm</h3>
            <p className="text-gray-600">
              Tìm đội chơi, tạo trận đấu, kết nối cộng đồng thể thao Quy Nhon.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tích điểm thưởng</h3>
            <p className="text-gray-600">
              Đặt sân tích điểm, đổi quà hấp dẫn. Càng chơi nhiều, ưu đãi càng lớn.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};