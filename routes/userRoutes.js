import express from "express";
import { creatUser, getUsers, loginUser, updateProfile, uploadProfilePicture } from "../controller/userController.js";
import multer from "multer";
// Multer config
const router = express.Router();

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname),
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter });

router.post("/register", creatUser);
router.get("/getAll", getUsers);
router.post("/login", loginUser);
router.patch("/update", updateProfile);
router.post("/upload-profile", upload.single("profileImage"), uploadProfilePicture);

export default router;
