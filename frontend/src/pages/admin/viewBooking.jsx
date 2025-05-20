import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchBookings = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view bookings.");
        return;
      }

      setUser(storedUser);

      // Decide endpoint based on user role
      const endpoint =
        storedUser?.role === "admin"
          ? "http://localhost:7000/api/v1/bookings/all"
          : "http://localhost:7000/api/v1/bookings/my";

      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch bookings.");
        } else {
          setBookings(data);
        }
      } catch (err) {
        setError("Failed to fetch bookings.");
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:7000/api/v1/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
      } else {
        console.log("Deleted successfully");
        setBookings(prevBookings => prevBookings.filter(booking => booking._id !== id));
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-[#1aac83]">
          {user?.role === "admin" ? "All Bookings" : "Your Bookings"}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1aac83] text-white">
                <th className="p-4">Customer</th>
                <th className="p-4">Driver Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Pickup Location</th>
                <th className="p-4">Dropoff Location</th>
                <th className="p-4" colSpan="2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      {booking.user?.username || "Unknown"}
                    </td>
                    <td className="p-4">
                      {booking.driver?.name || "Unassigned"}
                    </td>
                    <td
                      className={`p-4 font-medium ${
                        booking.status === "cancelled"
                          ? "text-[#e7195a]"
                          : "text-[#1aac83]"
                      }`}
                    >
                      {booking.status}
                    </td>
                    <td className="p-4">{booking.pickupLocation}</td>
                    <td className="p-4">{booking.dropoffLocation}</td>
                    <td className="p-4">
                      <button className="bg-[#1aac83] text-white py-1 px-3 rounded hover:bg-green-700d cursor-pointer">
                        <Link to={`/UpdateBooking/${booking._id}`}>Edit</Link>
                      </button>
                    </td>
                    <td className="p-4">
                      <button className="bg-[#e7195a] text-white py-1 px-3 rounded hover:bg-red-700d cursor-pointer" onClick={() => deleteBooking(booking._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;
