import Blog from "../model/blog.js";
import Cat from "../model/category.js";
import jwt from 'jsonwebtoken';
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import bycrypt from 'bcryptjs';
 

export async function adminLogin(req, res) {
     try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Please fill in all fields" });
            }
    
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ message: "User not found" });
            }
    
            // Await the result of bcrypt.compare
            const isPasswordValid = await bycrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
    
            // Use existingUser's data in the payload
            const token = jwt.sign(
                {
                    id: existingUser._id,
                    email: existingUser.email
                }, // Correct payload
                process.env.SECRET_KEY, // Secret Key from your environment
                {
                    expiresIn: '30d',
                    
                 } // Token expires in 1 hour
            );
            res.cookie("blogApp", token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: "None",
            });
            return res.status(201).json({ message: "Login successfully", token });
        } catch (error) {
            console.log("Error:", error);
            return res.status(500).json({ message: "Something went wrong" });
        }
}
export async function addBlog(req, res) {
    try {
        const { tittle, desc, category } = req.body;
        if (!tittle || !desc || !category) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        // Check if the category exists
        const existingCat = await Cat.findOne({ tittle: category });
        if (!existingCat) {
            return res.status(400).json({ message: "The category does not exist" });
        }

        // ✅ Add category field while saving
        const newBlog = new Blog({
            tittle,
            desc,
            category, // ✅ Add category field
            image: req.file.path
        });

        await newBlog.save();
        existingCat.blogs.push(newBlog._id);
        await existingCat.save();

        return res.status(200).json({ message: "Blog created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!!!!" });
    }
}

export function getAdminProfile(req, res) {
    try {
        const { user } = req;
        const { password, ...safeUserData } = user._doc;
        return res.status(200).json({ data: safeUserData });

    } catch (error) {
        return res.status(200).json({ message: "Internal server error" });
    }
}
