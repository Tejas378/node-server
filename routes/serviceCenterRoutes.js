// routes/serviceCenterRoutes.js
import express from "express";
import { createServiceCenter,getServiceCenters } from "../controller/serviceCenterController.js";

const router = express.Router();

// POST /api/service-centers
router.post("/create", createServiceCenter);
router.get("/all", getServiceCenters);

export default router;
