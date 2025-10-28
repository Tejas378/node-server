import { Booking } from "../models/bookings.js";

export const getUserDashboard = async (req, res) => {
    try {
        const { userId } = req.params;
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
            title: "Upcoming", upcoming: activeBookings.length,
            title: "Completed", completed: pastBookings.length,
            title: "Cancelled", cancelled: cancelledBookings.length,
        };
        res.status(200).json({ isSuccess: true, summary, activeBookings, pastBookings, cancelledBookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ isSuccess: false, message: "Server error" });
    }
};
