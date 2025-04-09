import express from "express";
import {
  deleteMessage,
  getMessage,
  sendMessage,
} from "../controllers/messageController.js";
import messageAuth from "../middlewares/messageAuth.js";
const messageRouter = express.Router();

messageRouter.post("/send/:id", messageAuth, sendMessage);
messageRouter.get("/:id", messageAuth, getMessage);
messageRouter.delete("/delete/:id", deleteMessage);

export default messageRouter;
