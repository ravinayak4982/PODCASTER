import User from "../model/user.js";
import bcrypt from "bcryptjs";
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function signupUser(req, res) {
   try {
       const { username, email, password } = req.body;
       if (!username || !email || !password) {
           return res.status(400).json({ message: "Please fill in all fields" });
       }
       const existingUser = await User.findOne({ email });
       if (existingUser) {
           return res.status(400).json({ message: "email already exist" });
       }
    
       const existingUsername = await User.findOne({ username });
       if (existingUsername) {
           return res.status(400).json({ message: "username  already exist" });
       }
       const HasPassword = bycrypt.hashSync(password, 10);
       const user = new User({ username, email, password: HasPassword });
       await user.save();
       return res.status(200).json({ message: "Create New User" ,user});
   } catch (error) {
       console.log("error", error);
    
    };
};
export async function LoginUser(req, res) {
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
};
export function checkCookie(req, res) {
    try {
        const token = req.cookies.blogApp;
        if (token) {
            return res.status(200).json({ message: true });
        }
        return res.status(200).json({ message: false });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Server error" });
    }
}

export function logout(req, res) {
    res.clearCookie("blogApp", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        
    });

    return res.status(200).json({ message: "Logged out successfully" });
};
export function getProfile(req, res) {
    try {
        const { user } = req;
        const { password, ...safeUserData } = user._doc;
        return res.status(200).json({ data: safeUserData });

    } catch (error) {
        return res.status(200).json({ message: "Internal server error" });
    }
}
export async function ChangePassword(req, res) {
    try {
        const { user } = req;
        const {password, newPass, confirmNewpass } = req.body;

        if (newPass != confirmNewpass) {
            return res.status(400).json({ error: "Please enter both are not same "});
        }
        const actualPassword = user.password;
        const chechPass = await bcrypt.compare(actualPassword, password);
        if (!chechPass) {
            return res.status(400).json({sucess:false,error: "Password not valid" }); 
        }
        user.password =await  bcrypt.hash(confirmNewpass, 10);
       await  User.save();
        return res.status(200).json({ message: "Password changed successfully" });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
//ChangeAvatar
export async function ChangeAvatar(req, res) {
    try {
        const { user } = req;
        if (!req.file) {
            return res.status(400).json({ message: "Please select a file" });
        }
        //console.log(req.file.path);
        user.avatar = req.file.path;
        await user.save();
      
        return res.status(200).json({ message: "image uploaded successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
//get blog favrete
export async function getBlogToFav(req, res) {
    try {
        const { user } = req;

        // Ensure user exists in request
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: No user found" });
        }

        // Fetch the user and populate their favorite blogs
        const populateUser = await User.findById(user._id).populate("favouriteBlogs");

        if (!populateUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Retrieve favorite blogs
        const favreteBlog = populateUser.favouriteBlogs;

        res.status(200).json({ success: true, favreteBlog });

    } catch (error) {
        console.error("Error in getBlogToFav:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

