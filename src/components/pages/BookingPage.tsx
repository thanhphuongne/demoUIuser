'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Star, Check, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFieldStore } from '../../stores/fieldStore';
import { Field, SubCourt, TimeSlot } from '../../types/field';

export const BookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [selectedSubCourt, setSelectedSubCourt] = useState<SubCourt | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  
  // Hàm tạo ngày theo múi giờ Việt Nam
  const createVietnamDate = (date?: Date) => {
    const now = date || new Date();
    // Tạo ngày mới với múi giờ Việt Nam (GMT+7)
    const vietnamTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"}));
    vietnamTime.setHours(0, 0, 0, 0);
    return vietnamTime;
  };
  
  // Ngày hiện tại theo múi giờ Việt Nam
  const [today] = useState(() => createVietnamDate());
  
  // Ngày bắt đầu tuần hiện tại
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const todayVN = createVietnamDate();
    return new Date(todayVN.getFullYear(), todayVN.getMonth(), todayVN.getDate());
  });
  
  // Ngày tối đa (27 ngày sau ngày hiện tại, tổng 28 ngày)
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 27);

  const { 
    mainSports, 
    fieldsBySport, 
    subCourts, 
    timeSlots, 
    loading, 
    fetchMainSports, 
    fetchFieldsBySport, 
    fetchSubCourts, 
    fetchTimeSlots 
  } = useFieldStore();

  useEffect(() => {
    fetchMainSports();
  }, []);

  useEffect(() => {
    if (selectedSport) {
      fetchFieldsBySport(selectedSport);
    }
  }, [selectedSport]);

  useEffect(() => {
    if (selectedField) {
      fetchSubCourts(selectedField.id);
    }
  }, [selectedField]);

  useEffect(() => {
    if (selectedField && selectedSubCourt && selectedDate) {
      fetchTimeSlots(selectedField.id, selectedSubCourt.id);
    }
  }, [selectedField, selectedSubCourt, selectedDate]);

  useEffect(() => {
    if (selectedSubCourt && selectedField) {
      fetchTimeSlots(selectedField.id, selectedSubCourt.id);
    }
  }, [selectedSubCourt, selectedField]);

  const getFirstSlotDate = (slots: TimeSlot[]) => {
    if (slots.length > 0) {
      return slots[0].date;
    }
    return formatDate(today);
  };

  useEffect(() => {
    if (timeSlots.length > 0) {
      const [y, m, d] = timeSlots[0].date.split('-');
      setCurrentWeekStart(new Date(Number(y), Number(m) - 1, Number(d)));
    }
  }, [timeSlots]);

  const generateWeekDays = () => {
    const days = [];
    const baseDate = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate());
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = generateWeekDays();

  // Kiểm tra có thể chuyển sang tuần sau không
  const canGoNext = () => {
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);
    return nextWeekStart <= maxDate;
  };

  const nextWeek = () => {
    if (!canGoNext()) return;
    
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const prevWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() - 7);
    
    if (newDate < today) {
      setCurrentWeekStart(today);
    } else {
      setCurrentWeekStart(newDate);
    }
  };

  // Sửa hàm formatDate để luôn dùng múi giờ địa phương
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedSport !== '';
      case 2: return selectedField !== null;
      case 3: return selectedSubCourt !== null;
      case 4: return selectedTimeSlot !== null;
      case 5: return true;
      default: return false;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const resetFromStep = (step: number) => {
    if (step <= 1) {
      setSelectedSport('');
    }
    if (step <= 2) {
      setSelectedField(null);
    }
    if (step <= 3) {
      setSelectedSubCourt(null);
    }
    if (step <= 4) {
      setSelectedDate('');
      setSelectedTimeSlot(null);
    }
  };

  // Log kiểm tra ngày đầu tiên - sẽ hiển thị đúng ngày Việt Nam
  console.log("Ngày đầu tiên (hôm nay):", formatDate(today));
  console.log("Ngày cuối cùng được phép:", formatDate(maxDate));
  console.log("Today object:", today);
  console.log("Today Vietnam time check:", today.toLocaleDateString('vi-VN'));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                step <= currentStep 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step < currentStep ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 5 && (
                <div className={`w-12 h-1 mx-2 ${
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
            Chọn sân lớn
          </span>
          <span className={currentStep >= 3 ? 'text-sky-600 font-medium' : 'text-gray-500'}>
            Chọn sân nhỏ
          </span>
          <span className={currentStep >= 4 ? 'text-sky-600 font-medium' : 'text-gray-500'}>
            Chọn giờ
          </span>
          <span className={currentStep >= 5 ? 'text-sky-600 font-medium' : 'text-gray-500'}>
            Xác nhận
          </span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        )}

        {/* Step 1: Sport Selection */}
        {currentStep === 1 && !loading && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn môn thể thao</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mainSports.map((sport) => (
                <button
                  key={sport.name}
                  onClick={() => {
                    const sportKey = sport.name === 'Bóng đá' ? 'football' : 
                                   sport.name === 'Cầu lông' ? 'badminton' : 'pickle';
                    setSelectedSport(sportKey);
                    resetFromStep(2);
                  }}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    (selectedSport === 'football' && sport.name === 'Bóng đá') ||
                    (selectedSport === 'badminton' && sport.name === 'Cầu lông') ||
                    (selectedSport === 'pickle' && sport.name === 'Pickle Ball')
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl mb-3">{sport.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{sport.name}</h3>
                  <p className="text-gray-600 text-sm">{sport.description}</p>
                  <div className="mt-2 text-sm text-sky-600 font-medium">
                    {sport.courts} sân có sẵn
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Field Selection */}
        {currentStep === 2 && !loading && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn sân thể thao</h2>
            <div className="space-y-4">
              {fieldsBySport.map((field) => (
                <button
                  key={field.id}
                  onClick={() => {
                    setSelectedField(field);
                    resetFromStep(3);
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedField?.id === field.id
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
                      <div className="text-lg font-bold text-sky-600 mb-2">
                        {field.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        {field.subCourts.length} sân nhỏ có sẵn
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Sub Court Selection */}
        {currentStep === 3 && !loading && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn sân nhỏ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subCourts.map((subCourt) => (
                <button
                  key={subCourt.id}
                  onClick={() => {
                    setSelectedSubCourt(subCourt);
                    resetFromStep(4);
                  }}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedSubCourt?.id === subCourt.id
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{subCourt.name}</h3>
                  <div className="text-sm text-gray-600">
                    {subCourt.timeSlots.length} slot thời gian
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Chọn giờ */}
        {currentStep === 4 && !loading && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn thời gian đặt sân</h2>
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={prevWeek}
                disabled={currentWeekStart <= today}
                className={`p-2 rounded-lg border ${
                  currentWeekStart <= today 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold">{formatDateDisplay(weekDays[0])} - {formatDateDisplay(weekDays[6])}</span>
              <button
                onClick={nextWeek}
                disabled={!canGoNext()}
                className={`p-2 rounded-lg border ${
                  !canGoNext()
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Khung giờ</th>
                    {weekDays.map((date, idx) => (
                      <th key={idx} className="border px-2 py-1">
                        {formatDateDisplay(date)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 24 }, (_, hour) => {
                    const startHour = hour;
                    const endHour = (hour + 1) % 24;
                    const hourStr = `${startHour.toString().padStart(2, '0')}:00`;
                    const nextHourStr = `${endHour.toString().padStart(2, '0')}:00`;
                    return (
                      <tr key={hour}>
                        <td className="border px-2 py-1 font-semibold">{`${startHour} - ${endHour}`}</td>
                        {weekDays.map((date, idx) => {
                          const dateStr = formatDate(date);
                          const slot = timeSlots.find(
                            s => s.date === dateStr && s.startTime === hourStr
                          );
                          // Nếu không có slot => ngoài giờ mở cửa
                          if (!slot) {
                            return (
                              <td
                                key={idx}
                                className="border px-2 py-1 text-center bg-red-200 text-red-700 cursor-not-allowed select-none"
                              >
                                Ngoài giờ
                              </td>
                            );
                          }
                          const isBooked = slot.isBooked;
                          return (
                            <td
                              key={idx}
                              className={`border px-2 py-1 text-center cursor-pointer transition
                                ${isBooked ? 'bg-yellow-300 text-gray-700 cursor-not-allowed' : 'bg-green-200 hover:bg-green-300'}
                                ${selectedTimeSlot?.id === slot.id ? 'ring-2 ring-green-600' : ''}
                              `}
                              onClick={() => {
                                if (!isBooked && slot) setSelectedTimeSlot(slot);
                              }}
                            >
                              {isBooked ? 'Đã book' : 'Chọn'}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Xác nhận đặt sân</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Môn thể thao:</span>
                  <span className="font-medium">
                    {selectedSport === 'football' ? 'Bóng đá' :
                     selectedSport === 'badminton' ? 'Cầu lông' : 'Pickle Ball'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sân lớn:</span>
                  <span className="font-medium">{selectedField?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sân nhỏ:</span>
                  <span className="font-medium">{selectedSubCourt?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày:</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giờ:</span>
                  <span className="font-medium">
                    {selectedTimeSlot?.startTime} - {selectedTimeSlot?.endTime}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Tổng tiền:</span>
                    <span className="text-2xl font-bold text-sky-600">
                      {selectedTimeSlot && formatPrice(selectedTimeSlot.price)}
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
          onClick={currentStep === 5 ? () => alert('Đặt sân thành công!') : nextStep}
          disabled={!canProceed()}
          className="flex items-center space-x-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{currentStep === 5 ? 'Xác nhận đặt sân' : 'Tiếp tục'}</span>
          {currentStep < 5 && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};