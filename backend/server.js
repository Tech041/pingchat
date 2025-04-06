import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./configs/mongodb.js";
import messageRouter from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:3000"];

// To parse incoming requests with JSON payload from req.body
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
// Database connection
connectDB();

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
