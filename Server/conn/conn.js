import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const conn = async () => {
    try {
        mongoose.connect(process.env.DB_URI);
            console.log("Connected to MongoDB");
    
        
    } catch (error) {
        console.log(error + "mongooose erorror");
    }
}
conn();