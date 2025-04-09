import mongoose from "mongoose";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    if (!message || !receiverId || !senderId) {
      return res.json({ success: false, message: "Invalid Protocol" });
    }
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // This way or use Promise.all to make the saving in database run in parallel
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);

    // Socket.IO Functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // this io.to is used to send message to specific client/user
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    console.log("This is new message", newMessage);
    return res.json({ success: true, newMessage });
  } catch (error) {
    console.log("ErrorError in sendMessage controller:", error.message);
    return res.json({ success: false, message: "Error sending message" });
  }
};

// Getting messages
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
      return res.json({ success: false, messages: "Invalid UserId" });
    }
    const senderId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      return res.json({ success: false, messages: "Invalid SenderId" });
    }
    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");
    if (!conversation) {
      return res.json([]);
    }
    const messages = conversation.messages;
    console.log("Getting messages", messages.length);
    return res.json({ success: true, messages });
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    return res.json({ success: false, message: "Internal server errror" });
  }
};

// Delete message function
export const deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  const updateMessage = await Message.findByIdAndDelete(messageId);
  if (!updateMessage) {
    return res.json({ success: false, message: "Message not found" });
  }
  return res.json({ success: true, updateMessage });
};
