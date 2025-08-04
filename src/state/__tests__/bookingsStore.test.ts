import { renderHook } from "@testing-library/react";
import { act } from "react";
import useBookingsStore from "../bookingsStore";

describe("useBookingsStore", () => {
  it("should set and get bookings", () => {
    const { result } = renderHook(() => useBookingsStore());
    const bookings = [{ id: "1", customerName: "Test" }];
    act(() => {
      result.current.setBookings(bookings);
    });
    expect(result.current.bookings).toEqual(bookings);
  });

  it("should set and get selected station", () => {
    const { result } = renderHook(() => useBookingsStore());
    const station = { id: "1", name: "Test Station" };
    act(() => {
      result.current.setSelectedStation(station);
    });
    expect(result.current.selectedStation).toEqual(station);
  });

  it("should set and get selected booking", () => {
    const { result } = renderHook(() => useBookingsStore());
    const booking = { id: "1", customerName: "Test" };
    act(() => {
      result.current.setSelectedBooking(booking);
    });
    expect(result.current.selectedBooking).toEqual(booking);
  });

  it("should set and get current week", () => {
    const { result } = renderHook(() => useBookingsStore());
    const date = new Date("2024-01-01");
    act(() => {
      result.current.setCurrentWeek(date);
    });
    expect(result.current.currentWeek).toEqual(date);
  });

  it("should set and get loading state", () => {
    const { result } = renderHook(() => useBookingsStore());
    act(() => {
      result.current.setLoading(true);
    });
    expect(result.current.loading).toBe(true);
  });

  it("should update a booking", () => {
    const { result } = renderHook(() => useBookingsStore());
    const bookings = [{ id: "1", customerName: "Test" }];
    act(() => {
      result.current.setBookings(bookings);
    });
    const updates = { customerName: "Updated Test" };
    act(() => {
      result.current.updateBooking("1", updates);
    });
    expect(result.current.bookings[0].customerName).toBe("Updated Test");
  });
});
