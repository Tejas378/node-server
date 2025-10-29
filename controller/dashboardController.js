import { Booking } from "../models/bookings.js";
import { validateRequiredFields, validateObjectId } from "../utils/validation.js";
import { logErrorToFile } from "./../utils/logger.js"
export const getUserDashboard = async (req, res) => {
    try {
        const { userId } = req.params;
        const isAllRequiredFieldsExist = await validateRequiredFields({ userId }, ["userId"]);
        if (!isAllRequiredFieldsExist.isValid) {
            return res.status(400).json({
                isSuccess: false, message: isAllRequiredFieldsExist.errors
            })
        }
        // if (!validateObjectId(res, userId, "userId")) return;
        const activeBookings = await Booking.find({
            userId,
            status: { $in: ["Pending", "Confirmed", "In Progress"] },
            isActive: true
        }).populate("serviceCenterId", "name");

        const pastBookings = await Booking.find({
            userId,
            status: "Completed",
            isActive: true
        }).populate("serviceCenterId", "name");

        const cancelledBookings = await Booking.find({
            userId,
            status: "Cancelled",
            isActive: true
        }).populate("serviceCenterId", "name");

        const summary = {
            upcoming: activeBookings.length,
            completed: pastBookings.length,
            cancelled: cancelledBookings.length,
        };
        res.status(200).json({ isSuccess: true, summary, activeBookings, pastBookings, cancelledBookings });
    } catch (error) {
        logErrorToFile(error, "Test")
        res.status(500).json({ isSuccess: false, message: "Server error" });
    }
};
