import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";


dotenv.config();




mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
 
const app = express();
app.use(cookieParser());    
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(7000, () => {
    console.log("server running on port 7000");
});



