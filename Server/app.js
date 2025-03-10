import express from 'express';
import dotenv from 'dotenv';
import "./conn/conn.js"
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
import catRouter from './routes/category.js'
import blogRouter from "./routes/blogs.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        credentials:true,
    }
));
app.use(cookieParser()); 

app.get("/", (req, res) => {
    res.send("Hello World!");
})
app.use("/app/v1", userRouter);
app.use("/app/v1", adminRouter);
app.use("/app/v1", catRouter);
app.use("/app/v1", blogRouter);

//server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.port}`);
});
