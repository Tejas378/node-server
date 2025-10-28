import mongoose from "mongoose";

const serviceCenterSchema = new mongoose.Schema({
    name: String,
    ownerName: String,
    email: String,
    contactNo: String,
    address: {
        line1: String,
        city: String,
        state: String,
        pincode: String,
    },
    servicesOffered: [String],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
});

export default mongoose.model("serviceCenterSchema", serviceCenterSchema)