import express from 'express';
import { addCategry, getblogByCategry, getCategry } from '../controller/categoryController.js';
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/addCategory", authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"), addCategry)
router.get("/getCategory", getCategry);
router.get("/getBlogbyCat/:id", getblogByCategry);





export default router;