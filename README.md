# Campervan Booking Dashboard 🚐

A modern, responsive React application for managing campervan bookings with a calendar view, station selection, and booking management features.

## Features ✨

### 1. Reusable Autocomplete Component 🔍

- **Real-time search**: Performs search as the user types with debouncing
- **Remote API integration**: Queries stations from a mock API
- **Keyboard navigation**: Arrow keys, Enter, and Escape support
- **Accessibility**: Full keyboard and screen reader support
- **Responsive design**: Works on mobile and desktop

### 2. Calendar View 📅

- **Week view**: 7-day calendar grid showing each weekday
- **Responsive design**: Mobile-first approach with different layouts for mobile and desktop
- **Pagination**: Navigate between weeks with Previous/Next buttons
- **Station filtering**: Select a station to view only relevant bookings
- **Booking display**: Shows bookings that start, end, or are ongoing on each day
- **Visual indicators**: Today's date is highlighted with a blue border

### 3. Booking Detail View 📝

- **Comprehensive information**: Customer name, dates, duration, vehicle type, and station
- **Modal interface**: Clean, accessible modal for viewing booking details
- **Reschedule functionality**: Option to reschedule bookings with date pickers
- **API integration**: Fetches detailed booking information from mock API

### 4. Optional Features 🎯

- **Reschedule Booking**: Date picker interface for changing booking dates
- **State Management**: Zustand store for global state management
- **Unit Tests**: Comprehensive test coverage for all components and services

## Technology Stack 🛠️

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **date-fns** for date manipulation
- **Zustand** for state management
- **Jest** and **React Testing Library** for testing
- **Vite** for build tooling

## Getting Started 🚀

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd campervan-booking-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure 📁

```
src/
├── components/
│   ├── __tests__/           # Component tests
│   ├── Autocomplete.tsx     # Reusable autocomplete component
│   ├── BookingDisplay.tsx   # Booking detail modal
│   ├── CalendarDashboard.tsx # Main calendar view
│   └── RescheduleModal.tsx  # Reschedule booking modal
├── services/
│   ├── __tests__/           # Service tests
│   └── api.ts              # Mock API functions
├── types/
│   └── index.ts            # TypeScript type definitions
└── setupTests.ts           # Jest setup configuration
```

## API Endpoints 📡

The application uses mock API endpoints that simulate real API calls:

### Stations

- `GET /api/stations/search?query={query}` - Search stations by name or location
- `GET /api/stations` - Get all stations

### Bookings

- `GET /api/bookings/{id}` - Get booking details by ID
- `PUT /api/bookings/{id}` - Update booking (for rescheduling)

## Testing 🧪

The project includes comprehensive unit tests:

- **Component tests**: Test React components with React Testing Library
- **Service tests**: Test API service functions
- **State tests**: Test Zustand store functionality

Run tests with:

```bash
npm test
```

## Features in Detail 🔍

### Autocomplete Component

The autocomplete component provides:

- Debounced search (300ms delay)
- Minimum 2 characters required for search
- Keyboard navigation (arrow keys, enter, escape)
- Click outside to close
- Loading states
- Error handling

### Calendar Dashboard

The main dashboard features:

- Week-based navigation
- Station selection with autocomplete
- Responsive grid layout
- Booking filtering by station
- Visual indicators for today's date
- Loading states for API calls

### Booking Management

Booking features include:

- Detailed booking information display
- Reschedule functionality with date validation
- API call logging for reschedule operations
- Modal-based interface
- Responsive design

## State Management 📊

The application uses Zustand for state management with the following store structure:

```typescript
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
```

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- Built with React and TypeScript
- Styled with Tailwind CSS
- Icons from Heroicons
- Date handling with date-fns
- State management with Zustand
