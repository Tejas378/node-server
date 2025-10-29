import { Booking } from "../models/bookings.js";
import { validateRequiredFields } from "./../utils/validation.js"
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

    const isAllRequiredFieldsExist = await validateRequiredFields(req.body, ["serviceCenterId", "vehicle.regNumber", "services",
      "datetime", "contactDetails.email", "contactDetails.phone"]);

    if (!isAllRequiredFieldsExist.isValid) {
      return res.status(400).json({
        isSuccess: false, message: isAllRequiredFieldsExist.errors
      })
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

    return res.status(201).json({
      isSuccess: true,
      message: "Booking created successfully",
      data: populatedBooking,
    });
  } catch (err) {
    logErrorToFile(err, "Test")

    console.error("Booking error:", err);
    return res.status(500).json({ isSuccess: false, message: "Server error", error: err });
  }
};
