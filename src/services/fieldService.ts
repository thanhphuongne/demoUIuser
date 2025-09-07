import { Field, MainSport, SubCourt, TimeSlot } from '../types/field';
import { allFields, popularFields, mainSports } from '../data/field';
import { bookingService, Sport, Venue, Field as ApiField } from './bookingService';

// Helper function to convert API data to frontend format
const convertApiFieldToField = (apiField: ApiField, venue?: Venue): Field => {
  // Map sport type to frontend format
  const sportMap: { [key: string]: string } = {
    'Soccer': 'football',
    'Football': 'football',
    'Badminton': 'badminton',
    'Tennis': 'tennis',
    'Basketball': 'basketball'
  };

  // Parse facilities into amenities array
  const amenities = venue?.facilities ? venue.facilities.split(', ') : ['Đỗ xe', 'WC'];

  return {
    id: apiField.id,
    name: apiField.fieldName,
    location: apiField.venueAddress || venue?.address || 'Unknown',
    sport: sportMap[apiField.sportType] || 'football',
    rating: 4.5, // Default rating since not provided by API
    reviews: 0, // Default reviews since not provided by API
    price: `${apiField.basePrice.toLocaleString('vi-VN')}đ/giờ`,
    image: apiField.photos || 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=500',
    amenities: amenities,
    description: apiField.description || '',
    subCourts: [] // Will be populated separately if needed
  };
};

// Use real API with fallback to mock data
export const getPopularFields = async (): Promise<Field[]> => {
  try {
    // Get all fields from API
    const apiFields = await bookingService.getAllFields();

    // Get venues to enrich field data
    const venues = await bookingService.getVenues();
    const venueMap = new Map(venues.map(v => [v.id, v]));

    // Convert and return first 6 as popular fields
    const convertedFields = apiFields.slice(0, 6).map(field => {
      const venue = venueMap.get(field.venueId);
      return convertApiFieldToField(field, venue);
    });

    return convertedFields;
  } catch (error) {
    console.warn('Failed to fetch from API, using mock data:', error);
    // Fallback to mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(popularFields || []);
      }, 300);
    });
  }
};

export const getAllFields = async (): Promise<Field[]> => {
  try {
    // Get all fields from API
    const apiFields = await bookingService.getAllFields();

    // Get venues to enrich field data
    const venues = await bookingService.getVenues();
    const venueMap = new Map(venues.map(v => [v.id, v]));

    // Convert API fields to frontend format
    const convertedFields = apiFields.map(field => {
      const venue = venueMap.get(field.venueId);
      return convertApiFieldToField(field, venue);
    });

    return convertedFields;
  } catch (error) {
    console.warn('Failed to fetch from API, using mock data:', error);
    // Fallback to mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(allFields || []);
      }, 500);
    });
  }
};

// Lấy tất cả các loại môn thể thao chính
export const getMainSports = async (): Promise<MainSport[]> => {
  try {
    const apiSports = await bookingService.getSports();

    // Map sport icons based on sport name
    const sportIconMap: { [key: string]: string } = {
      'Soccer': '⚽',
      'Football': '⚽',
      'Badminton': '🏸',
      'Tennis': '🎾',
      'Basketball': '🏀',
      'Volleyball': '🏐'
    };

    // Convert API sports to frontend format
    const convertedSports: MainSport[] = apiSports.map(sport => ({
      id: sport.id.toString(),
      name: sport.sportName,
      icon: sportIconMap[sport.sportName] || '⚽',
      description: sport.description || '',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=500'
    }));

    return convertedSports;
  } catch (error) {
    console.warn('Failed to fetch sports from API, using mock data:', error);
    // Fallback to mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mainSports || []);
      }, 200);
    });
  }
};

// Lấy các sân theo môn thể thao
export const getFieldsBySport = async (sport: string): Promise<Field[]> => {
  try {
    // Get all fields first
    const allApiFields = await bookingService.getAllFields();

    // Map sport names for filtering
    const sportMap: { [key: string]: string } = {
      'football': 'Soccer',
      'badminton': 'Badminton',
      'tennis': 'Tennis',
      'basketball': 'Basketball'
    };

    const targetSportType = sportMap[sport.toLowerCase()];
    if (!targetSportType) {
      return [];
    }

    // Filter fields by sport type
    const filteredFields = allApiFields.filter(field =>
      field.sportType === targetSportType
    );

    // Get venues to enrich field data
    const venues = await bookingService.getVenues();
    const venueMap = new Map(venues.map(v => [v.id, v]));

    // Convert to frontend format
    const convertedFields = filteredFields.map(field => {
      const venue = venueMap.get(field.venueId);
      return convertApiFieldToField(field, venue);
    });

    return convertedFields;
  } catch (error) {
    console.warn('Failed to fetch fields by sport from API, using mock data:', error);
    // Fallback to mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredFields = allFields.filter(field => field.sport === sport);
        resolve(filteredFields || []);
      }, 400);
    });
  }
};

// Lấy tất cả sân nhỏ của sân lớn
export const getSubCourts = (fieldId: number): Promise<SubCourt[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const field = allFields.find(f => f.id === fieldId);
      resolve(field?.subCourts || []);
    }, 300);
  });
};

// Lấy tất cả slot của mỗi sân nhỏ
export const getTimeSlots = (fieldId: number, subCourtId: string): Promise<TimeSlot[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const field = allFields.find(f => f.id === fieldId);
      const subCourt = field?.subCourts.find(sc => sc.id === subCourtId);
      resolve(subCourt?.timeSlots || []);
    }, 250);
  });
};