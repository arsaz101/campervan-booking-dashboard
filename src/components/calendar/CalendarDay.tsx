import React from "react";
import { isToday, isSameDay } from "date-fns";
import { BookingWithDuration } from "../../types";

interface CalendarDayProps {
  day: Date;
  bookings: BookingWithDuration[];
  onBookingClick: (booking: BookingWithDuration) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, bookings, onBookingClick }) => {
  const isTodayDate = isToday(day);

  return (
    <div
      className={`border-r border-gray-200 last:border-r-0 ${
        isTodayDate ? "bg-blue-50" : ""
      }`}
    >
      {Array.from({ length: 24 }, (_, hour) => {
        const currentHourStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 0, 0);
        const currentHourEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 59, 59);

        // Filter bookings active in this specific hour
        const bookingsInThisHour = bookings.filter(booking =>
          (
            (booking.startDate.getTime() < currentHourEnd.getTime() && booking.endDate.getTime() > currentHourStart.getTime())
          )
        );

        return (
          <div
            key={hour}
            className={`h-12 border-b border-gray-100 relative ${
              isTodayDate ? "bg-blue-50" : ""
            }`}
          >
            {/* Bookings for this hour */}
            {bookingsInThisHour.map((booking, index) => {
              const bookingStart = booking.startDate;
              const bookingEnd = booking.endDate;

              const isStartHour = isSameDay(bookingStart, day) && bookingStart.getHours() === hour;
              const isEndHour = isSameDay(bookingEnd, day) && bookingEnd.getHours() === hour;

              // Calculate left offset and width for overlapping bookings
              const offset = index * 10; // Adjust this value as needed for visual separation
              const width = 100 - offset; // Reduce width to make space for offset

              return (
                <div
                  key={booking.id}
                  onClick={() => onBookingClick(booking)}
                  className={`absolute mx-1 cursor-pointer rounded px-2 py-1 text-xs font-medium text-white overflow-hidden ${
                    booking.vehicleType === "Campervan"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                  } ${isStartHour ? "rounded-t-none" : ""} ${
                    isEndHour ? "rounded-b-none" : ""
                  }`}
                  style={{
                    top: isStartHour ? `${(bookingStart.getMinutes() / 60) * 100}%` : "0%",
                    height: isStartHour && isEndHour ? `${((bookingEnd.getTime() - bookingStart.getTime()) / (1000 * 60 * 60)) * 100}%` : isStartHour ? `${((60 - bookingStart.getMinutes()) / 60) * 100}%` : isEndHour ? `${(bookingEnd.getMinutes() / 60) * 100}%` : "100%",
                    left: `${offset}%`, // Apply left offset
                    width: `${width}%`, // Apply reduced width
                    zIndex: 10 + index, // Ensure higher index is on top
                  }}
                >
                  <div className="truncate font-medium">
                    {isStartHour ? booking.customerName : ""}
                  </div>
                  {isStartHour && (
                    <div className="truncate text-xs opacity-90">
                      {booking.vehicleType}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarDay;
