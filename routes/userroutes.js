import express from "express";
import { creatUser, getUsers, loginUser, updateProfile ,uploadProfile } from "../controller/userController.js";
import multer from "multer";
// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });
const router = express.Router();

router.post("/register", creatUser);
router.get("/getAll", getUsers);
router.post("/login", loginUser);
router.put("/update", updateProfile);
router.post("/upload-profile", upload.single("profileImage"), uploadProfile);

export default router;
