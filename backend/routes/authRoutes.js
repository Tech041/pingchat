import express from "express";
import upload from "../middlewares/multer.js";
import {
  deleteUser,
  login,
  logout,
  signup,
} from "../controllers/authControllers.js";
import { deleteAccount } from "../middlewares/deleteUser.js";
const authRouter = express.Router();
authRouter.post("/signup", upload.single("image"), signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/delete", deleteAccount, deleteUser);

export default authRouter;
