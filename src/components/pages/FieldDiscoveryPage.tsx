'use client';
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, StarHalf, Clock,  ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useFieldStore } from '../../stores/fieldStore';
import { useSearchParams } from 'next/navigation';

export const FieldDiscoveryPage: React.FC = () => {
  const { allFields, loading, error, fetchAllFields } = useFieldStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    sport: '',
    priceRange: '',
    rating: '',
  });
  const [chipDropdown, setChipDropdown] = useState<string | null>(null);
  const chipRef = React.useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const FIELDS_PER_PAGE = 8;

  useEffect(() => {
    fetchAllFields();
  }, [fetchAllFields]);

  // Set filter from query param sport
  useEffect(() => {
    const sportParam = searchParams.get('sport');
    console.log("value:",sportParam)
    if (sportParam) {
      let sportValue = '';
      if (sportParam === 'Bóng đá') sportValue = 'football';
      else if (sportParam === 'Cầu lông') sportValue = 'badminton';
      else if (sportParam === 'Pickle Ball') sportValue = 'pickle';
      console.log("SportValue:", sportValue)
      setFilters(f => ({ ...f, sport: sportValue }));
    }
  }, [searchParams]);

  const formatPrice = (priceString: string) => {
    const price = parseInt(priceString.replace(/[^\d]/g, ''));
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const filteredFields = allFields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         field.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = !filters.sport || field.sport === filters.sport;
    const matchesRating = !filters.rating || field.rating >= parseFloat(filters.rating);
    
    let matchesPrice = true;
    if (filters.priceRange) {
      const price = parseInt(field.price.replace(/[^\d]/g, ''));
      switch (filters.priceRange) {
        case 'under100':
          matchesPrice = price < 100000;
          break;
        case '100-150':
          matchesPrice = price >= 100000 && price < 150000;
          break;
        case '150-200':
          matchesPrice = price >= 150000 && price < 200000;
          break;
        case '200-250':
          matchesPrice = price >= 200000 && price < 250000;
          break;
        case '250-300':
          matchesPrice = price >= 250000 && price < 300000;
          break;
        case 'over300':
          matchesPrice = price >= 300000;
          break;
        default:
          matchesPrice = true;
      }
    }
    
    return matchesSearch && matchesSport && matchesRating && matchesPrice;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFields.length / FIELDS_PER_PAGE);
  const startIndex = (currentPage - 1) * FIELDS_PER_PAGE;
  const paginatedFields = filteredFields.slice(startIndex, startIndex + FIELDS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // Các lựa chọn cho filter
  const sportOptions = [
    { value: '', label: 'Tất cả môn thể thao' },
    { value: 'football', label: 'Bóng đá' },
    { value: 'badminton', label: 'Cầu lông' },
    { value: 'pickle', label: 'Pickle Ball' },
  ];
  const ratingOptions = [
    { value: '', label: 'Mọi đánh giá' },
    { value: '4.5', label: (
      <span className="flex items-center gap-0.5">
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <StarHalf className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <span className="ml-1">4.5+</span>
      </span>
    ) },
    { value: '4.0', label: (
      <span className="flex items-center gap-0.5">
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <span className="ml-1">4.0+</span>
      </span>
    ) },
    { value: '3.5', label: (
      <span className="flex items-center gap-0.5">
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <Star className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <StarHalf className="w-4 h-4 text-green-500" fill="#22c55e" strokeWidth={0} />
        <span className="ml-1">3.5+</span>
      </span>
    ) },
  ];
  const priceOptions = [
    { value: '', label: 'Mọi mức giá' },
    { value: 'under100', label: 'Dưới 100.000đ' },
    { value: '100-150', label: '100.000đ - 150.000đ' },
    { value: '150-200', label: '150.000đ - 200.000đ' },
    { value: '200-250', label: '200.000đ - 250.000đ' },
    { value: '250-300', label: '250.000đ - 300.000đ' },
    { value: 'over300', label: 'Trên 300.000đ' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách sân...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchAllFields}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero Search Section */}
        <div className="relative h-80 mb-8 rounded-2xl overflow-visible shadow-2xl">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?_gl=1*1gqr5sa*_ga*MTM4MjA3NDU0OS4xNzUxMjg5Mzg3*_ga_8JE65Q40S6*czE3NTEyOTgzOTUkbzIkZzEkdDE3NTEyOTg0MTAkajQ1JGwwJGgw"
              alt="Sân thể thao"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-green-400/10"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-12">
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Chọn Sân Và Bắt Đầu Môn
              </h1>
              <h2 className="text-3xl lg:text-4xl font-bold text-lime-300 mb-3 drop-shadow-lg">
                Thể Thao Yêu Thích Của Bạn
              </h2>
            </div>

            {/* Search Form */}
            <div className="max-w-6xl mx-auto w-full">
              <div className="bg-white rounded-xl p-4 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                  {/* Sport Dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Môn thể thao
                    </label>
                    <button
                      className="w-full px-3 py-2.5 text-left bg-white border border-gray-300 rounded-lg hover:border-green-500 focus:border-green-500 focus:outline-none transition-all flex items-center justify-between text-sm"
                      onClick={() => setChipDropdown(chipDropdown === 'sport' ? null : 'sport')}
                    >
                      <span className="text-gray-700 truncate">
                        {filters.sport ? sportOptions.find(o => o.value === filters.sport)?.label : 'Chọn môn thể thao'}
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-500 flex-shrink-0 ml-1" />
                    </button>
                    {chipDropdown === 'sport' && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-green-500 rounded-lg shadow-xl">
                        {sportOptions.map(option => (
                          <button
                            key={option.value}
                            className={`w-full text-left px-3 py-2 hover:bg-green-50 transition-all text-sm first:rounded-t-lg last:rounded-b-lg ${
                              filters.sport === option.value ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-700'
                            }`}
                            onClick={() => {
                              setFilters(f => ({ ...f, sport: option.value }));
                              setChipDropdown(null);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rating Dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Đánh giá
                    </label>
                    <button
                      className="w-full px-3 py-2.5 text-left bg-white border border-gray-300 rounded-lg hover:border-green-500 focus:border-green-500 focus:outline-none transition-all flex items-center justify-between text-sm"
                      onClick={() => setChipDropdown(chipDropdown === 'rating' ? null : 'rating')}
                    >
                      <span className="text-gray-700 truncate flex items-center">
                        {filters.rating ? ratingOptions.find(o => o.value === filters.rating)?.label : 'Chọn đánh giá'}
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-500 flex-shrink-0 ml-1" />
                    </button>
                    {chipDropdown === 'rating' && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-green-500 rounded-lg shadow-xl">
                        {ratingOptions.map(option => (
                          <button
                            key={option.value}
                            className={`w-full text-left px-3 py-2 hover:bg-green-50 transition-all text-sm first:rounded-t-lg last:rounded-b-lg flex items-center ${
                              filters.rating === option.value ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-700'
                            }`}
                            onClick={() => {
                              setFilters(f => ({ ...f, rating: option.value }));
                              setChipDropdown(null);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mức giá
                    </label>
                    <button
                      className="w-full px-3 py-2.5 text-left bg-white border border-gray-300 rounded-lg hover:border-green-500 focus:border-green-500 focus:outline-none transition-all flex items-center justify-between text-sm"
                      onClick={() => setChipDropdown(chipDropdown === 'price' ? null : 'price')}
                    >
                      <span className="text-gray-700 truncate">
                        {filters.priceRange ? priceOptions.find(o => o.value === filters.priceRange)?.label : 'Chọn mức giá'}
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-500 flex-shrink-0 ml-1" />
                    </button>
                    {chipDropdown === 'price' && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-green-500 rounded-lg shadow-xl">
                        {priceOptions.map(option => (
                          <button
                            key={option.value}
                            className={`w-full text-left px-3 py-2 hover:bg-green-50 transition-all text-sm first:rounded-t-lg last:rounded-b-lg ${
                              filters.priceRange === option.value ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-700'
                            }`}
                            onClick={() => {
                              setFilters(f => ({ ...f, priceRange: option.value }));
                              setChipDropdown(null);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Search Input - Spans 2 columns */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Tìm kiếm
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Nhập tên sân hoặc địa điểm..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <button
                        onClick={() => {
                          // Trigger search - results will update automatically via useEffect
                        }}
                        className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-1.5"
                      >
                        <Search className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {(filters.sport || filters.rating || filters.priceRange || searchQuery) && (
                  <div className="mt-3 text-center">
                    <button
                      onClick={() => {
                        setFilters({ sport: '', priceRange: '', rating: '' });
                        setSearchQuery('');
                      }}
                      className="px-3 py-1.5 text-green-600 hover:text-green-700 font-medium transition-all text-sm"
                    >
                      Xóa tất cả bộ lọc
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 text-lg">
            Tìm thấy <span className="font-bold text-green-600">{filteredFields.length}</span> sân thể thao
          </p>
          <div className="text-sm text-gray-500">
            Trang {currentPage} / {totalPages}
          </div>
        </div>

        {/* Field Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {paginatedFields.map((field) => (
            <div key={field.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="relative h-36">
                <img
                  src={field.image}
                  alt={field.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-white">{field.rating}</span>
                </div>
                <div className="absolute top-3 left-3 bg-white text-green-700 w-9 h-9 flex items-center justify-center rounded-full text-xl shadow">
                  {field.sport === "football"
                    ? "⚽"
                    : field.sport === "badminton"
                    ? "🏸"
                    : field.sport === "pickle"
                    ? "🎾"
                    : ""}
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1">{field.name}</h3>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-xs font-medium">{field.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-xs font-medium">{field.openingHours}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 p-2 rounded-xl">
                  <div>
                    <div className="text-base font-bold text-green-700">
                      {field.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-700">{field.reviews} đánh giá</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-xl hover:bg-green-700 transition-colors font-semibold text-xs">
                    Đặt ngay
                  </button>
                  <button className="px-3 py-2 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors text-xs font-semibold">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mb-8">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span className="font-bold text-sm">Đầu</span>
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex space-x-1">
              {(() => {
                let start = Math.max(1, currentPage - 1);
                let end = Math.min(totalPages, currentPage + 1);
                if (currentPage === 1) {
                  end = Math.min(totalPages, 3);
                } else if (currentPage === totalPages) {
                  start = Math.max(1, totalPages - 2);
                }
                const pages = [];
                for (let i = start; i <= end; i++) {
                  pages.push(i);
                }
                return (
                  <>
                    {start > 1 && (
                      <span className="px-2 py-2 text-gray-400 select-none">...</span>
                    )}
                    {pages.map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-xl transition-all ${
                          currentPage === page
                            ? 'bg-green-600 text-white font-bold'
                            : 'border-2 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    {end < totalPages && (
                      <span className="px-2 py-2 text-gray-400 select-none">...</span>
                    )}
                  </>
                );
              })()}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span className="font-bold text-sm">Cuối</span>
            </button>
          </div>
        )}

        {filteredFields.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Không tìm thấy sân nào
            </h3>
            <p className="text-gray-600 text-lg">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
          </div>
        )}
      </div>
    </div>
  );
};