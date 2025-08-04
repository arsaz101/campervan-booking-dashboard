import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingDisplay from "../BookingDisplay";

const mockBooking = {
  id: "1",
  stationId: "1",
  startDate: new Date(),
  endDate: new Date(),
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
