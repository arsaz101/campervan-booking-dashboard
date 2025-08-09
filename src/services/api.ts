import { Station, Booking } from "../types";
import { currentMonthDates, nextMonthDates } from "../utils/dates";

// Mock data for stations
const mockStations: Station[] = [
  {
    id: "1",
    name: "Central Station",
    location: "Downtown",
    availableVehicles: 15,
  },
  {
    id: "2",
    name: "Airport Station",
    location: "Airport Terminal",
    availableVehicles: 8,
  },
  {
    id: "3",
    name: "Beach Station",
    location: "Coastal Area",
    availableVehicles: 12,
  },
  {
    id: "4",
    name: "Mountain Station",
    location: "Ski Resort",
    availableVehicles: 6,
  },
  {
    id: "5",
    name: "City Center Station",
    location: "Shopping District",
    availableVehicles: 10,
  },
  {
    id: "6",
    name: "University Station",
    location: "Campus Area",
    availableVehicles: 7,
  },
  {
    id: "7",
    name: "Harbor Station",
    location: "Port Area",
    availableVehicles: 9,
  },
  {
    id: "8",
    name: "Park Station",
    location: "National Park",
    availableVehicles: 5,
  },
  {
    id: "9",
    name: "Business District Station",
    location: "Financial Center",
    availableVehicles: 11,
  },
  {
    id: "10",
    name: "Resort Station",
    location: "Luxury Resort",
    availableVehicles: 4,
  },
  {
    id: "11",
    name: "Suburban Station",
    location: "Residential Area",
    availableVehicles: 8,
  },
  {
    id: "12",
    name: "Industrial Station",
    location: "Manufacturing Zone",
    availableVehicles: 3,
  },
];

// Mock data for booking details with more realistic scenarios
const mockBookingDetails: { [key: string]: Booking & { duration: number } } = {
  // Current month bookings
  "1": {
    id: "1",
    stationId: "1",
    startDate: currentMonthDates[14], // 15th of current month
    endDate: currentMonthDates[19], // 20th of current month
    customerName: "John Smith",
    vehicleType: "Campervan",
    duration: 5,
  },
  "2": {
    id: "2",
    stationId: "2",
    startDate: currentMonthDates[15], // 16th of current month
    endDate: currentMonthDates[17], // 18th of current month
    customerName: "Sarah Johnson",
    vehicleType: "RV",
    duration: 2,
  },
  "3": {
    id: "3",
    stationId: "1",
    startDate: currentMonthDates[16], // 17th of current month
    endDate: currentMonthDates[21], // 22nd of current month
    customerName: "Mike Wilson",
    vehicleType: "Campervan",
    duration: 5,
  },
  "4": {
    id: "4",
    stationId: "3",
    startDate: currentMonthDates[17], // 18th of current month
    endDate: currentMonthDates[20], // 21st of current month
    customerName: "Emily Davis",
    vehicleType: "RV",
    duration: 3,
  },
  "5": {
    id: "5",
    stationId: "2",
    startDate: currentMonthDates[18], // 19th of current month
    endDate: currentMonthDates[24], // 25th of current month
    customerName: "David Brown",
    vehicleType: "Campervan",
    duration: 6,
  },
  "6": {
    id: "6",
    stationId: "4",
    startDate: currentMonthDates[20], // 21st of current month
    endDate: currentMonthDates[26], // 27th of current month
    customerName: "Lisa Anderson",
    vehicleType: "Campervan",
    duration: 6,
  },
  "7": {
    id: "7",
    stationId: "5",
    startDate: currentMonthDates[22], // 23rd of current month
    endDate: currentMonthDates[24], // 25th of current month
    customerName: "Robert Chen",
    vehicleType: "RV",
    duration: 2,
  },
  "8": {
    id: "8",
    stationId: "6",
    startDate: currentMonthDates[25], // 26th of current month
    endDate: currentMonthDates[29], // 30th of current month
    customerName: "Maria Garcia",
    vehicleType: "Campervan",
    duration: 4,
  },
  "9": {
    id: "9",
    stationId: "7",
    startDate: currentMonthDates[27], // 28th of current month
    endDate: nextMonthDates[2], // 3rd of next month
    customerName: "James Wilson",
    vehicleType: "RV",
    duration: 5,
  },
  "10": {
    id: "10",
    stationId: "8",
    startDate: currentMonthDates[29], // 30th of current month
    endDate: nextMonthDates[5], // 6th of next month
    customerName: "Jennifer Lee",
    vehicleType: "Campervan",
    duration: 6,
  },
  // Next month bookings
  "11": {
    id: "11",
    stationId: "1",
    startDate: nextMonthDates[0], // 1st of next month
    endDate: nextMonthDates[6], // 7th of next month
    customerName: "Thomas Martinez",
    vehicleType: "Campervan",
    duration: 6,
  },
  "12": {
    id: "12",
    stationId: "9",
    startDate: nextMonthDates[2], // 3rd of next month
    endDate: nextMonthDates[4], // 5th of next month
    customerName: "Amanda Taylor",
    vehicleType: "RV",
    duration: 2,
  },
  "13": {
    id: "13",
    stationId: "10",
    startDate: nextMonthDates[5], // 6th of next month
    endDate: nextMonthDates[11], // 12th of next month
    customerName: "Christopher Rodriguez",
    vehicleType: "Campervan",
    duration: 6,
  },
  "14": {
    id: "14",
    stationId: "11",
    startDate: nextMonthDates[7], // 8th of next month
    endDate: nextMonthDates[9], // 10th of next month
    customerName: "Jessica White",
    vehicleType: "RV",
    duration: 2,
  },
  "15": {
    id: "15",
    stationId: "12",
    startDate: nextMonthDates[10], // 11th of next month
    endDate: nextMonthDates[15], // 16th of next month
    customerName: "Daniel Thompson",
    vehicleType: "Campervan",
    duration: 5,
  },
  "16": {
    id: "16",
    stationId: "3",
    startDate: nextMonthDates[12], // 13th of next month
    endDate: nextMonthDates[18], // 19th of next month
    customerName: "Nicole Adams",
    vehicleType: "RV",
    duration: 6,
  },
  "17": {
    id: "17",
    stationId: "4",
    startDate: nextMonthDates[14], // 15th of next month
    endDate: nextMonthDates[16], // 17th of next month
    customerName: "Kevin Lewis",
    vehicleType: "Campervan",
    duration: 2,
  },
  "18": {
    id: "18",
    stationId: "5",
    startDate: nextMonthDates[17], // 18th of next month
    endDate: nextMonthDates[22], // 23rd of next month
    customerName: "Rachel Green",
    vehicleType: "RV",
    duration: 5,
  },
  "19": {
    id: "19",
    stationId: "6",
    startDate: nextMonthDates[20], // 21st of next month
    endDate: nextMonthDates[25], // 26th of next month
    customerName: "Steven Hall",
    vehicleType: "Campervan",
    duration: 5,
  },
  "20": {
    id: "20",
    stationId: "7",
    startDate: nextMonthDates[23], // 24th of next month
    endDate: nextMonthDates[26], // 27th of next month
    customerName: "Michelle Scott",
    vehicleType: "RV",
    duration: 3,
  },
};

