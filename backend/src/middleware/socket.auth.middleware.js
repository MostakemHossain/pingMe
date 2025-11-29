import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import { User } from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) {
      console.log("No token provided in socket handshake");
      return next(new Error("Authentication error: No token provided"));
    }
    // verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    socket.user = user;

    socket.userId = user._id.toString();
    console.log(
      `Socket authenticated: ${socket.userId} ${socket.user.fullName}`
    );
    next();
  } catch (error) {
    console.error("Socket auth middleware error:", error);
    next(new Error("Authentication error"));
  }
};
