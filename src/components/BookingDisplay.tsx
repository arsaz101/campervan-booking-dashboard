import React from "react";
import { format } from "date-fns";
import { Booking } from "../types";

interface BookingWithDuration extends Booking {
  duration: number;
}

interface BookingDisplayProps {
  booking: BookingWithDuration;
  stationName?: string;
  onClose: () => void;
  onReschedule?: () => void;
}

const BookingDisplay: React.FC<BookingDisplayProps> = ({
  booking,
  stationName,
  onClose,
  onReschedule,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Booking Details
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

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {booking.customerName}
              </h3>
              <p className="text-gray-600">Booking ID: {booking.id}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Dates</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">
                      {format(booking.startDate, "PPP")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">
                      {format(booking.endDate, "PPP")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{booking.duration} days</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Vehicle & Station
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle Type:</span>
                    <span className="font-medium">{booking.vehicleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Station:</span>
                    <span className="font-medium">
                      {stationName || "Unknown Station"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to Calendar
              </button>
              {onReschedule && (
                <button
                  onClick={onReschedule}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reschedule
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDisplay;
