import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/database.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardrouter from "./routes/dashboardRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";
import serviceCenterRoutes from "./routes/serviceCenterRoutes.js"
import bodyParser from "body-parser";
dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware
app.use(cors({ origin: ["http://localhost:5173", "https://garage-pro-wine.vercel.app","https://garage-pro-wine.vercel.app/"] }));

app.use(express.json());
app.use(bodyParser.urlencoded())

// parse application/json
// app.use(bodyParser.json())// DB connection

dbConnection();

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/dashboard", dashboardrouter);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/service-center", serviceCenterRoutes);
// Routes
// app.use("/", (req, res) => {
//   res.status(200).send("Server working properly");
// });
// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
