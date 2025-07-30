# Mock Data Documentation 📊

This document provides a comprehensive overview of all mock data used in the Campervan Booking Dashboard application.

## 🏢 Stations Data

The application includes **12 stations** with diverse locations and vehicle availability:

| ID  | Station Name              | Location           | Available Vehicles |
| --- | ------------------------- | ------------------ | ------------------ |
| 1   | Central Station           | Downtown           | 15                 |
| 2   | Airport Station           | Airport Terminal   | 8                  |
| 3   | Beach Station             | Coastal Area       | 12                 |
| 4   | Mountain Station          | Ski Resort         | 6                  |
| 5   | City Center Station       | Shopping District  | 10                 |
| 6   | University Station        | Campus Area        | 7                  |
| 7   | Harbor Station            | Port Area          | 9                  |
| 8   | Park Station              | National Park      | 5                  |
| 9   | Business District Station | Financial Center   | 11                 |
| 10  | Resort Station            | Luxury Resort      | 4                  |
| 11  | Suburban Station          | Residential Area   | 8                  |
| 12  | Industrial Station        | Manufacturing Zone | 3                  |

### Station Search Features

- **Search by name**: "Central", "Airport", "Beach", etc.
- **Search by location**: "Downtown", "Terminal", "Coastal", etc.
- **Case-insensitive**: Works with any case combination
- **Partial matching**: "cent" will find "Central Station"

## 📅 Bookings Data

The application includes **20 realistic bookings** spread across the current month and next month:

### Current Month Bookings (10 bookings)

| ID  | Customer      | Station             | Vehicle   | Start Date | End Date   | Duration |
| --- | ------------- | ------------------- | --------- | ---------- | ---------- | -------- |
| 1   | John Smith    | Central Station     | Campervan | 15th       | 20th       | 5 days   |
| 2   | Sarah Johnson | Airport Station     | RV        | 16th       | 18th       | 2 days   |
| 3   | Mike Wilson   | Central Station     | Campervan | 17th       | 22nd       | 5 days   |
| 4   | Emily Davis   | Beach Station       | RV        | 18th       | 21st       | 3 days   |
| 5   | David Brown   | Airport Station     | Campervan | 19th       | 25th       | 6 days   |
| 6   | Lisa Anderson | Mountain Station    | Campervan | 21st       | 27th       | 6 days   |
| 7   | Robert Chen   | City Center Station | RV        | 23rd       | 25th       | 2 days   |
| 8   | Maria Garcia  | University Station  | Campervan | 26th       | 30th       | 4 days   |
| 9   | James Wilson  | Harbor Station      | RV        | 28th       | 3rd (next) | 5 days   |
| 10  | Jennifer Lee  | Park Station        | Campervan | 30th       | 6th (next) | 6 days   |

### Next Month Bookings (10 bookings)

| ID  | Customer              | Station                   | Vehicle   | Start Date | End Date | Duration |
| --- | --------------------- | ------------------------- | --------- | ---------- | -------- | -------- |
| 11  | Thomas Martinez       | Central Station           | Campervan | 1st        | 7th      | 6 days   |
| 12  | Amanda Taylor         | Business District Station | RV        | 3rd        | 5th      | 2 days   |
| 13  | Christopher Rodriguez | Resort Station            | Campervan | 6th        | 12th     | 6 days   |
| 14  | Jessica White         | Suburban Station          | RV        | 8th        | 10th     | 2 days   |
| 15  | Daniel Thompson       | Industrial Station        | Campervan | 11th       | 16th     | 5 days   |
| 16  | Nicole Adams          | Beach Station             | RV        | 13th       | 19th     | 6 days   |
| 17  | Kevin Lewis           | Mountain Station          | Campervan | 15th       | 17th     | 2 days   |
| 18  | Rachel Green          | City Center Station       | RV        | 18th       | 23rd     | 5 days   |
| 19  | Steven Hall           | University Station        | Campervan | 21st       | 26th     | 5 days   |
| 20  | Michelle Scott        | Harbor Station            | RV        | 24th       | 27th     | 3 days   |

## 🔧 API Functions

### Core Functions

