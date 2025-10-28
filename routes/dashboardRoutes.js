import express from "express";
import { getUserDashboard } from "./../controller/dashboardController.js"

const dashboardrouter = express.Router();

dashboardrouter.get("/:userId", getUserDashboard);

export default dashboardrouter;
