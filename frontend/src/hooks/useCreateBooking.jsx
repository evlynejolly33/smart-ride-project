import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Assuming you have this

const useCreateBook = () => {
  const [driverId, setDriverId] = useState(""); // Renamed for clarity
  const [pickupLocation, setPickupLocation] = useState(""); // Fixed casing
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [drivers, setDrivers] = useState([]);
  const { user } = useContext(AuthContext); // Get user from context

  const fetchDrivers = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const res = await axios.get("http://localhost:7000/api/v1/drivers/view", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
      });
      setDrivers(res.data);
    } catch (err) {
      console.log("Error fetching drivers:", err);
      setMessage("Failed to fetch drivers. Please try again.");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!driverId || !pickupLocation || !dropoffLocation || !date) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:7000/api/v1/bookings/create",
        {
          userId: user._id, // Add user ID
          driverId, // Renamed from 'driver'
          pickupLocation, // Fixed casing
          dropoffLocation,
          rideDate: new Date(date), // Explicit Date object
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Booking created successfully!");
      // Reset form
      setDriverId("");
      setPickupLocation("");
      setDropoffLocation("");
      setDate("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create booking";
      setMessage(`Error: ${errorMessage}`);
      console.error("Booking Error:", error.response?.data || error);
    }
  };

  return {
    driver: driverId, // Keep mapping for compatibility
    setDriver: setDriverId,
    pickUpLocation: pickupLocation, // Map old names for component
    setPickUpLocation: setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    date,
    setDate,
    message,
    drivers,
    handleBookingSubmit,
  };
};

export default useCreateBook;
