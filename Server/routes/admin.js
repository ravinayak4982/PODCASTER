import express from 'express';
import { adminLogin, addBlog, getAdminProfile } from '../controller/adminController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import upload from '../middleware/ImageUploads.js';

const router = express.Router();

router.post("/adminLogin", adminLogin);
router.post("/addBlog", authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"), upload.single("image"),addBlog);
router.get("/getDataAdmin", authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"), getAdminProfile);


export default router;
