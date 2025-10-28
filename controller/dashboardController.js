import { Booking } from "../models/bookings.js";

export const getUserDashboard = async (req, res) => {
    try {
        const { userId } = req.params;

        const activeBookings = await Booking.find({
            userId,
            status: { $in: ["Confirmed", "In Progress"] },
        }).populate("serviceCenterId", "name");

        const pastBookings = await Booking.find({
            userId,
            status: "Completed",
        }).populate("serviceCenterId", "name");

        const cancelledBookings = await Booking.find({
            userId,
            status: "Cancelled",
        }).populate("serviceCenterId", "name");

        const summary = {
            title: "Upcoming", upcoming: activeBookings.length,
            title: "Completed", completed: pastBookings.length,
            title: "Cancelled", cancelled: cancelledBookings.length,
        };
        res.json({ summary, activeBookings, pastBookings, cancelledBookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
