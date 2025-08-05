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
import RescheduleModal from "./RescheduleModal"; // Import the modal
import { searchStations, getBookingDetails, getBookingsByStation } from "../services/api";
import { Station, Booking } from "../types";
import useBookingsStore from "../state/bookingsStore";
import useMediaQuery from "../hooks/useMediaQuery";

interface BookingWithDuration extends Booking {
  duration: number;
}

const CalendarDashboard: React.FC = () => {
  const {
    bookings,
    selectedStation,
    selectedBooking,
    currentWeek,
    loading,
    setBookings,
    setSelectedStation,
    setSelectedBooking,
    setCurrentWeek,
    setLoading,
    updateBooking,
  } = useBookingsStore();
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false); // State for modal
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (selectedStation) {
      setLoading(true);
      getBookingsByStation(selectedStation.id)
        .then((bookings) => {
          setBookings(bookings);
          if (bookings.length > 0) {
            const firstBooking = bookings.reduce((earliest, current) => {
              return new Date(current.startDate) < new Date(earliest.startDate)
                ? current
                : earliest;
            });
            setCurrentWeek(new Date(firstBooking.startDate));
          }
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedStation, setBookings, setCurrentWeek, setLoading]);

  const weekDays = Array.from({ length: isMobile ? 3 : 7 }, (_, i) =>
    isMobile ? addDays(currentWeek, i) : addDays(startOfWeek(currentWeek), i)
  );

  const getBookingsForDay = (date: Date) => {
    if (!selectedStation) return [];

    return bookings.filter(
      (booking) =>
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
    const duration =
      Math.ceil(
        (newEndDate.getTime() - newStartDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    updateBooking(bookingId, { startDate: newStartDate, endDate: newEndDate, duration });

    // Close the modal
    setIsRescheduleModalOpen(false);
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

    // Scroll to the new booking's week
    setCurrentWeek(newStartDate);
  };

  const openRescheduleModal = () => {
    setIsRescheduleModalOpen(true);
  };

  const nextDate = () => {
    if (isMobile) {
      setCurrentWeek(addDays(currentWeek, 3));
    } else {
      setCurrentWeek(addWeeks(currentWeek, 1));
    }
  };

  const prevDate = () => {
    if (isMobile) {
      setCurrentWeek(addDays(currentWeek, -3));
    } else {
      setCurrentWeek(subWeeks(currentWeek, 1));
    }
  };

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
                onClick={prevDate}
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
                {format(weekDays[weekDays.length - 1], "MMM d, yyyy")}
              </h2>

              <button
                onClick={nextDate}
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
                  {Array.from({ length: 24 }, (_, hour) => {
                    const currentHourStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 0, 0);
                    const currentHourEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 59, 59);

                    // Filter bookings active in this specific hour
                    const bookingsInThisHour = dayBookings.filter(booking =>
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
                              onClick={() => handleBookingClick(booking)}
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
      {selectedBooking && !isRescheduleModalOpen && (
        <BookingDisplay
          booking={selectedBooking}
          stationName={selectedStation?.name}
          onClose={() => setSelectedBooking(null)}
          onReschedule={openRescheduleModal} // Open reschedule modal
        />
      )}

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && selectedBooking && (
        <RescheduleModal
          booking={selectedBooking}
          onClose={() => setIsRescheduleModalOpen(false)} // Close reschedule modal
          onReschedule={handleReschedule}
        />
      )}
    </div>
  );
};

export default CalendarDashboard;
