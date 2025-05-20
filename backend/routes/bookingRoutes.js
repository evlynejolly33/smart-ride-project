import express from "express";
import { 
    createBooking, 
    getAllBookings, 
    getSingleBooking, 
    updateBookingStatus ,
    getUserBookings,
    deleteBooking,
    updateBooking
} from "../controllers/bookingController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", requireAuth, createBooking);

router.get("/all", requireAuth, getAllBookings);

// User — view own bookings
router.get("/my", requireAuth, getUserBookings);
router.get("/view/:id", requireAuth, getSingleBooking);
router.patch("/update/:bookingId/status", requireAuth, updateBookingStatus);
router.delete("/:id", requireAuth, deleteBooking);
router.put("/update/:id", requireAuth, updateBooking);

export default router;
