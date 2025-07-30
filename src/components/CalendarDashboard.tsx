import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  isSameDay,
  isWithinInterval,
  isToday,
} from "date-fns";
import Autocomplete from "./Autocomplete";
import BookingDisplay from "./BookingDisplay";
import { searchStations, getBookingDetails } from "../services/api";
import { Station, Booking } from "../types";

interface BookingWithDuration extends Booking {
  duration: number;
}

const CalendarDashboard: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [bookings, setBookings] = useState<BookingWithDuration[]>([]);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingWithDuration | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Mock bookings data with consistent time information
  const mockBookings: BookingWithDuration[] = [
    {
      id: "1",
      stationId: "1",
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        15,
        9,
        0
      ), // 9 AM
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        20,
        17,
        0
      ), // 5 PM
      customerName: "John Smith",
      vehicleType: "Campervan",
      duration: 5,
    },
    {
      id: "2",
      stationId: "2",
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        16,
        10,
        0
      ), // 10 AM
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        18,
        16,
        0
      ), // 4 PM
      customerName: "Sarah Johnson",
      vehicleType: "RV",
      duration: 2,
    },
    {
      id: "3",
      stationId: "1",
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        17,
        8,
        0
      ), // 8 AM
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        22,
        18,
        0
      ), // 6 PM
      customerName: "Mike Wilson",
      vehicleType: "Campervan",
      duration: 5,
    },
    {
      id: "4",
      stationId: "3",
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        18,
        11,
        0
      ), // 11 AM
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        21,
        15,
        0
      ), // 3 PM
      customerName: "Emily Davis",
      vehicleType: "RV",
      duration: 3,
    },
    {
      id: "5",
      stationId: "2",
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        19,
        7,
        0
      ), // 7 AM
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        25,
        19,
        0
      ), // 7 PM
      customerName: "David Brown",
      vehicleType: "Campervan",
      duration: 6,
    },
    {
      id: "6",
      stationId: "4",
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        21,
        9,
        30
      ), // 9:30 AM
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        27,
        17,
        30
      ), // 5:30 PM
      customerName: "Lisa Anderson",
      vehicleType: "Campervan",
      duration: 6,
    },
    {
      id: "7",
      stationId: "5",
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        23,
        14,
        0
      ), // 2 PM
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        25,
        12,
        0
      ), // 12 PM
      customerName: "Robert Chen",
      vehicleType: "RV",
      duration: 2,
    },
    {
      id: "8",
      stationId: "6",
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        26,
        6,
        0
      ), // 6 AM
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        30,
        20,
        0
      ), // 8 PM
      customerName: "Maria Garcia",
      vehicleType: "Campervan",
      duration: 4,
    },
  ];

  useEffect(() => {
    setBookings(mockBookings);
  }, []);

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfWeek(currentWeek), i)
  );

  const getBookingsForDay = (date: Date) => {
    if (!selectedStation) return [];

    return bookings.filter(
      (booking) =>
        booking.stationId === selectedStation.id &&
        (isSameDay(booking.startDate, date) ||
          isSameDay(booking.endDate, date) ||
          isWithinInterval(date, {
            start: booking.startDate,
            end: booking.endDate,
          }))
    );
  };

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
  };

  const handleBookingClick = async (booking: BookingWithDuration) => {
    setLoading(true);
    try {
      const bookingDetails = await getBookingDetails(booking.id);
      if (bookingDetails) {
        setSelectedBooking(bookingDetails);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = (
    bookingId: string,
    newStartDate: Date,
    newEndDate: Date
  ) => {
    // Update local state with the rescheduled booking
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              startDate: newStartDate,
              endDate: newEndDate,
              duration:
                Math.ceil(
                  (newEndDate.getTime() - newStartDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                ) + 1,
            }
          : booking
      )
    );

    // Update the selected booking if it's the one being rescheduled
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) =>
        prev
          ? {
              ...prev,
              startDate: newStartDate,
              endDate: newEndDate,
              duration:
                Math.ceil(
                  (newEndDate.getTime() - newStartDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                ) + 1,
            }
          : null
      );
    }

    // Close the modal
    setSelectedBooking(null);

    // Show success notification
    setNotification({
      message: `Booking rescheduled successfully! New time: ${format(
        newStartDate,
        "MMM d, h:mm a"
      )} - ${format(newEndDate, "MMM d, h:mm a")}`,
      type: "success",
    });

    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));
  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                Campervan Bookings
              </h1>
              <div className="w-full sm:w-64">
                <Autocomplete
                  placeholder="Search stations..."
                  onSearch={searchStations}
                  onSelect={handleStationSelect}
                  displayKey="name"
                  valueKey="id"
                  className="w-full"
                />
              </div>
            </div>

            {/* Week Navigation */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={prevWeek}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <h2 className="text-lg font-medium text-gray-900 min-w-[200px] text-center">
                {format(weekDays[0], "MMM d")} -{" "}
                {format(weekDays[6], "MMM d, yyyy")}
              </h2>

              <button
                onClick={nextWeek}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-8 border-b border-gray-200">
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
          <div className="grid grid-cols-8 min-h-[600px]">
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
            {weekDays.map((day) => {
              const dayBookings = getBookingsForDay(day);
              const isTodayDate = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className={`border-r border-gray-200 last:border-r-0 ${
                    isTodayDate ? "bg-blue-50" : ""
                  }`}
                >
                  {Array.from({ length: 24 }, (_, hour) => (
                    <div
                      key={hour}
                      className={`h-12 border-b border-gray-100 relative ${
                        isTodayDate ? "bg-blue-50" : ""
                      }`}
                    >
                      {/* Bookings for this hour */}
                      {dayBookings.map((booking) => {
                        const startHour = booking.startDate.getHours();
                        const endHour = booking.endDate.getHours();

                        // Only show booking if it starts or is ongoing at this hour
                        if (hour >= startHour && hour <= endHour) {
                          const isStart = hour === startHour;
                          const isEnd = hour === endHour;

                          return (
                            <div
                              key={booking.id}
                              onClick={() => handleBookingClick(booking)}
                              className={`absolute left-0 right-0 mx-1 cursor-pointer rounded px-2 py-1 text-xs font-medium text-white overflow-hidden ${
                                booking.vehicleType === "Campervan"
                                  ? "bg-blue-500 hover:bg-blue-600"
                                  : "bg-green-500 hover:bg-green-600"
                              } ${isStart ? "rounded-t-none" : ""} ${
                                isEnd ? "rounded-b-none" : ""
                              }`}
                              style={{
                                top: "2px",
                                bottom: "2px",
                                zIndex: 10,
                              }}
                            >
                              <div className="truncate font-medium">
                                {isStart ? booking.customerName : ""}
                              </div>
                              {isStart && (
                                <div className="truncate text-xs opacity-90">
                                  {booking.vehicleType}
                                </div>
                              )}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Campervan</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">RV</span>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading booking details...</p>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {notification.type === "success" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDisplay
          booking={selectedBooking}
          stationName={selectedStation?.name}
          onClose={() => setSelectedBooking(null)}
          onReschedule={handleReschedule}
        />
      )}
    </div>
  );
};

export default CalendarDashboard;
