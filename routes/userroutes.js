import express from "express";
import { creatUser, getUsers, loginUser } from "../controller/userController.js";

const router = express.Router();

router.post("/register", creatUser);
router.get("/getAll", getUsers);
router.post("/login", loginUser);

export default router;
