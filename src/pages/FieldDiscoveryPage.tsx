import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, DollarSign } from 'lucide-react';

export const FieldDiscoveryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sport: '',
    priceRange: '',
    rating: '',
    amenities: [] as string[]
  });

  const fields = [
    {
      id: 1,
      name: 'Sân bóng Quy Nhon Center',
      location: 'Trung tâm Quy Nhon',
      distance: '2.5 km',
      rating: 4.8,
      reviews: 124,
      price: 300000,
      sport: 'football',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=500',
      amenities: ['Đỗ xe', 'Căn tin', 'WC', 'Thay đồ', 'Ánh sáng'],
      openingHours: '06:00 - 22:00',
      description: 'Sân bóng đá cỏ nhân tạo chất lượng cao, được bảo trì định kỳ.'
    },
    {
      id: 2,
      name: 'Sân cầu lông Hoàng Gia',
      location: 'Lê Hồng Phong',
      distance: '1.8 km',
      rating: 4.9,
      reviews: 89,
      price: 120000,
      sport: 'badminton',
      image: 'https://images.pexels.com/photos/8224103/pexels-photo-8224103.jpeg?auto=compress&cs=tinysrgb&w=500',
      amenities: ['Điều hòa', 'Đỗ xe', 'WC', 'Nước uống', 'Wifi'],
      openingHours: '06:00 - 23:00',
      description: 'Sân cầu lông trong nhà, điều hòa mát mẻ, phù hợp mọi thời tiết.'
    },
    {
      id: 3,
      name: 'Sân Pickle Ball Marina',
      location: 'Ven biển Quy Nhon',
      distance: '3.2 km',
      rating: 4.7,
      reviews: 67,
      price: 150000,
      sport: 'pickle',
      image: 'https://images.pexels.com/photos/8224122/pexels-photo-8224122.jpeg?auto=compress&cs=tinysrgb&w=500',
      amenities: ['View biển', 'Đỗ xe', 'Café', 'WC', 'Âm thanh'],
      openingHours: '06:00 - 21:00',
      description: 'Sân Pickle Ball view biển tuyệt đẹp, không gian thoáng đãng.'
    },
    {
      id: 4,
      name: 'Sân tennis Phú Tài',
      location: 'Phú Tài, Quy Nhon',
      distance: '4.1 km',
      rating: 4.6,
      reviews: 45,
      price: 200000,
      sport: 'tennis',
      image: 'https://images.pexels.com/photos/1407630/pexels-photo-1407630.jpeg?auto=compress&cs=tinysrgb&w=500',
      amenities: ['Đỗ xe', 'WC', 'Thay đồ', 'Cho thuê vợt'],
      openingHours: '06:00 - 22:00',
      description: 'Sân tennis sân cứng chuyên nghiệp, phù hợp các trận đấu thi đấu.'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const filteredFields = fields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         field.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = !filters.sport || field.sport === filters.sport;
    const matchesRating = !filters.rating || field.rating >= parseFloat(filters.rating);
    
    return matchesSearch && matchesSport && matchesRating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Khám phá sân thể thao</h1>
        <p className="text-gray-600">Tìm kiếm và đặt sân thể thao tốt nhất tại Quy Nhon</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm tên sân, địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.sport}
              onChange={(e) => setFilters({...filters, sport: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Tất cả môn</option>
              <option value="football">Bóng đá</option>
              <option value="badminton">Cầu lông</option>
              <option value="pickle">Pickle Ball</option>
              <option value="tennis">Tennis</option>
            </select>

            <select
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Mọi đánh giá</option>
              <option value="4.5">4.5+ sao</option>
              <option value="4.0">4.0+ sao</option>
              <option value="3.5">3.5+ sao</option>
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Mọi giá</option>
              <option value="low">Dưới 150.000đ</option>
              <option value="medium">150.000đ - 250.000đ</option>
              <option value="high">Trên 250.000đ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Tìm thấy <span className="font-semibold">{filteredFields.length}</span> sân thể thao
        </p>
      </div>

      {/* Field Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFields.map((field) => (
          <div key={field.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                <span className="text-sm">• {field.distance}</span>
              </div>

              <div className="flex items-center space-x-1 text-gray-600 mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{field.openingHours}</span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {field.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {field.amenities.slice(0, 4).map((amenity) => (
                  <span
                    key={amenity}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {amenity}
                  </span>
                ))}
                {field.amenities.length > 4 && (
                  <span className="text-gray-500 text-xs">
                    +{field.amenities.length - 4} tiện ích
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-sky-600">
                    {formatPrice(field.price)}
                  </span>
                  <span className="text-gray-500 text-sm">/giờ</span>
                </div>
                <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors">
                  Đặt ngay
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{field.reviews} đánh giá</span>
                  <button className="text-sky-600 hover:text-sky-700">
                    Xem chi tiết →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFields.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy sân nào
          </h3>
          <p className="text-gray-600">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
        </div>
      )}
    </div>
  );
};