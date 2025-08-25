# API Integration Documentation

This document explains how the frontend is integrated with the backend API for the SportBook application.

## Overview

The frontend has been updated to connect with the backend API running on `https://localhost:5001`. The integration includes:

- Authentication (login, register, profile management)
- Booking system (sports, venues, fields, bookings)
- User management
- Automatic token management and persistence

## Architecture

### Services Layer
- `src/services/authService.ts` - Authentication API calls
- `src/services/bookingService.ts` - Booking-related API calls  
- `src/services/userService.ts` - User management API calls

### State Management
- `src/stores/authStore.ts` - Authentication state with Zustand
- `src/stores/fieldStore.ts` - Field/booking state management

### Configuration
- `src/config/api.ts` - API endpoints and configuration

## Authentication Flow

### 1. Login Process
```typescript
// User enters credentials
const credentials = { email: 'user@example.com', password: 'password' };

// Store handles API call and token storage
await login(credentials);

// Token is automatically stored in localStorage
// User state is updated in Zustand store
```

### 2. Registration Process
```typescript
// User fills registration form
const registerData = {
  name: 'John Doe',
  email: 'john@example.com', 
  phone: '+84123456789',
  password: 'password123'
};

// API call maps to backend format
const apiPayload = {
  email: registerData.email,
  password: registerData.password,
  confirmPassword: registerData.password,
  fullName: registerData.name,
  accountType: 0
};
```

### 3. Token Management
- JWT tokens are automatically stored in localStorage
- Tokens are included in all authenticated API requests
- Authentication state persists across browser sessions
- Invalid tokens are automatically cleared

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/check` - Verify token validity

### Booking System
- `GET /api/booking/sports` - Get available sports
- `GET /api/booking/venues` - Get venues (with optional sport filter)
- `GET /api/booking/venues/{id}` - Get specific venue
- `GET /api/booking/venues/{id}/fields` - Get fields by venue
- `GET /api/booking/fields` - Get all fields
- `GET /api/booking/fields/{id}/availability?date=YYYY-MM-DD` - Check availability
- `POST /api/booking/bookings` - Create booking
- `GET /api/booking/bookings/my` - Get user's bookings

### User Management
- `GET /api/user` - Get all users

## Usage Examples

### Using Authentication
```typescript
import { useAuthStore } from '@/stores/authStore';

const LoginComponent = () => {
  const { login, loading, error } = useAuthStore();
  
  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      // User is now authenticated
    } catch (err) {
      // Error is handled by store
    }
  };
};
```

### Using Booking Service
```typescript
import { bookingService } from '@/services/bookingService';

const BookingComponent = () => {
  const [sports, setSports] = useState([]);
  
  useEffect(() => {
    const loadSports = async () => {
      try {
        const sportsData = await bookingService.getSports();
        setSports(sportsData);
      } catch (error) {
        console.error('Failed to load sports:', error);
      }
    };
    
    loadSports();
  }, []);
};
```

### Creating a Booking
```typescript
const createBooking = async () => {
  try {
    const bookingData = {
      fieldId: 1,
      startTime: '2025-08-20T10:00:00',
      endTime: '2025-08-20T11:00:00'
    };
    
    const booking = await bookingService.createBooking(bookingData);
    console.log('Booking created:', booking);
  } catch (error) {
    console.error('Booking failed:', error);
  }
};
```

## Error Handling

### API Errors
- Network errors are caught and displayed to users
- HTTP error responses are parsed and shown as user-friendly messages
- Authentication errors automatically clear invalid tokens

### Loading States
- All API calls include loading states
- UI components show loading indicators during API calls
- Buttons are disabled during loading to prevent duplicate requests

## Environment Configuration

Create a `.env.local` file to configure the API URL:

```env
NEXT_PUBLIC_API_URL=https://localhost:5001/api
```

If not set, defaults to `https://localhost:5001/api`.

## Testing the Integration

1. **Start the backend API** on `https://localhost:5001`
2. **Run the frontend** with `npm run dev`
3. **Test authentication** by registering/logging in
4. **Test booking features** by browsing sports, venues, and fields
5. **Create test bookings** when authenticated

## Fallback Behavior

The integration includes fallback to mock data when the API is unavailable:

- Field service falls back to mock data if API calls fail
- Authentication shows appropriate error messages
- Users can still browse the UI with limited functionality

## Security Considerations

- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- All API requests include proper authentication headers
- Sensitive data is not logged to console in production
- HTTPS is required for the API connection

## Next Steps

1. **Add error boundaries** for better error handling
2. **Implement refresh token logic** for long-lived sessions  
3. **Add request/response interceptors** for global error handling
4. **Implement caching** for frequently accessed data
5. **Add offline support** with service workers
