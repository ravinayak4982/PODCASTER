import jwt from "jsonwebtoken";
import User from "../model/user.js";

const authMiddleware = {
    verifyToken: async (req, res, next) => {
        const token = req.cookies.blogApp;
        if (!token) {
            return res.status(401).json({ message: "Acess Denied No token Provided" });
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            
            //fetch details
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(400).json({ message: "Invalid Token" });
            
        }
    },
    authorizeRole: (role) => {
        return (req, res, next) => {
            if (req.user.role === role) {
                next();
            } else {
                return res.status(403).json({ message: "Access Denied" });
            }
            }
    }
}
export default authMiddleware;