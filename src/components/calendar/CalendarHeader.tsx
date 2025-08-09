import React from "react";
import { format } from "date-fns";
import Autocomplete from "../Autocomplete";
import { searchStations } from "../../services/api";
import { Station } from "../../types";

interface CalendarHeaderProps {
  currentWeek: Date;
  weekDays: Date[];
  isMobile: boolean;
  onStationSelect: (station: Station) => void;
  onPrevDate: () => void;
  onNextDate: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentWeek, weekDays, isMobile, onStationSelect, onPrevDate, onNextDate }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
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
                onSelect={onStationSelect}
                displayKey="name"
                valueKey="id"
                className="w-full"
              />
            </div>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={onPrevDate}
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

            <h2 className="text-lg font-medium text-gray-900 min-w-[250px] text-center">
              {format(weekDays[0], "MMM d")} -{" "}
              {format(weekDays[weekDays.length - 1], "MMM d, yyyy")}
            </h2>

            <button
              onClick={onNextDate}
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
  );
};

export default CalendarHeader;
