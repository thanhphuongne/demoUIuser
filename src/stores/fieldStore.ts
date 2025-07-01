import { create } from 'zustand';
import { 
  getPopularFields,
  getAllFields,
  getMainSports,
  getFieldsBySport,
  getSubCourts,
  getTimeSlots
} from '../services/fieldService';
import { Field, MainSport, SubCourt, TimeSlot } from '../types/field';

interface FieldState {
  popularFields: Field[];
  allFields: Field[];
  mainSports: MainSport[];
  fieldsBySport: Field[];
  subCourts: SubCourt[];
  timeSlots: TimeSlot[];
  loading: boolean;
  error: string | null;
  
  fetchPopularFields: () => Promise<void>;
  fetchAllFields: () => Promise<void>;
  fetchMainSports: () => Promise<void>;
  fetchFieldsBySport: (sport: string) => Promise<void>;
  fetchSubCourts: (fieldId: number) => Promise<void>;
  fetchTimeSlots: (fieldId: number, subCourtId: string) => Promise<void>;
}

export const useFieldStore = create<FieldState>((set) => ({
  popularFields: [],
  allFields: [],
  mainSports: [],
  fieldsBySport: [],
  subCourts: [],
  timeSlots: [],
  loading: false,
  error: null,

  fetchPopularFields: async () => {
    set({ loading: true, error: null });
    try {
      const fields = await getPopularFields();
      set({ popularFields: fields, loading: false });
    } catch (err) {
      set({
        popularFields: [],
        error: 'Failed to fetch popular fields',
        loading: false
      });
    }
  },

  fetchAllFields: async () => {
    set({ loading: true, error: null });
    try {
      const fields = await getAllFields();
      set({ allFields: fields, loading: false });
    } catch (err) {
      set({
        allFields: [],
        error: 'Failed to fetch all fields',
        loading: false
      });
    }
  },

  fetchMainSports: async () => {
    set({ loading: true, error: null });
    try {
      const sports = await getMainSports();
      set({ mainSports: sports, loading: false });
    } catch (err) {
      set({
        mainSports: [],
        error: 'Failed to fetch main sports',
        loading: false
      });
    }
  },

  fetchFieldsBySport: async (sport: string) => {
    set({ loading: true, error: null });
    try {
      const fields = await getFieldsBySport(sport);
      set({ fieldsBySport: fields, loading: false });
    } catch (err) {
      set({
        fieldsBySport: [],
        error: `Failed to fetch ${sport} fields`,
        loading: false
      });
    }
  },

  fetchSubCourts: async (fieldId: number) => {
    set({ loading: true, error: null });
    try {
      const subCourts = await getSubCourts(fieldId);
      set({ subCourts, loading: false });
    } catch (err) {
      set({
        subCourts: [],
        error: 'Failed to fetch sub courts',
        loading: false
      });
    }
  },

  fetchTimeSlots: async (fieldId: number, subCourtId: string) => {
    set({ loading: true, error: null });
    try {
      const timeSlots = await getTimeSlots(fieldId, subCourtId);
      set({ timeSlots, loading: false });
    } catch (err) {
      set({
        timeSlots: [],
        error: 'Failed to fetch time slots',
        loading: false
      });
    }
  }
}));