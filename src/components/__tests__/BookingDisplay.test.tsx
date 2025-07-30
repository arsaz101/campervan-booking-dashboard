import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingDisplay from "../BookingDisplay";

const mockBooking = {
  id: "1",
  stationId: "1",
  startDate: new Date("2024-01-15"),
  endDate: new Date("2024-01-20"),
  customerName: "John Smith",
  vehicleType: "Campervan",
  duration: 5,
};

const mockOnClose = jest.fn();
const mockOnReschedule = jest.fn();

describe("BookingDisplay", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders booking details correctly", () => {
    render(
      <BookingDisplay
        booking={mockBooking}
        stationName="Central Station"
        onClose={mockOnClose}
        onReschedule={mockOnReschedule}
      />
    );

    expect(screen.getByText("Booking Details")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("Booking ID: 1")).toBeInTheDocument();
    expect(screen.getByText("5 days")).toBeInTheDocument();
    expect(screen.getByText("Campervan")).toBeInTheDocument();
    expect(screen.getByText("Central Station")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <BookingDisplay
        booking={mockBooking}
        stationName="Central Station"
        onClose={mockOnClose}
        onReschedule={mockOnReschedule}
      />
    );

    const closeButton = screen.getAllByRole("button")[0];
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onReschedule when reschedule button is clicked", async () => {
    render(
      <BookingDisplay
        booking={mockBooking}
        stationName="Central Station"
        onClose={mockOnClose}
        onReschedule={mockOnReschedule}
      />
    );

    const rescheduleButton = screen.getByText("Reschedule");
    fireEvent.click(rescheduleButton);

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(mockOnReschedule).toHaveBeenCalledWith(
        "1",
        expect.any(Date),
        expect.any(Date)
      );
    });
  });

  it("calls onClose when back to calendar button is clicked", () => {
    render(
      <BookingDisplay
        booking={mockBooking}
        stationName="Central Station"
        onClose={mockOnClose}
        onReschedule={mockOnReschedule}
      />
    );

    const backButton = screen.getByText("Back to Calendar");
    fireEvent.click(backButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("displays unknown station when station name is not provided", () => {
    render(
      <BookingDisplay
        booking={mockBooking}
        onClose={mockOnClose}
        onReschedule={mockOnReschedule}
      />
    );

    expect(screen.getByText("Unknown Station")).toBeInTheDocument();
  });

  it("does not show reschedule button when onReschedule is not provided", () => {
    render(
      <BookingDisplay
        booking={mockBooking}
        stationName="Central Station"
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText("Reschedule")).not.toBeInTheDocument();
  });
});
