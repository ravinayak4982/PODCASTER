import Blog from "../model/blog.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken"
//fetch all bogs

export async function fetchAllBlogs(req, res) {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });

    } catch (error) {
        res.status(500).json({ error: "Internal server erroor" });
    }
}
//recent blogs;
export async function fetchRecentBlogs(req, res) {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).limit(4);
        res.status(200).json({ success: true, blogs });

    } catch (error) {
        res.status(500).json({ error: "Internal server erroor" });
    }
}
//get  descritption by id
export async function getDescById(req, res) {
   try{
        // Extract and verify the token
        const token = req.cookies?.blogApp;
         let user = null;
  
    if (token) {
        try {
        
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            user = await User.findById(decoded.id);
        } catch (erroor) {
            console.log(erroor);
        }
    }

        // Get blog ID from request params
        const { id } = req.params;
        const blogs = await Blog.findById(id); // Fixed: Find by blog ID, not user ID

        if (!blogs) {
            res.status(404).json({ error: "Blog not found" });
        }
        let favourite = false;
        // Check if the blog is in the user's favorites
        if (user && blogs.favouriteBlogByUser.includes(user._id)) {
            favourite = true;
        }
        res.status(200).json({ success: true, blogs, favourite });

    } catch (error) {
        console.error("Error in getDescById:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
//remove blog to faverete
export async function removeBlogToFav(req, res) {
    try {
        const { user } = req;
        const { id } = req.params;
        const blogs = await Blog.findById(id);
        const existinguser = await User.findById(user._id);
        if (!blogs) {
            res.status(404).json({ error: "Blog not found" });
        }
        const userFavouriteIndex = existinguser.favouriteBlogs.indexOf(id);
        if (userFavouriteIndex != -1) {
            existinguser.favouriteBlogs.splice(userFavouriteIndex, 1);
        } else {
            res.status(404).json({ error: "Blog not found in user favourite" });
        }
        const blogFavourites = blogs.favouriteBlogByUser.indexOf(user._id);
        if (blogFavourites != -1) {
            blogs.favouriteBlogByUser.splice(blogFavourites, 1);
        }
        await blogs.save();
        await existinguser.save();

        res.status(200).json({ success: true, message: "Blog remove to favourite" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server erroor" });
    }
}
////add blogs to favrete
export async function addBlogToFav(req, res) {
    try {
        const { user } = req;
        const { id } = req.params;
        const blogs = await Blog.findById(id);
        const existinguser = await User.findById(user._id);
        if (!blogs) {
            res.status(404).json({ error: "Blog not found" });
        }
        blogs.favouriteBlogByUser.push(user._id);
        existinguser.favouriteBlogs.push(id);
        await blogs.save();
        await existinguser.save();

        res.status(200).json({ success: true, message: "Blog to favrete added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server erroor" });
    }
}
//edit blog
export async function editBlog(req, res) {
    try {
        const { id } = req.params;
        const { tittle, desc } = req.body;
        const blog = await Blog.findByIdAndUpdate(id,{tittle,desc});
       
        
        res.status(200).json({ success: true, message: "Blog updated" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server erroor" });
    }
}
export async function deleteBlog(req, res) {
    try {
        const { id } = req.params;
       
      await Blog.findByIdAndDelete(id);
      
       

        res.status(200).json({ success: true, message: "Blog deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server erroor" });
    }
}
