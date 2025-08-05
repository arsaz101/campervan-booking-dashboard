import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingDisplay from "../BookingDisplay";
import { format } from "date-fns";

const mockBooking = {
  id: "1",
  stationId: "1",
  startDate: new Date("2025-01-01T10:00:00"),
  endDate: new Date("2025-01-02T12:00:00"),
  customerName: "John Doe",
  vehicleType: "Campervan",
  duration: 1,
};

describe("BookingDisplay", () => {
  it("renders booking details", () => {
    render(
      <BookingDisplay
        booking={mockBooking}
        stationName="Central Station"
        onClose={() => {}}
      />
    );

    expect(screen.getByText("Booking Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Central Station")).toBeInTheDocument();
    expect(screen.getByText(format(mockBooking.startDate, "PPP p"))).toBeInTheDocument();
    expect(screen.getByText(format(mockBooking.endDate, "PPP p"))).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <BookingDisplay
        booking={mockBooking}
        stationName="Central Station"
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByText("Back to Calendar"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onReschedule when the reschedule button is clicked", () => {
    const onReschedule = jest.fn();
    render(
      <BookingDisplay
        booking={mockBooking}
        stationName="Central Station"
        onClose={() => {}}
        onReschedule={onReschedule}
      />
    );

    fireEvent.click(screen.getByText("Reschedule"));
    expect(onReschedule).toHaveBeenCalled();
  });
});