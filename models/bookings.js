import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // guest bookings allowed
    },
    serviceCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCenter",
      required: true,
    },
    vehicle: {
      make: String,
      model: String,
      regNumber: String,
    },
    services: [
      {
        type: String,
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    contactDetails: {
      name: String,
      email: String,
      phone: String,
    },
    notes: String,
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
