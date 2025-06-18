import React, { useState } from 'react';
import { User, Calendar, CreditCard, Bell, Shield, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'payments' | 'notifications'>('profile');
  const { user, logout } = useAuthStore();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Vui lòng đăng nhập</h1>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', name: 'Thông tin cá nhân', icon: User },
    { id: 'bookings', name: 'Lịch sử đặt sân', icon: Calendar },
    { id: 'payments', name: 'Thanh toán', icon: CreditCard },
    { id: 'notifications', name: 'Thông báo', icon: Bell },
  ];

  const bookingHistory = [
    {
      id: 1,
      fieldName: 'Sân bóng Quy Nhon Center',
      sport: 'Bóng đá',
      date: '2024-12-28',
      time: '19:00 - 20:00',
      status: 'completed',
      amount: 300000
    },
    {
      id: 2,
      fieldName: 'Sân cầu lông Hoàng Gia',
      sport: 'Cầu lông',
      date: '2024-12-25',
      time: '18:30 - 19:30',
      status: 'completed',
      amount: 120000
    },
    {
      id: 3,
      fieldName: 'Sân Pickle Ball Marina',
      sport: 'Pickle Ball',
      date: '2024-12-20',
      time: '16:00 - 17:00',
      status: 'cancelled',
      amount: 150000
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
                ) : (
                  <span className="text-2xl font-bold text-white">{user.name.charAt(0)}</span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">
                <span>{user.loyaltyPoints} điểm</span>
              </div>
            </div>
            
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Thông tin cá nhân</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Môn thể thao yêu thích
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Bóng đá', 'Cầu lông', 'Pickle Ball', 'Tennis', 'Bóng chuyền'].map((sport) => (
                        <label key={sport} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            defaultChecked={user.favoritesSports.includes(sport.toLowerCase())}
                            className="text-sky-600"
                          />
                          <span className="text-sm text-gray-700">{sport}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Lịch sử đặt sân</h3>
                <div className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{booking.fieldName}</h4>
                          <p className="text-gray-600">{booking.sport}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          booking.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status === 'completed' ? 'Hoàn thành' : 
                           booking.status === 'cancelled' ? 'Đã hủy' : 'Sắp tới'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="block font-medium">Ngày:</span>
                          <span>{booking.date}</span>
                        </div>
                        <div>
                          <span className="block font-medium">Giờ:</span>
                          <span>{booking.time}</span>
                        </div>
                        <div>
                          <span className="block font-medium">Số tiền:</span>
                          <span className="text-sky-600 font-semibold">{formatPrice(booking.amount)}</span>
                        </div>
                        <div className="flex items-end">
                          {booking.status === 'completed' && (
                            <button className="text-sky-600 hover:text-sky-700 text-sm">
                              Đặt lại
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Phương thức thanh toán</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
                        <div>
                          <p className="font-medium text-gray-900">**** **** **** 1234</p>
                          <p className="text-sm text-gray-600">Visa • Hết hạn 12/26</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-sky-600 hover:text-sky-700 text-sm">Sửa</button>
                        <button className="text-red-600 hover:text-red-700 text-sm">Xóa</button>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                    + Thêm phương thức thanh toán
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cài đặt thông báo</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Đặt sân</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Xác nhận đặt sân</span>
                        <input type="checkbox" defaultChecked className="text-sky-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Nhắc nhở trước 1 giờ</span>
                        <input type="checkbox" defaultChecked className="text-sky-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Thay đổi lịch đặt</span>
                        <input type="checkbox" defaultChecked className="text-sky-600" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Trận đấu</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Trận đấu mới phù hợp</span>
                        <input type="checkbox" defaultChecked className="text-sky-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Có người tham gia trận của tôi</span>
                        <input type="checkbox" defaultChecked className="text-sky-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Tin nhắn nhóm</span>
                        <input type="checkbox" className="text-sky-600" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Khuyến mãi</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Ưu đãi đặc biệt</span>
                        <input type="checkbox" defaultChecked className="text-sky-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Điểm thưởng tích lũy</span>
                        <input type="checkbox" defaultChecked className="text-sky-600" />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700">
                      Lưu cài đặt
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};