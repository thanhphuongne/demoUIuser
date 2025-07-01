import { Field, MainSport, SubCourt, TimeSlot } from '../types/field';
import { allFields, popularFields, mainSports } from '../data/field';

export const getPopularFields = (): Promise<Field[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(popularFields || []);
    }, 300);
  });
};

export const getAllFields = (): Promise<Field[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allFields || []);
    }, 500);
  });
};

// Lấy tất cả các loại môn thể thao chính
export const getMainSports = (): Promise<MainSport[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mainSports || []);
    }, 200);
  });
};

// Lấy các sân theo môn thể thao
export const getFieldsBySport = (sport: string): Promise<Field[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredFields = allFields.filter(field => field.sport === sport);
      resolve(filteredFields || []);
    }, 400);
  });
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