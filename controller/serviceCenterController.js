// controllers/serviceCenterController.js
import ServiceCenter from "../models/serviceCenter.js";
import { logErrorToFile } from "./../utils/logger.js";

export const createServiceCenter = async (req, res) => {
    try {
        const { name, ownerName, email, contactNo, address, servicesOffered } = req.body;

        // Basic validation
        if (!name || !email || !contactNo) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and contact number are required.",
            });
        }

        const newCenter = await ServiceCenter.create({
            name,
            ownerName,
            email,
            contactNo,
            address,
            servicesOffered,
        });

        res.status(201).json({
            success: true,
            message: "Service center created successfully.",
            data: newCenter,
        });
    } catch (error) {
        logErrorToFile(error, "createServiceCenter")
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getServiceCenters = async (req, res) => {

    try {
        const result = await ServiceCenter.find({ isActive: true });
        res.status(200).json({ isSuccess: true, data: result })
    }
    catch (error) {
        logErrorToFile(err, "getServiceCenters")
        res.status(500).json({ isSuccess: false, message: "Internal server error" });

    }

}