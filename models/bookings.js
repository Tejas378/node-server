import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "User",
      required: false, // guest bookings allowed
    },
    serviceCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "serviceCenterSchema",
      required: true,
    },
    vehicle: {
      make: { type: String, default: "" },
      model: { type: String, default: "" },
      regNumber: { type: String, default: "" },
    },
    services: [
      {
        type: String,
        trim: true,
      },
    ],
    datetime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    contactDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    notes: { type: String, default: "" },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);


export const Booking = mongoose.model("Booking", bookingSchema);
