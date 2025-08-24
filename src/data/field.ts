import { Field, SubCourt, TimeSlot, MainSport } from '../types/field';

const createSampleSlots = (subCourtId: string, startHour: number, endHour: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  for (let day = 0; day < 28; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    const dateString = date.toISOString().split('T')[0];
    
    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
      
      const isBooked = Math.random() < 0.2;
      
      slots.push({
        id: `${subCourtId}-${dateString}-${startTime}`,
        date: dateString,
        startTime,
        endTime,
        isBooked,
        price: hour >= 17 && hour < 21 ? 300000 : 250000
      });
    }
  }
  
  return slots;
};

// Tạo sample sub courts với số lượng theo yêu cầu
const createSubCourts = (fieldId: number, count: number, startHour: number, endHour: number): SubCourt[] => {
  const courts: SubCourt[] = [];
  
  for (let i = 1; i <= count; i++) {
    const subCourtId = `field-${fieldId}-court-${i}`;
    courts.push({
      id: subCourtId,
      name: `Sân ${i}`,
      timeSlots: createSampleSlots(subCourtId, startHour, endHour)
    });
  }
  
  return courts;
};

export const allFields: Field[] = [
  // Football Fields
  {
    id: 1,
    name: 'Sân bóng Quy Nhon Center',
    location: 'Trung tâm Quy Nhon',
    rating: 4.8,
    reviews: 124,
    price: '250.000đ/giờ',
    openingHours: '06:00 - 21:00',
    startHour: 6,
    endHour: 21,
    image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Sân bóng đá mini chất lượng cao, có mái che và ánh sáng tốt.',
    sport: 'football',
    isPopular: true,
    subCourts: createSubCourts(1, 2, 6, 21) // 2 sân nhỏ, 6h-21h (15 slots/ngày)
  },
  {
    id: 2,
    name: 'Sân bóng đá Thành Phố',
    location: 'Nguyễn Huệ',
    rating: 4.6,
    reviews: 156,
    price: '200.000đ/giờ',
    openingHours: '05:30 - 22:00',
    startHour: 6, // Làm tròn từ 5:30
    endHour: 22,
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Sân bóng đá cỏ nhân tạo chất lượng cao, phù hợp cho các trận đấu lớn.',
    sport: 'football',
    isPopular: true,
    subCourts: createSubCourts(2, 3, 6, 22) // 3 sân nhỏ, 6h-22h (16 slots/ngày)
  },
  {
    id: 3,
    name: 'Sân bóng Công Viên',
    location: 'Trần Phú',
    rating: 4.2,
    reviews: 62,
    price: '180.000đ/giờ',
    openingHours: '07:00 - 20:00',
    startHour: 7,
    endHour: 20,
    image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Sân bóng đá ngoài trời với không gian xanh, thoải mái.',
    sport: 'football',
    isPopular: false,
    subCourts: createSubCourts(3, 2, 7, 20) // 2 sân nhỏ, 7h-20h (13 slots/ngày)
  },

  // Badminton Fields
  {
    id: 4,
    name: 'Sân cầu lông Hoàng Gia',
    location: 'Lê Hồng Phong',
    rating: 4.9,
    reviews: 89,
    price: '100.000đ/giờ',
    openingHours: '07:00 - 22:00',
    startHour: 7,
    endHour: 22,
    image: 'https://images.pexels.com/photos/8224103/pexels-photo-8224103.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Sân cầu lông chuyên nghiệp với sàn gỗ và hệ thống ánh sáng hiện đại.',
    sport: 'badminton',
    isPopular: true,
    subCourts: createSubCourts(4, 4, 7, 22) // 4 sân nhỏ, 7h-22h (15 slots/ngày)
  },
  {
    id: 5,
    name: 'Sân cầu lông Premium',
    location: 'Trần Hưng Đạo',
    rating: 4.8,
    reviews: 92,
    price: '120.000đ/giờ',
    openingHours: '06:00 - 21:30',
    startHour: 6,
    endHour: 21, // Làm tròn từ 21:30
    image: 'https://images.pexels.com/photos/8224108/pexels-photo-8224108.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Sân cầu lông cao cấp với điều hòa và dịch vụ tốt nhất.',
    sport: 'badminton',
    isPopular: true,
    subCourts: createSubCourts(5, 3, 6, 21) // 3 sân nhỏ, 6h-21h (15 slots/ngày)
  },
  {
    id: 6,
    name: 'Sân cầu lông Sinh Viên',
    location: 'Đại học Quy Nhon',
    rating: 4.3,
    reviews: 45,
    price: '80.000đ/giờ',
    openingHours: '08:00 - 20:00',
    startHour: 8,
    endHour: 20,
    image: 'https://images.pexels.com/photos/8224103/pexels-photo-8224103.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Sân cầu lông giá rẻ dành cho sinh viên và người có thu nhập thấp.',
    sport: 'badminton',
    isPopular: false,
    subCourts: createSubCourts(6, 2, 8, 20) // 2 sân nhỏ, 8h-20h (12 slots/ngày)
  },

  // Pickle Ball Fields
  {
    id: 7,
    name: 'Sân Pickle Ball Marina',
    location: 'Ven biển Quy Nhon',
    rating: 4.7,
    reviews: 67,
    price: '120.000đ/giờ',
    openingHours: '08:00 - 20:00',
    startHour: 8,
    endHour: 20,
    image: 'https://images.pexels.com/photos/8224122/pexels-photo-8224122.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Sân Pickle Ball view biển tuyệt đẹp, không gian thoáng đãng.',
    sport: 'pickle',
    isPopular: true,
    subCourts: createSubCourts(7, 2, 8, 20) // 2 sân nhỏ, 8h-20h (12 slots/ngày)
  },
  {
    id: 8,
    name: 'Sân Pickle Ball Riverside',
    location: 'Bạch Đằng',
    rating: 4.6,
    reviews: 50,
    price: '140.000đ/giờ',
    openingHours: '07:00 - 21:00',
    startHour: 7,
    endHour: 21,
    image: 'https://images.pexels.com/photos/8224122/pexels-photo-8224122.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Sân Pickle Ball ven sông, không gian mát mẻ.',
    sport: 'pickle',
    isPopular: false,
    subCourts: createSubCourts(8, 3, 7, 21) // 3 sân nhỏ, 7h-21h (14 slots/ngày)
  },
  {
    id: 9,
    name: 'Sân Pickle Ball Central',
    location: 'Ngô Mây',
    rating: 4.8,
    reviews: 78,
    price: '150.000đ/giờ',
    openingHours: '06:00 - 22:00',
    startHour: 6,
    endHour: 22,
    image: 'https://images.pexels.com/photos/8224122/pexels-photo-8224122.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Sân Pickle Ball trung tâm thành phố, tiện lợi và hiện đại.',
    sport: 'pickle',
    isPopular: true,
    subCourts: createSubCourts(9, 4, 6, 22) // 4 sân nhỏ, 6h-22h (16 slots/ngày)
  }
];

export const popularFields: Field[] = allFields.filter(field => field.isPopular);

export const mainSports: MainSport[] = [
  {
    name: "Cầu lông",
    icon: "🏸",
    description: "Cầu lông là môn thể thao trong nhà phổ biến, phù hợp với mọi lứa tuổi.",
    courts: allFields.filter(f => f.sport === 'badminton').length,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Bóng đá",
    icon: "⚽",
    description: "Bóng đá – môn thể thao vua – luôn là lựa chọn hàng đầu cho các hoạt động thể chất.",
    courts: allFields.filter(f => f.sport === 'football').length,
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "Pickle Ball",
    icon: "🎾",
    description: "Pickle Ball là môn thể thao kết hợp giữa tennis, cầu lông và bóng bàn.",
    courts: allFields.filter(f => f.sport === 'pickle').length,
    color: "from-emerald-500 to-green-600",
  },
];