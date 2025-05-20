import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateBooking = () => {
  const { id } = useParams(); // Get the booking ID from the URL
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/v1/bookings/view/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch booking.");
        } else {
          setBooking(data);
        }
      } catch (err) {
        setError("Failed to fetch booking.");
        console.error(err);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id, token]);

  const handleUpdate = async (updatedBooking) => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/v1/bookings/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedBooking),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update booking.");
      } else {
        console.log("Booking updated successfully.");
      }
    } catch (err) {
      setError("Failed to update booking.");
      console.error(err);
    }
  };

  // Handle form submission
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#1aac83]">
          Update Booking
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {booking ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(booking);
            }}
            className="space-y-6"
          >
            {/* Driver Name */}
            <div className="flex flex-col">
              <label htmlFor="driver" className="text-lg font-semibold mb-2">
                Driver Name
              </label>
              <input
                type="text"
                name="driver"
                id="driver"
                value={booking.driver?.name || ""}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1aac83] transition duration-300"
              />
            </div>

            {/* Pickup Location */}
            <div className="flex flex-col">
              <label htmlFor="pickupLocation" className="text-lg font-semibold mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                id="pickupLocation"
                value={booking.pickupLocation || ""}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1aac83] transition duration-300"
              />
            </div>

            {/* Dropoff Location */}
            <div className="flex flex-col">
              <label htmlFor="dropoffLocation" className="text-lg font-semibold mb-2">
                Dropoff Location
              </label>
              <input
                type="text"
                name="dropoffLocation"
                id="dropoffLocation"
                value={booking.dropoffLocation || ""}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1aac83] transition duration-300"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label htmlFor="status" className="text-lg font-semibold mb-2">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={booking.status || "pending"}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1aac83] transition duration-300"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#1aac83] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#179b65] focus:outline-none focus:ring-2 focus:ring-[#1aac83] transition duration-300"
              >
                Update Booking
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-500">Loading booking...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateBooking;
