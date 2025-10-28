import { Booking } from "../models/bookings.js";

// ✅ Create new booking (for logged-in user or guest)
export const createBooking = async (req, res) => {
  try {
    const {
      serviceCenterId,
      vehicle,
      services,
      date,
      contactDetails,
      notes,
    } = req.body;

    // userId from JWT (if available)
    const userId = req.user?._id || null;

    if (!serviceCenterId || !date) {
      return res
        .status(400)
        .json({ success: false, message: "Service center and date are required" });
    }

    const booking = await Booking.create({
      userId,
      serviceCenterId,
      vehicle,
      services,
      date,
      contactDetails,
      notes,
    });

    // populate center name for response clarity
    const populatedBooking = await booking.populate("serviceCenterId", "name");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: populatedBooking,
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err });
  }
};
