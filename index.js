import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/database.js";
import router from "./routes/userroutes.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware
app.use(cors({ origin: "https://garage-pro-wine.vercel.app" }));

app.use(express.json());

// DB connection
dbConnection();

app.use("/api/v1/", router);
// Routes
// app.use("/", (req, res) => {
//   res.status(200).send("Server working properly");
// });
// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
