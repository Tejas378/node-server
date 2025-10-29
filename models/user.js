import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  // street: { type: String, default: "" },
  // city: { type: String, default: "" },
  // state: { type: String, default: "" },
  // pinCode: { type: String, default: "" },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactno: { type: String, required: true },
  password: { type: String, require: true },
  profileImage: { type: String, require: false },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
