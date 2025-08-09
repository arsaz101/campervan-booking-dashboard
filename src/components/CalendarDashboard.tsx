import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import BookingDisplay from "./BookingDisplay";
import RescheduleModal from "./RescheduleModal";
import { getBookingDetails, getBookingsByStation } from "../services/api";
import { Station, BookingWithDuration } from "../types";
import useBookingsStore from "../state/bookingsStore";
import useMediaQuery from "../hooks/useMediaQuery";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarGrid from "./calendar/CalendarGrid";

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
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
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

    setIsRescheduleModalOpen(false);
    setSelectedBooking(null);

    setNotification({
      message: `Booking rescheduled successfully! New time: ${format(
        newStartDate,
        "MMM d, h:mm a"
      )} - ${format(newEndDate, "MMM d, h:mm a")}`,
      type: "success",
    });

    setTimeout(() => setNotification(null), 3000);

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
      <CalendarHeader
        currentWeek={currentWeek}
        weekDays={weekDays}
        isMobile={isMobile}
        onStationSelect={handleStationSelect}
        onPrevDate={prevDate}
        onNextDate={nextDate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CalendarGrid
          weekDays={weekDays}
          isMobile={isMobile}
          getBookingsForDay={getBookingsForDay}
          onBookingClick={handleBookingClick}
        />

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
          onReschedule={openRescheduleModal}
        />
      )}

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && selectedBooking && (
        <RescheduleModal
          booking={selectedBooking}
          onClose={() => setIsRescheduleModalOpen(false)}
          onReschedule={handleReschedule}
        />
      )}
    </div>
  );
};

export default CalendarDashboard;
