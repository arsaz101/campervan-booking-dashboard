import { renderHook, act } from "@testing-library/react";
import { useBookingsStore } from "../bookingsStore";

describe("Bookings Store", () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useBookingsStore.setState({
        bookings: [],
        selectedStation: null,
        selectedBooking: null,
        currentWeek: new Date(),
        loading: false,
      });
    });
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useBookingsStore());

    expect(result.current.bookings).toEqual([]);
    expect(result.current.selectedStation).toBeNull();
    expect(result.current.selectedBooking).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should set bookings", () => {
    const { result } = renderHook(() => useBookingsStore());
    const mockBookings = [
      {
        id: "1",
        stationId: "1",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-01-20"),
        customerName: "John Smith",
        vehicleType: "Campervan",
        duration: 5,
      },
    ];

    act(() => {
      result.current.setBookings(mockBookings);
    });

    expect(result.current.bookings).toEqual(mockBookings);
  });

  it("should set selected station", () => {
    const { result } = renderHook(() => useBookingsStore());
    const mockStation = {
      id: "1",
      name: "Central Station",
      location: "Downtown",
      availableVehicles: 15,
    };

    act(() => {
      result.current.setSelectedStation(mockStation);
    });

    expect(result.current.selectedStation).toEqual(mockStation);
  });

  it("should set selected booking", () => {
    const { result } = renderHook(() => useBookingsStore());
    const mockBooking = {
      id: "1",
      stationId: "1",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-01-20"),
      customerName: "John Smith",
      vehicleType: "Campervan",
      duration: 5,
    };

    act(() => {
      result.current.setSelectedBooking(mockBooking);
    });

    expect(result.current.selectedBooking).toEqual(mockBooking);
  });

  it("should update booking", () => {
    const { result } = renderHook(() => useBookingsStore());
    const mockBookings = [
      {
        id: "1",
        stationId: "1",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-01-20"),
        customerName: "John Smith",
        vehicleType: "Campervan",
        duration: 5,
      },
    ];

    act(() => {
      result.current.setBookings(mockBookings);
    });

    act(() => {
      result.current.updateBooking("1", { customerName: "Jane Doe" });
    });

    expect(result.current.bookings[0].customerName).toBe("Jane Doe");
  });

  it("should add booking", () => {
    const { result } = renderHook(() => useBookingsStore());
    const mockBooking = {
      id: "2",
      stationId: "1",
      startDate: new Date("2024-01-16"),
      endDate: new Date("2024-01-18"),
      customerName: "Jane Doe",
      vehicleType: "RV",
      duration: 2,
    };

    act(() => {
      result.current.addBooking(mockBooking);
    });

    expect(result.current.bookings).toHaveLength(1);
    expect(result.current.bookings[0]).toEqual(mockBooking);
  });

  it("should remove booking", () => {
    const { result } = renderHook(() => useBookingsStore());
    const mockBookings = [
      {
        id: "1",
        stationId: "1",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-01-20"),
        customerName: "John Smith",
        vehicleType: "Campervan",
        duration: 5,
      },
    ];

    act(() => {
      result.current.setBookings(mockBookings);
    });

    act(() => {
      result.current.removeBooking("1");
    });

    expect(result.current.bookings).toHaveLength(0);
  });

  it("should set loading state", () => {
    const { result } = renderHook(() => useBookingsStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);
  });
});
