import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

export const dbConnection = async () => {
    try {
        
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log(`MongoDB connected`);
        })

    } catch (error) {
        console.error(" MongoDB connection failed:", error.message);
        process.exit(1); // Stop the app if DB fails
    }
};
