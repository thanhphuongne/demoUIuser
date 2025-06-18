import React from 'react';
import { Calendar, Users, Trophy, Star, Clock, MapPin } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Vui lòng đăng nhập</h1>
        </div>
      </div>
    );
  }

  const upcomingBookings = [
    {
      id: 1,
      fieldName: 'Sân bóng Quy Nhon Center',
      sport: 'Bóng đá',
      date: '2025-01-05',
      time: '19:00 - 20:00',
      status: 'confirmed'
    },
    {
      id: 2,
      fieldName: 'Sân cầu lông Hoàng Gia',
      sport: 'Cầu lông',
      date: '2025-01-07',
      time: '18:30 - 19:30',
      status: 'confirmed'
    }
  ];

  const recentMatches = [
    {
      id: 1,
      title: 'Giao hữu bóng đá chiều CN',
      sport: 'Bóng đá',
      date: '2025-01-05',
      time: '16:00',
      participants: 8,
      maxParticipants: 10,
      status: 'joined'
    },
    {
      id: 2,
      title: 'Cầu lông tối thứ 6',
      sport: 'Cầu lông',
      date: '2025-01-03',
      time: '19:00',
      participants: 4,
      maxParticipants: 4,
      status: 'full'
    }
  ];

  const stats = [
    { label: 'Tổng lần đặt sân', value: '24', icon: Calendar, color: 'from-sky-500 to-sky-600' },
    { label: 'Trận đã tham gia', value: '12', icon: Users, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Điểm tích lũy', value: user.loyaltyPoints, icon: Trophy, color: 'from-amber-500 to-amber-600' },
    { label: 'Đánh giá trung bình', value: '4.8', icon: Star, color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
            ) : (
              <span className="text-2xl font-bold">{user.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Xin chào, {user.name}!</h1>
            <p className="text-sky-100">Chào mừng bạn đến với SportBook dashboard</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to="/booking"
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow text-center"
        >
          <Calendar className="w-8 h-8 text-sky-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-900">Đặt sân</span>
        </Link>
        <Link
          to="/teams"
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow text-center"
        >
          <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-900">Tìm đội</span>
        </Link>
        <Link
          to="/fields"
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow text-center"
        >
          <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-900">Khám phá</span>
        </Link>
        <Link
          to="/profile"
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow text-center"
        >
          <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-900">Hồ sơ</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lịch đặt sân sắp tới</h2>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{booking.fieldName}</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Đã xác nhận
                  </span>
                </div>
                <p className="text-gray-600 mb-1">{booking.sport}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to="/profile?tab=bookings"
              className="block text-center text-sky-600 hover:text-sky-700 font-medium"
            >
              Xem tất cả lịch đặt →
            </Link>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trận đấu gần đây</h2>
          <div className="space-y-4">
            {recentMatches.map((match) => (
              <div key={match.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{match.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    match.status === 'joined' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {match.status === 'joined' ? 'Đã tham gia' : 'Đã đầy'}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{match.sport}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{match.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{match.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{match.participants}/{match.maxParticipants}</span>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to="/teams"
              className="block text-center text-sky-600 hover:text-sky-700 font-medium"
            >
              Xem tất cả trận đấu →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};