// src/services/bookingService.ts

import { tokenManager } from './authService';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api';

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = tokenManager.getToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
};

// Types for booking API (matching actual backend response)
export interface Sport {
  id: number;
  sportName: string;
  description?: string;
}

export interface Venue {
  id: number;
  businessId: number;
  venueName: string;
  address: string;
  description?: string;
  photos?: string;
  contactPhone: string;
  contactEmail: string;
  operatingHours: string;
  facilities: string;
  isActive: boolean;
  businessName: string;
  fieldCount: number;
  availableSports: string[];
}

export interface Field {
  id: number;
  businessId: number;
  venueId: number;
  fieldName: string;
  fieldNumber: string;
  sportType: string;
  address?: string;
  description?: string;
  photos?: string;
  operatingHours: string;
  basePrice: number;
  isActive: boolean;
  businessName: string;
  venueName: string;
  venueAddress: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
  price?: number;
}

export interface Booking {
  id: number;
  fieldId: number;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice?: number;
  field?: Field;
  venue?: Venue;
}

export interface CreateBookingData {
  fieldId: number;
  startTime: string;
  endTime: string;
}

export const bookingService = {
  // Sports
  getSports: async (): Promise<Sport[]> => {
    try {
      return await apiRequest('/booking/sports');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể lấy danh sách môn thể thao');
    }
  },

  // Venues
  getVenues: async (sportId?: number): Promise<Venue[]> => {
    try {
      const endpoint = sportId ? `/booking/venues?sportId=${sportId}` : '/booking/venues';
      return await apiRequest(endpoint);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể lấy danh sách địa điểm');
    }
  },

  getVenueById: async (venueId: number): Promise<Venue> => {
    try {
      return await apiRequest(`/booking/venues/${venueId}`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể lấy thông tin địa điểm');
    }
  },

  // Fields
  getAllFields: async (): Promise<Field[]> => {
    try {
      return await apiRequest('/booking/fields');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể lấy danh sách sân');
    }
  },

  getFieldsByVenue: async (venueId: number): Promise<Field[]> => {
    try {
      return await apiRequest(`/booking/venues/${venueId}/fields`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể lấy danh sách sân của địa điểm');
    }
  },

  getFieldAvailability: async (fieldId: number, date: string): Promise<TimeSlot[]> => {
    try {
      return await apiRequest(`/booking/fields/${fieldId}/availability?date=${date}`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể kiểm tra lịch trống');
    }
  },

  // Bookings
  createBooking: async (bookingData: CreateBookingData): Promise<Booking> => {
    try {
      return await apiRequest('/booking/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể tạo đặt sân');
    }
  },

  getMyBookings: async (): Promise<Booking[]> => {
    try {
      return await apiRequest('/booking/bookings/my');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Không thể lấy danh sách đặt sân');
    }
  },
};
