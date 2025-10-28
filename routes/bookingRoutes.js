import express from "express";
import { createBooking } from "./../controller/bookingController.js";
// import { verifyToken } from "../middlewares/authMiddleware.js"; // optional for logged-in users

const router = express.Router();

router.post("/create", createBooking);

export default router;
