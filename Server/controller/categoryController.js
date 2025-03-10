import Cat from "../model/category.js";
import User from "../model/user.js";
import Blog from "../model/blog.js";

getCategry
export async function addCategry(req, res) {
try {
    const { tittle } = req.body;
    const checkCat = await Cat.findOne({ tittle });
    if (checkCat) {
        return res.status(400).json({ error: "category already exist" });
    }
    const newCat = new Cat({ tittle });
    await newCat.save();
   return  res.status(200).json({ message: "category added successfully" });
    
} catch (error) {
   return  res.status(400).json({ sucess: false, error: "Internal server erroor" });
}
};
export async function getCategry(req, res) {
    try {
      
        const category = await Cat.find();
    
        return res.status(200).json({ success:true, category });

    } catch (error) {
       return  res.status(400).json({ sucess: false, error: "Internal server erroor" });
    }
}

//get category blog
export async function getblogByCategry(req, res) {
    try {
        const { id } = req.params;

        const category = await Cat.findById(id).populate("blogs");

        return res.status(200).json({ success: true, blogs:category.blogs });

    } catch (error) {
        return res.status(400).json({ sucess: false, error: "Internal server erroor" });
    }
}