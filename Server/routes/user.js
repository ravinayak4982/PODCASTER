import express from 'express';
import { LoginUser, signupUser, checkCookie, logout, getProfile, ChangePassword, ChangeAvatar, getBlogToFav } from '../controller/userController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import upload from '../middleware/ImageUploads.js';

const router = express.Router();

// Signup route
router.post("/sign", signupUser);
router.post("/login", LoginUser);
router.get("/cook", checkCookie);
router.post("/logout", logout);
router.get("/getDataUser", authMiddleware.verifyToken, authMiddleware.authorizeRole("user"), getProfile);
router.put("/changepassword", authMiddleware.verifyToken, authMiddleware.authorizeRole("user"), ChangePassword);
router.put("/changeavatar", authMiddleware.verifyToken,upload.single("image"), authMiddleware.authorizeRole("user"), ChangeAvatar);
router.get("/getFavreteByUser", authMiddleware.verifyToken, authMiddleware.authorizeRole("user"), getBlogToFav);
export default router;
