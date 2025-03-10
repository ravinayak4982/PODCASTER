import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import { addBlogToFav, deleteBlog, editBlog, fetchAllBlogs, fetchRecentBlogs, getDescById, removeBlogToFav } from '../controller/blogsController.js';

const router = express.Router();

router.get("/all-blog", fetchAllBlogs);// fetch all blogs
router.get("/all-recent-blog", fetchRecentBlogs);// fetch all blogs
router.get("/getdescbyid/:id", getDescById);
router.put("/addBlogsToFaveret/:id",authMiddleware.verifyToken,authMiddleware.authorizeRole("user"),addBlogToFav)
router.put("/removeBlogsToFaveret/:id", authMiddleware.verifyToken, authMiddleware.authorizeRole("user"), removeBlogToFav)
router.put("/editBlog/:id", authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"), editBlog);
router.delete("/deleteBlog/:id", authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"), deleteBlog);



export default router;