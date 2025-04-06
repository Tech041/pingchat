import express from "express";
import upload from "../middlewares/multer.js";
import { login, logout, signup } from "../controllers/authControllers.js";
const authRouter = express.Router();
authRouter.post("/signup", upload.single("image"), signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
