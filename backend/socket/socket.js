import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
const userSocketMap = {};
// {
//   userId: socketId;
// }
io.on("connection", (Socket) => {
  console.log("A user connected", Socket.id);
  //   socket.on is used for listening for events on both client and server side
  const userId = Socket.handshake.query.userId;
  if (userId !== "undefined") {
    userSocketMap[userId] = Socket.id;
  }
  //   io.emit is ued to send event to all connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  Socket.on("disconnect", () => {
    console.log("A user disconnected", Socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { app, io, server };
