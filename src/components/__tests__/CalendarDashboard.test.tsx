import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CalendarDashboard from "../CalendarDashboard";
import * as api from "../../services/api";

// Mock the api module
jest.mock("../../services/api");

const mockStations = [
  { id: "1", name: "Central Station", location: "Downtown" },
  { id: "2", name: "Airport Station", location: "Airport Terminal" },
];

const mockBookings = [
  {
    id: "1",
    stationId: "1",
    startDate: new Date(),
    endDate: new Date(),
    customerName: "John Doe",
    vehicleType: "Campervan",
    duration: 1,
  },
];

describe("CalendarDashboard", () => {
  beforeEach(() => {
    (api.searchStations as jest.Mock).mockResolvedValue(mockStations);
    (api.getBookingsByStation as jest.Mock).mockResolvedValue(mockBookings);
    (api.getBookingDetails as jest.Mock).mockResolvedValue(mockBookings[0]);
  });

  it("renders the dashboard", () => {
    render(<CalendarDashboard />);
    expect(screen.getByText("Campervan Bookings")).toBeInTheDocument();
  });

  it("searches for and selects a station", async () => {
    render(<CalendarDashboard />);
    const input = screen.getByPlaceholderText("Search stations...");
    fireEvent.change(input, { target: { value: "Central" } });

    await waitFor(() => {
      expect(api.searchStations).toHaveBeenCalledWith("Central");
    });

    fireEvent.click(screen.getByText("Central Station"));

    await waitFor(() => {
      expect(api.getBookingsByStation).toHaveBeenCalledWith("1");
    });
  });

  it("displays bookings for the selected station", async () => {
    render(<CalendarDashboard />);
    const input = screen.getByPlaceholderText("Search stations...");
    fireEvent.change(input, { target: { value: "Central" } });

    await waitFor(() => {
      fireEvent.click(screen.getByText("Central Station"));
    });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("opens the booking details modal when a booking is clicked", async () => {
    render(<CalendarDashboard />);
    const input = screen.getByPlaceholderText("Search stations...");
    fireEvent.change(input, { target: { value: "Central" } });

    await waitFor(() => {
      fireEvent.click(screen.getByText("Central Station"));
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText("John Doe"));
    });

    await waitFor(() => {
      expect(screen.getByText("Booking Details")).toBeInTheDocument();
    });
  });
});
