import http from "http";
import { Server } from "socket.io";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

// apply authentication middleware for all socket connection.

io.use(socketAuthMiddleware);

// storing online users
const userSocketMap = new Map();
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.userId} ${socket.user.fullName}`);

  // add user to online users map
  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.userId} ${socket.user.fullName}`);
    // remove user from online users map
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { server, io,app };
