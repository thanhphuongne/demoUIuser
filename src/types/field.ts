// Type cho slot thời gian
export type TimeSlot = {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  isBooked: boolean;
  price: number;
};

// Type cho sân nhỏ
export type SubCourt = {
  id: string;
  name: string; // "Sân A", "Sân B", "Sân 1", "Sân 2"
  timeSlots: TimeSlot[];
};

// Type cho sân lớn (đã cập nhật)
export type Field = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  openingHours: string; // Để hiển thị (ví dụ: "06:00 - 21:00")
  startHour: number; // Giờ bắt đầu (ví dụ: 6)
  endHour: number; // Giờ kết thúc (ví dụ: 21)
  image: string;
  description: string;
  sport: string;
  isPopular: boolean;
  subCourts: SubCourt[];
};

export type MainSport = {
  name: string;
  icon: string;
  description: string;
  courts: number;
  color: string;
};