import { create } from "zustand";
import { Booking, Station } from "../types";

interface BookingWithDuration extends Booking {
  duration: number;
}

interface BookingsState {
  bookings: BookingWithDuration[];
  selectedStation: Station | null;
  selectedBooking: BookingWithDuration | null;
  currentWeek: Date;
  loading: boolean;

  // Actions
  setBookings: (bookings: BookingWithDuration[]) => void;
  setSelectedStation: (station: Station | null) => void;
  setSelectedBooking: (booking: BookingWithDuration | null) => void;
  setCurrentWeek: (date: Date) => void;
  setLoading: (loading: boolean) => void;
  updateBooking: (
    bookingId: string,
    updates: Partial<BookingWithDuration>
  ) => void;
  addBooking: (booking: BookingWithDuration) => void;
  removeBooking: (bookingId: string) => void;
}

export const useBookingsStore = create<BookingsState>((set, get) => ({
  bookings: [],
  selectedStation: null,
  selectedBooking: null,
  currentWeek: new Date(),
  loading: false,

  setBookings: (bookings) => set({ bookings }),
  setSelectedStation: (station) => set({ selectedStation: station }),
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
  setCurrentWeek: (date) => set({ currentWeek: date }),
  setLoading: (loading) => set({ loading }),

  updateBooking: (bookingId, updates) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, ...updates } : booking
      ),
    }));
  },

  addBooking: (booking) => {
    set((state) => ({
      bookings: [...state.bookings, booking],
    }));
  },

  removeBooking: (bookingId) => {
    set((state) => ({
      bookings: state.bookings.filter((booking) => booking.id !== bookingId),
    }));
  },
}));
