import React from "react";
import { isToday, format } from "date-fns";
import CalendarDay from "./CalendarDay";
import { BookingWithDuration } from "../../types";

interface CalendarGridProps {
  weekDays: Date[];
  isMobile: boolean;
  getBookingsForDay: (date: Date) => BookingWithDuration[];
  onBookingClick: (booking: BookingWithDuration) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ weekDays, isMobile, getBookingsForDay, onBookingClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Day Headers */}
      <div className={`grid ${isMobile ? 'grid-cols-4' : 'grid-cols-8'} border-b border-gray-200`}>
        <div className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50">
          Time
        </div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={`p-3 text-center border-l border-gray-200 ${
              isToday(day) ? "bg-blue-50" : "bg-gray-50"
            }`}
          >
            <div
              className={`text-sm font-medium ${
                isToday(day) ? "text-blue-600" : "text-gray-900"
              }`}
            >
              {format(day, "EEE")}
            </div>
            <div
              className={`text-lg font-semibold ${
                isToday(day) ? "text-blue-600" : "text-gray-900"
              }`}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className={`grid ${isMobile ? 'grid-cols-4' : 'grid-cols-8'} min-h-[600px]`}>
        {/* Time Column */}
        <div className="border-r border-gray-200">
          {Array.from({ length: 24 }, (_, hour) => (
            <div
              key={hour}
              className="h-12 border-b border-gray-100 flex items-center justify-end pr-2"
            >
              <span className="text-xs text-gray-400">
                {hour === 0
                  ? "12 AM"
                  : hour < 12
                  ? `${hour} AM`
                  : hour === 12
                  ? "12 PM"
                  : `${hour - 12} PM`}
              </span>
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {weekDays.map((day) => (
          <CalendarDay
            key={day.toISOString()}
            day={day}
            bookings={getBookingsForDay(day)}
            onBookingClick={onBookingClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
