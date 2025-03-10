import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2, // Use `cloudinary.v2`
    params: {
       
        format: async (req, file) => {
            const fileType = file.mimetype.split("/")[1];
            return ["jpeg", "png", "jpg"].includes(fileType) ? fileType : "png";
        },
        public_id: (req, file) => `${Date.now()}-${file.originalname.split(".")[0]}`,
    },
});

export { cloudinary, storage };
