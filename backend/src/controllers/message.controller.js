import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedUser } }).select(
      "-password"
    );
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in get All contact", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const MyId = req.user._id;

    const { id: userToChatId } = req.params;
    const message = await Message.find({
      $or: [
        { senderId: MyId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: MyId },
      ],
    });
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in get messages by user id", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const { image, text } = req.body;

    if (!image && !text) {
      return res.status(400).json({
        message: "Text or Image is required",
      });
    }
    if (senderId.equals(receiverId)) {
      return res.status(400).json({
        message: "Cannot sent message to your self",
      });
    }
    const receiverIdExists = await User.exists({ _id: receiverId });
    if (!receiverIdExists) {
      return res.status(400).json({
        message: "Receiver Not found",
      });
    }

    let imageUrl;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }
    const message = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await message.save();
    // todo :send message in realtime when user is online
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in send message", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedInUser }, { receiverId: loggedInUser }],
    });
    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUser.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];
    const chatPartners = await User.find({
      _id: { $in: chatPartnersIds },
    }).select("-password");
    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in send message", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteMessageById = async (req, res) => {
  try {
    const messageId = req.params.id;
    const loggedUserId = req.user._id;

    // Find the message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only sender can delete the message
    if (!message.senderId.equals(loggedUserId)) {
      return res.status(403).json({ message: "You can only delete your own messages" });
    }

    
    message.text = "This message was deleted";
    message.deleted = true;   
    message.image = null;    

    await message.save();
    const { getReceiverSocketId, io } = await import("../lib/socket.js");
    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", { _id: message._id });
    }

    res.status(200).json({ message: "Message deleted successfully", _id: message._id });
  } catch (error) {
    console.log("Error in deleting message", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editMessageById = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { text } = req.body;
    const loggedUserId = req.user._id;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Text is required to edit the message" });
    }

    // Find the message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only sender can edit the message
    if (!message.senderId.equals(loggedUserId)) {
      return res.status(403).json({ message: "You can only edit your own messages" });
    }

    // Update the message text and mark as edited
    message.text = text;
    message.edited = true;
    await message.save();

    // Notify receiver in real-time
    const { getReceiverSocketId, io } = await import("../lib/socket.js");
    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageEdited", message);
    }

    res.status(200).json({ message: "Message edited successfully", data: message });
  } catch (error) {
    console.log("Error in editing message", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



