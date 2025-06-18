import React, { useState } from 'react';
import { Plus, Users, Calendar, Clock, MapPin, Filter, Search, Star, MessageCircle, Share2, ChevronDown, X, Eye, Edit, Trash2 } from 'lucide-react';

export const TeamMatchingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'my-matches' | 'create'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSport, setFilterSport] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const matches = [
    {
      id: 1,
      title: 'Giao hữu bóng đá chiều CN',
      sport: 'Bóng đá',
      organizer: 'Minh Tuấn',
      organizerAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2025-01-05',
      time: '16:00',
      duration: '90 phút',
      location: 'Sân Quy Nhon Center',
      address: '123 Trần Hưng Đạo, Quy Nhon',
      participants: 8,
      maxParticipants: 10,
      skillLevel: 'Trung bình',
      description: 'Tìm thêm 2 người chơi bóng đá giao hữu. Không phân biệt trình độ, miễn là vui vẻ! Sân có đầy đủ tiện nghi, có chỗ đỗ xe và nước uống.',
      status: 'open',
      price: '50.000đ/người',
      amenities: ['Đỗ xe', 'Nước uống', 'Thay đồ'],
      rating: 4.8,
      tags: ['Giao hữu', 'Cuối tuần'],
      chatActive: true
    },
    {
      id: 2,
      title: 'Cầu lông tối thứ 6',
      sport: 'Cầu lông',
      organizer: 'Hương Lan',
      organizerAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2025-01-03',
      time: '19:00',
      duration: '120 phút',
      location: 'Sân Hoàng Gia',
      address: '456 Lê Hồng Phong, Quy Nhon',
      participants: 4,
      maxParticipants: 4,
      skillLevel: 'Cao',
      description: 'Tìm đối thủ cầu lông trình độ cao để luyện tập. Yêu cầu có kinh nghiệm chơi ít nhất 2 năm.',
      status: 'full',
      price: '30.000đ/người',
      amenities: ['Điều hòa', 'Đỗ xe', 'Wifi'],
      rating: 4.9,
      tags: ['Thi đấu', 'Trình độ cao'],
      chatActive: false
    },
    {
      id: 3,
      title: 'Pickle Ball buổi sáng',
      sport: 'Pickle Ball',
      organizer: 'Đức Hòa',
      organizerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2025-01-04',
      time: '07:00',
      duration: '60 phút',
      location: 'Sân Marina',
      address: '789 Ven biển, Quy Nhon',
      participants: 2,
      maxParticipants: 6,
      skillLevel: 'Mới bắt đầu',
      description: 'Mời mọi người thử môn thể thao mới. Sẽ có hướng dẫn cơ bản cho người mới bắt đầu.',
      status: 'open',
      price: 'Miễn phí',
      amenities: ['View biển', 'Café', 'Âm thanh'],
      rating: 4.7,
      tags: ['Học tập', 'Miễn phí'],
      chatActive: true
    }
  ];

  const myMatches = [
    {
      id: 1,
      title: 'Giao hữu bóng đá chiều CN',
      sport: 'Bóng đá',
      date: '2025-01-05',
      time: '16:00',
      location: 'Sân Quy Nhon Center',
      role: 'participant',
      status: 'upcoming',
      participants: 8,
      maxParticipants: 10
    },
    {
      id: 4,
      title: 'Cầu lông thứ 2',
      sport: 'Cầu lông',
      date: '2024-12-30',
      time: '18:00',
      location: 'Sân Hoàng Gia',
      role: 'organizer',
      status: 'completed',
      participants: 4,
      maxParticipants: 4
    }
  ];

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = !filterSport || match.sport === filterSport;
    return matchesSearch && matchesSport;
  });

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Mới bắt đầu': return 'bg-green-100 text-green-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Cao': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'Bóng đá': return '⚽';
      case 'Cầu lông': return '🏸';
      case 'Pickle Ball': return '🎾';
      default: return '🏃‍♂️';
    }
  };

  const MatchCard = ({ match, isDetailed = false }: { match: any, isDetailed?: boolean }) => (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
      isDetailed ? 'border-2 border-sky-200' : ''
    }`}>
      {/* Header */}
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">{getSportIcon(match.sport)}</span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">{match.title}</h3>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <img
                src={match.organizerAvatar}
                alt={match.organizer}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">Tổ chức bởi {match.organizer}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{match.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              match.status === 'open' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {match.status === 'open' ? 'Đang tuyển' : 'Đã đầy'}
            </span>
            <span className="text-lg font-bold text-sky-600">{match.price}</span>
          </div>
        </div>

        {/* Match Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">{match.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{match.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{match.participants}/{match.maxParticipants}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">{match.location}</span>
          </div>
        </div>

        {/* Skill Level & Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(match.skillLevel)}`}>
            {match.skillLevel}
          </span>
          {match.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{match.description}</p>

        {/* Amenities */}
        {isDetailed && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Tiện ích:</h4>
            <div className="flex flex-wrap gap-2">
              {match.amenities.map((amenity, index) => (
                <span key={index} className="px-2 py-1 bg-sky-50 text-sky-700 rounded text-xs">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            disabled={match.status === 'full'}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              match.status === 'open'
                ? 'bg-sky-600 text-white hover:bg-sky-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {match.status === 'open' ? 'Tham gia' : 'Đã đầy'}
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
            >
              <Eye className="w-4 h-4" />
            </button>
            {match.chatActive && (
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                <MessageCircle className="w-4 h-4" />
              </button>
            )}
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Tìm đội chơi</h1>
        <p className="text-gray-600">Kết nối với cộng đồng thể thao Quy Nhon</p>
      </div>

      {/* Mobile Tabs */}
      <div className="mb-6 sm:mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('discover')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'discover'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Khám phá trận đấu
            </button>
            <button
              onClick={() => setActiveTab('my-matches')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'my-matches'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trận đấu của tôi
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'create'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tạo trận đấu
            </button>
          </nav>
        </div>
      </div>

      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <div className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm trận đấu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              
              {/* Desktop Filters */}
              <div className="hidden sm:flex gap-4">
                <select
                  value={filterSport}
                  onChange={(e) => setFilterSport(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Tất cả môn thể thao</option>
                  <option value="Bóng đá">Bóng đá</option>
                  <option value="Cầu lông">Cầu lông</option>
                  <option value="Pickle Ball">Pickle Ball</option>
                </select>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
                <select
                  value={filterSport}
                  onChange={(e) => setFilterSport(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Tất cả môn thể thao</option>
                  <option value="Bóng đá">Bóng đá</option>
                  <option value="Cầu lông">Cầu lông</option>
                  <option value="Pickle Ball">Pickle Ball</option>
                </select>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Tìm thấy <span className="font-semibold">{filteredMatches.length}</span> trận đấu
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="sm:hidden bg-sky-600 text-white p-3 rounded-full shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Match Cards */}
          <div className="space-y-4">
            {filteredMatches.map((match) => (
              <div key={match.id}>
                <MatchCard match={match} isDetailed={selectedMatch === match.id} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy trận đấu nào
              </h3>
              <p className="text-gray-600 mb-4">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700"
              >
                Tạo trận đấu mới
              </button>
            </div>
          )}
        </div>
      )}

      {/* My Matches Tab */}
      {activeTab === 'my-matches' && (
        <div className="space-y-4">
          {myMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">{getSportIcon(match.sport)}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{match.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-600 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{match.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{match.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{match.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{match.participants}/{match.maxParticipants}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end space-y-2 mt-3 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    match.status === 'upcoming' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {match.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã hoàn thành'}
                  </span>
                  <span className="text-xs text-gray-500">
                    Vai trò: {match.role === 'organizer' ? 'Tổ chức' : 'Tham gia'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {match.status === 'upcoming' && (
                  <>
                    <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-sm">
                      Xem chi tiết
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                      <MessageCircle className="w-4 h-4 inline mr-1" />
                      Chat nhóm
                    </button>
                    {match.role === 'organizer' && (
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                        <Edit className="w-4 h-4 inline mr-1" />
                        Quản lý
                      </button>
                    )}
                  </>
                )}
                {match.status === 'completed' && (
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm">
                    <Star className="w-4 h-4 inline mr-1" />
                    Đánh giá
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Match Tab */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tạo trận đấu mới</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên trận đấu *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="VD: Giao hữu bóng đá cuối tuần"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Môn thể thao *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                  <option value="">Chọn môn thể thao</option>
                  <option value="football">Bóng đá</option>
                  <option value="badminton">Cầu lông</option>
                  <option value="pickle">Pickle Ball</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ *
                </label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số người tối đa *
                </label>
                <input
                  type="number"
                  required
                  min="2"
                  max="22"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa điểm *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="VD: Sân bóng Quy Nhon Center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trình độ
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                  <option value="beginner">Mới bắt đầu</option>
                  <option value="intermediate">Trung bình</option>
                  <option value="advanced">Cao</option>
                  <option value="all">Tất cả trình độ</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Mô tả chi tiết về trận đấu, yêu cầu, ghi chú..."
              ></textarea>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-sky-600" />
                <span className="text-sm text-gray-700">Trận đấu công khai (mọi người có thể tìm thấy)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-sky-600" />
                <span className="text-sm text-gray-700">Cho phép chat nhóm</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-sky-600" />
                <span className="text-sm text-gray-700">Gửi thông báo nhắc nhở</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Tạo trận đấu
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Create Match Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Tạo trận đấu mới</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Form content would go here - same as desktop version */}
            <div className="text-center py-8">
              <p className="text-gray-600">Form tạo trận đấu sẽ hiển thị ở đây</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};