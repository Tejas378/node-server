import { Booking } from "../models/bookings.js";

// ✅ Create new booking (for logged-in user or guest)
export const createBooking = async (req, res) => {
  try {
    const {
      userId,
      serviceCenterId,
      vehicle,
      services,
      datetime,
      contactDetails,
      notes,
    } = req.body;

    // userId from JWT (if available)

    if (!serviceCenterId || !datetime) {
      return res
        .status(400)
        .json({ success: false, message: "Service center and date are required" });
    }

    const booking = await Booking.create({
      userId,
      serviceCenterId,
      vehicle,
      services,
      datetime,
      contactDetails,
      notes,
    });

    // populate center name for response clarity
    const populatedBooking = await booking.populate("serviceCenterId", "name");

    res.status(201).json({
      isSuccess: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ isSuccess: false, message: "Server error", error: err });
  }
};