// API functions
export const searchStations = async (query: string): Promise<Station[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const filteredStations = mockStations.filter(
    (station) =>
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.location.toLowerCase().includes(query.toLowerCase())
  );

  return filteredStations;
};

export const getBookingDetails = async (
  bookingId: string
): Promise<(Booking & { duration: number }) | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return mockBookingDetails[bookingId] || null;
};

export const getAllStations = async (): Promise<Station[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return mockStations;
};

// Additional helper function to get all bookings
export const getAllBookings = async (): Promise<
  (Booking & { duration: number })[]
> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 150));

  return Object.values(mockBookingDetails);
};

// Helper function to get bookings for a specific station
export const getBookingsByStation = async (
  stationId: string
): Promise<(Booking & { duration: number })[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 250));

  return Object.values(mockBookingDetails).filter(
    (booking) => booking.stationId === stationId
  );
};

// Helper function to get bookings for a specific date range
export const getBookingsByDateRange = async (
  startDate: Date,
  endDate: Date
): Promise<(Booking & { duration: number })[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return Object.values(mockBookingDetails).filter(
    (booking) =>
      (booking.startDate >= startDate && booking.startDate <= endDate) ||
      (booking.endDate >= startDate && booking.endDate <= endDate) ||
      (booking.startDate <= startDate && booking.endDate >= endDate)
  );
};

// Reschedule booking function
export const rescheduleBooking = async (
  bookingId: string,
  newStartDate: Date,
  newEndDate: Date
): Promise<(Booking & { duration: number }) | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if booking exists
  if (!mockBookingDetails[bookingId]) {
    throw new Error("Booking not found");
  }

  // Calculate new duration
  const newDuration =
    Math.ceil(
      (newEndDate.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  // Update the booking
  const updatedBooking: Booking & { duration: number } = {
    ...mockBookingDetails[bookingId],
    startDate: newStartDate,
    endDate: newEndDate,
    duration: newDuration,
  };

  // Update the mock data
  mockBookingDetails[bookingId] = updatedBooking;

  // Log the API call (as requested in the requirements)
  console.log("API Call: PUT /api/bookings/" + bookingId, {
    startDate: newStartDate.toISOString(),
    endDate: newEndDate.toISOString(),
    duration: newDuration,
    action: "Booking rescheduled successfully",
  });

  return updatedBooking;
};
