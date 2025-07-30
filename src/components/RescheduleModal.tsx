import React, { useState } from "react";
import { format, addDays } from "date-fns";
import { Booking } from "../types";
import { rescheduleBooking } from "../services/api";

interface RescheduleModalProps {
  booking: Booking & { duration: number };
  onClose: () => void;
  onReschedule: (
    bookingId: string,
    newStartDate: Date,
    newEndDate: Date
  ) => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  booking,
  onClose,
  onReschedule,
}) => {
  const [newStartDate, setNewStartDate] = useState(booking.startDate);
  const [newEndDate, setNewEndDate] = useState(booking.endDate);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setNewStartDate(date);

    // Automatically adjust end date to maintain duration
    const duration = booking.duration;
    const adjustedEndDate = addDays(date, duration - 1);
    setNewEndDate(adjustedEndDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEndDate(new Date(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the actual reschedule API
      const updatedBooking = await rescheduleBooking(
        booking.id,
        newStartDate,
        newEndDate
      );

      if (updatedBooking) {
        onReschedule(booking.id, newStartDate, newEndDate);
      }
    } catch (error) {
      console.error("Error rescheduling booking:", error);
      // You could add error handling UI here
      alert("Failed to reschedule booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateForInput = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Reschedule Booking
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {booking.customerName}
            </h3>
            <p className="text-gray-600">Booking ID: {booking.id}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Dates
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">
                  <div>Start: {format(booking.startDate, "PPP")}</div>
                  <div>End: {format(booking.endDate, "PPP")}</div>
                  <div>Duration: {booking.duration} days</div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={formatDateForInput(newStartDate)}
                onChange={handleStartDateChange}
                min={formatDateForInput(new Date())}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={formatDateForInput(newEndDate)}
                onChange={handleEndDateChange}
                min={formatDateForInput(newStartDate)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-blue-800">
                <div>
                  New Duration:{" "}
                  {Math.ceil(
                    (newEndDate.getTime() - newStartDate.getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + 1}{" "}
                  days
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Rescheduling..." : "Reschedule"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