#### `searchStations(query: string)`

- **Purpose**: Search stations by name or location
- **Delay**: 300ms simulation
- **Returns**: Filtered array of stations
- **Example**: `searchStations("Central")` returns Central Station

#### `getBookingDetails(bookingId: string)`

- **Purpose**: Get detailed booking information
- **Delay**: 200ms simulation
- **Returns**: Booking object with duration or null
- **Example**: `getBookingDetails("1")` returns John Smith's booking

#### `getAllStations()`

- **Purpose**: Get all available stations
- **Delay**: 100ms simulation
- **Returns**: Array of all 12 stations

### Helper Functions

#### `getAllBookings()`

- **Purpose**: Get all bookings
- **Delay**: 150ms simulation
- **Returns**: Array of all 20 bookings

#### `getBookingsByStation(stationId: string)`

- **Purpose**: Get bookings for a specific station
- **Delay**: 250ms simulation
- **Returns**: Filtered array of bookings
- **Example**: `getBookingsByStation("1")` returns all Central Station bookings

#### `getBookingsByDateRange(startDate: Date, endDate: Date)`

- **Purpose**: Get bookings within a date range
- **Delay**: 300ms simulation
- **Returns**: Filtered array of bookings
- **Logic**: Includes bookings that start, end, or span the date range

## 📊 Data Characteristics

### Vehicle Types

- **Campervan**: 12 bookings (60%)
- **RV**: 8 bookings (40%)

### Station Distribution

- **Most Popular**: Central Station (3 bookings)
- **Least Popular**: Industrial Station, Resort Station (1 booking each)

### Duration Patterns

- **Short stays** (2-3 days): 8 bookings (40%)
- **Medium stays** (4-5 days): 8 bookings (40%)
- **Long stays** (6+ days): 4 bookings (20%)

### Date Distribution

- **Current Month**: 10 bookings
- **Next Month**: 10 bookings
- **Cross-month bookings**: 2 bookings (spanning month boundaries)

## 🎯 Testing Scenarios

### Station Selection

1. **Search "Central"** → Shows Central Station
2. **Search "Downtown"** → Shows Central Station
3. **Search "Air"** → Shows Airport Station
4. **Search "Beach"** → Shows Beach Station

### Booking Display

1. **Select Central Station** → Shows 3 bookings (John Smith, Mike Wilson, Thomas Martinez)
2. **Select Airport Station** → Shows 2 bookings (Sarah Johnson, David Brown)
3. **Select Beach Station** → Shows 2 bookings (Emily Davis, Nicole Adams)

### Date Navigation

1. **Current week** → Shows bookings for current week
2. **Next week** → Shows bookings for next week
3. **Previous week** → Shows bookings for previous week

### Booking Details

1. **Click any booking** → Opens detailed modal
2. **Reschedule booking** → Shows date picker interface
3. **API call logging** → Console shows simulated API calls

## 🔄 Dynamic Date Generation

The mock data uses dynamic date generation to ensure relevance:

```typescript
// Current month dates
const getCurrentMonthDates = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  // Generate dates for current month
};

// Next month dates
const getNextMonthDates = () => {
  const now = new Date();
  const nextMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  // Generate dates for next month
};
```

This ensures that:

- ✅ Bookings are always relevant to current date
- ✅ Navigation works correctly across months
- ✅ Today's date highlighting works properly
- ✅ Week navigation shows appropriate data

## 🚀 Usage Examples

### Search for a Station

```typescript
const stations = await searchStations("Central");
// Returns: [{ id: "1", name: "Central Station", location: "Downtown", availableVehicles: 15 }]
```

### Get Booking Details

```typescript
const booking = await getBookingDetails("1");
// Returns: { id: "1", customerName: "John Smith", vehicleType: "Campervan", ... }
```

### Get Station Bookings

```typescript
const stationBookings = await getBookingsByStation("1");
// Returns: Array of all Central Station bookings
```

### Get Date Range Bookings

```typescript
const rangeBookings = await getBookingsByDateRange(startDate, endDate);
// Returns: Array of bookings within the specified date range
```

This comprehensive mock data provides a realistic testing environment for all application features! 🎉
