import { useEffect, useState } from "react";
import { Booking } from "../types";

const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (updatedBooking: Booking) => {
    try {
      const response = await fetch(`/api/bookings/${updatedBooking.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBooking),
      });
      if (!response.ok) {
        throw new Error("Failed to update booking");
      }
      fetchBookings(); // Refresh bookings after update
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while updating");
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, updateBooking };
};

export default useBookings;
