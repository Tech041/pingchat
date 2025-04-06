import express from "express";
import { getUsersForSideBar } from "../controllers/usersControllers.js";
import messageAuth from "../middlewares/messageAuth.js";
const userRouter = express.Router();
userRouter.get("/", messageAuth, getUsersForSideBar);
export default userRouter;
