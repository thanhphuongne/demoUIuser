import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Check, ArrowLeft, ArrowRight } from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const sports = [
    { id: 'football', name: 'Bóng đá', icon: '⚽', description: 'Sân cỏ tự nhiên và nhân tạo' },
    { id: 'badminton', name: 'Cầu lông', icon: '🏸', description: 'Sân trong nhà, thoáng mát' },
    { id: 'pickle', name: 'Pickle Ball', icon: '🎾', description: 'Môn thể thao mới nổi' }
  ];

  const fields = [
    {
      id: 1,
      name: 'Sân bóng Quy Nhon Center',
      location: 'Trung tâm Quy Nhon',
      rating: 4.8,
      reviews: 124,
      price: 300000,
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['Đỗ xe', 'Căn tin', 'WC', 'Thay đồ'],
      sport: 'football'
    },
    {
      id: 2,
      name: 'Sân cầu lông Hoàng Gia',
      location: 'Lê Hồng Phong',
      rating: 4.9,
      reviews: 89,
      price: 120000,
      image: 'https://images.pexels.com/photos/8224103/pexels-photo-8224103.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['Điều hòa', 'Đỗ xe', 'WC', 'Nước uống'],
      sport: 'badminton'
    }
  ];

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedSport !== '';
      case 2: return selectedField !== '';
      case 3: return selectedDate !== '' && selectedTime !== '';
      case 4: return true;
      default: return false;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getSelectedField = () => fields.find(f => f.id.toString() === selectedField);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                step <= currentStep 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step < currentStep ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-sky-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={currentStep >= 1 ? 'text-sky-600 font-medium' : 'text-gray-500'}>
            Chọn môn
          </span>
          <span className={currentStep >= 2 ? 'text-sky-600 font-medium' : 'text-gray-500'}>
            Chọn sân
          </span>
          <span className={currentStep >= 3 ? 'text-sky-600 font-medium' : 'text-gray-500'}>
            Chọn giờ
          </span>
          <span className={currentStep >= 4 ? 'text-sky-600 font-medium' : 'text-gray-500'}>
            Xác nhận
          </span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {/* Step 1: Sport Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn môn thể thao</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedSport === sport.id
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl mb-3">{sport.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{sport.name}</h3>
                  <p className="text-gray-600 text-sm">{sport.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Field Selection */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn sân thể thao</h2>
            <div className="space-y-4">
              {fields
                .filter(field => field.sport === selectedSport)
                .map((field) => (
                <button
                  key={field.id}
                  onClick={() => setSelectedField(field.id.toString())}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedField === field.id.toString()
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={field.image}
                      alt={field.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{field.name}</h3>
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{field.location}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{field.rating}</span>
                          <span>({field.reviews})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {field.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="text-lg font-bold text-sky-600">
                        {formatPrice(field.price)}/giờ
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Date & Time Selection */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn ngày và giờ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn ngày</h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn giờ</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedTime === time
                          ? 'border-sky-500 bg-sky-50 text-sky-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Xác nhận đặt sân</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Môn thể thao:</span>
                  <span className="font-medium">
                    {sports.find(s => s.id === selectedSport)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sân:</span>
                  <span className="font-medium">{getSelectedField()?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày:</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giờ:</span>
                  <span className="font-medium">{selectedTime} - {
                    String(parseInt(selectedTime.split(':')[0]) + 1).padStart(2, '0')
                  }:00</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Tổng tiền:</span>
                    <span className="text-2xl font-bold text-sky-600">
                      {getSelectedField() && formatPrice(getSelectedField()!.price)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="radio" name="payment" className="text-sky-600" defaultChecked />
                    <span>Thẻ tín dụng/ghi nợ</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="radio" name="payment" className="text-sky-600" />
                    <span>Ví điện tử (MoMo, ZaloPay)</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="radio" name="payment" className="text-sky-600" />
                    <span>Chuyển khoản ngân hàng</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>
        
        <button
          onClick={currentStep === 4 ? () => alert('Đặt sân thành công!') : nextStep}
          disabled={!canProceed()}
          className="flex items-center space-x-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{currentStep === 4 ? 'Xác nhận đặt sân' : 'Tiếp tục'}</span>
          {currentStep < 4 && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};