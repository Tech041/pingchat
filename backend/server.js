import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./configs/mongodb.js";
import messageRouter from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";
import connectCloudinary from "./configs/cloudinary.js";

const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:3000",
  "https://pingme-chat-app.vercel.app",
  
];

// To parse incoming requests with JSON payload from req.body
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
// Database connection
connectDB();
connectCloudinary();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});
server.listen(PORT, () => {
  console.log("Server Running on Port:", PORT);
});
