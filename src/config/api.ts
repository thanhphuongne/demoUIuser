// src/config/api.ts

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    CHECK: '/auth/check',
  },
  
  // Booking
  BOOKING: {
    SPORTS: '/booking/sports',
    VENUES: '/booking/venues',
    VENUE_BY_ID: (id: number) => `/booking/venues/${id}`,
    FIELDS_BY_VENUE: (venueId: number) => `/booking/venues/${venueId}/fields`,
    FIELDS: '/booking/fields',
    FIELD_AVAILABILITY: (fieldId: number, date: string) => `/booking/fields/${fieldId}/availability?date=${date}`,
    BOOKINGS: '/booking/bookings',
    MY_BOOKINGS: '/booking/bookings/my',
  },
  
  // User
  USER: {
    ALL: '/user',
  },
  
  // Health
  HEALTH: '/health',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
