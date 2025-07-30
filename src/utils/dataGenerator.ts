import { Station, Booking } from "../types";

interface BookingWithDuration extends Booking {
  duration: number;
}

// Customer names for generating realistic data
const customerNames = [
  "John Smith",
  "Sarah Johnson",
  "Mike Wilson",
  "Emily Davis",
  "David Brown",
  "Lisa Anderson",
  "Robert Chen",
  "Maria Garcia",
  "James Wilson",
  "Jennifer Lee",
  "Thomas Martinez",
  "Amanda Taylor",
  "Christopher Rodriguez",
  "Jessica White",
  "Daniel Thompson",
  "Nicole Adams",
  "Kevin Lewis",
  "Rachel Green",
  "Steven Hall",
  "Michelle Scott",
  "Alex Turner",
  "Sophie Williams",
  "Michael Johnson",
  "Emma Davis",
  "Ryan Miller",
  "Olivia Taylor",
  "William Brown",
  "Ava Wilson",
  "Ethan Anderson",
  "Isabella Martinez",
  "Noah Garcia",
  "Mia Rodriguez",
  "Lucas Lee",
  "Charlotte White",
  "Mason Thompson",
  "Amelia Adams",
  "Logan Lewis",
  "Harper Green",
  "Jacob Hall",
  "Evelyn Scott",
  "Sebastian Turner",
];

// Vehicle types
const vehicleTypes = ["Campervan", "RV", "Motorhome", "Travel Trailer"];

// Station templates for generating additional stations
const stationTemplates = [
  { name: "Downtown Station", location: "City Center", vehicles: 12 },
  { name: "Suburban Station", location: "Residential Area", vehicles: 8 },
  { name: "Airport Station", location: "International Airport", vehicles: 15 },
  { name: "Beach Station", location: "Coastal Resort", vehicles: 10 },
  { name: "Mountain Station", location: "Ski Resort", vehicles: 6 },
  { name: "University Station", location: "Campus Area", vehicles: 7 },
  { name: "Business Station", location: "Financial District", vehicles: 11 },
  { name: "Harbor Station", location: "Port Area", vehicles: 9 },
  { name: "Park Station", location: "National Park", vehicles: 5 },
  { name: "Resort Station", location: "Luxury Resort", vehicles: 4 },
  { name: "Industrial Station", location: "Manufacturing Zone", vehicles: 3 },
  { name: "Shopping Station", location: "Mall Area", vehicles: 8 },
];

/**
 * Generate a random date within a specified range
 */
export const generateRandomDate = (startDate: Date, endDate: Date): Date => {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime);
};

/**
 * Generate a random duration between min and max days
 */
export const generateRandomDuration = (
  minDays: number = 1,
  maxDays: number = 14
): number => {
  return Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
};

/**
 * Generate a random customer name
 */
export const generateRandomCustomerName = (): string => {
  return customerNames[Math.floor(Math.random() * customerNames.length)];
};

/**
 * Generate a random vehicle type
 */
export const generateRandomVehicleType = (): string => {
  return vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
};

/**
 * Generate a random station
 */
export const generateRandomStation = (id: string): Station => {
  const template =
    stationTemplates[Math.floor(Math.random() * stationTemplates.length)];
  return {
    id,
    name: template.name,
    location: template.location,
    availableVehicles: template.vehicles,
  };
};

/**
 * Generate a booking with realistic data
 */
export const generateRandomBooking = (
  id: string,
  startDate: Date,
  endDate: Date
): BookingWithDuration => {
  const duration =
    Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  return {
    id,
    stationId: (Math.floor(Math.random() * 12) + 1).toString(), // Random station ID 1-12
    startDate,
    endDate,
    customerName: generateRandomCustomerName(),
    vehicleType: generateRandomVehicleType(),
    duration,
  };
};

/**
 * Generate multiple bookings for a date range
 */
export const generateBookingsForDateRange = (
  startDate: Date,
  endDate: Date,
  count: number = 10
): BookingWithDuration[] => {
  const bookings: BookingWithDuration[] = [];

  for (let i = 0; i < count; i++) {
    const bookingStartDate = generateRandomDate(startDate, endDate);
    const duration = generateRandomDuration(1, 7);
    const bookingEndDate = new Date(bookingStartDate);
    bookingEndDate.setDate(bookingEndDate.getDate() + duration - 1);

    bookings.push(
      generateRandomBooking(
        (i + 1).toString(),
        bookingStartDate,
        bookingEndDate
      )
    );
  }

  return bookings;
};

/**
 * Generate stations with custom count
 */
export const generateStations = (count: number = 12): Station[] => {
  const stations: Station[] = [];

  for (let i = 0; i < count; i++) {
    stations.push(generateRandomStation((i + 1).toString()));
  }

  return stations;
};

/**
 * Generate realistic booking patterns
 */
export const generateRealisticBookings = (): BookingWithDuration[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Generate bookings for current month
  const currentMonthStart = new Date(currentYear, currentMonth, 1);
  const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);
  const currentMonthBookings = generateBookingsForDateRange(
    currentMonthStart,
    currentMonthEnd,
    15
  );

  // Generate bookings for next month
  const nextMonthStart = new Date(currentYear, currentMonth + 1, 1);
  const nextMonthEnd = new Date(currentYear, currentMonth + 2, 0);
  const nextMonthBookings = generateBookingsForDateRange(
    nextMonthStart,
    nextMonthEnd,
    15
  );

  return [...currentMonthBookings, ...nextMonthBookings];
};

/**
 * Export booking data as JSON
 */
export const exportBookingsAsJSON = (
  bookings: BookingWithDuration[]
): string => {
  return JSON.stringify(bookings, null, 2);
};

/**
 * Import bookings from JSON
 */
export const importBookingsFromJSON = (
  jsonString: string
): BookingWithDuration[] => {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed.map((booking: any) => ({
      ...booking,
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
    }));
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
};
