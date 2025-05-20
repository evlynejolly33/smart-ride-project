import Booking from "../models/bookingModel.js";
import Driver from "../models/driversModel.js";
import User from "../models/userModel.js";


export const createBooking = async (req, res) => {
  const { driverId, pickupLocation, dropoffLocation, rideDate } = req.body;


  try {
    const driver = await Driver.findById(driverId);
const user = req.user; 
if (!user) return res.status(404).json({ message: "User not found" });;
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    const newBooking = new Booking({
      user: user._id,
      driver: driverId,
      pickupLocation,
      dropoffLocation,
      rideDate,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create booking", error });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    let bookings;

    if (req.user.role === "admin") {
      bookings = await Booking.find()
        .populate("user", "username email")
        .populate("driver", "name vehicleNumber status");
    } 
  
    else {
      bookings = await Booking.find({ user: req.user._id })
        .populate("user", "username email")
        .populate("driver", "name vehicleNumber status");
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("driver", "name vehicleNumber status");

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch your bookings", error });
  }
};



export const getSingleBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (req.role === "driver" && booking.driver.toString() !== req.driver._id.toString()) {
      return res.status(403).json({ message: "Not authorized for this booking" });
    }
    res.status(200).json(booking);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    if (!['pending', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status }, 
      { new: true } 
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking status updated", booking: updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update booking status", error });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    res.status(500).json({ message: "Server error while deleting booking." });
  }
};

export const updateBooking = async (req, res) => {
  const { id } = req.params;

  try {
   
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    const updatedData = {
      customerName: req.body.customerName || booking.customerName,
      driverName: req.body.driverName || booking.driverName,
      date: req.body.date || booking.date,
      status: req.body.status || booking.status,
    };

    
    const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(updatedBooking);

  } catch (error) {
    console.error("Failed to update booking:", error);
    res.status(500).json({ message: "Failed to update booking.", error: error.message });
  }
};