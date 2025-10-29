// utils/validateRequiredFields.js
import mongoose from "mongoose";
export const validateRequiredFields = async (data, requiredFields = []) => {
    const errors = [];

    // Function to get nested value using "a.b.c" path
    const getValue = (path) => {
        console.log(path, "Path");

        return path?.split(".").reduce((acc, key) => {
            return acc && acc[key] !== undefined ? acc[key] : undefined;
        }, data);
    };

    // Loop through all required fields
    requiredFields.forEach((field) => {
        const value = getValue(field);

        if (
            value === undefined ||
            value === null ||
            value === "null" ||
            value === "undefined" ||
            (typeof value === "string" && value.trim() === "") ||
            (Array.isArray(value) && value.length === 0)
        ) {
            errors.push(`${field} is required`);
        }
    });

    if (errors.length > 0) {
        return {
            isValid: false,
            errors,
        };
    }

    return { isValid: true, errors: [] };
};
export const validateObjectId =async (res, id, fieldName = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: `Invalid ${fieldName} .`,
    });
    return false; // stop execution in controller
  }
  return true; // continue if valid
};