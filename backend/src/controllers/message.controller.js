import cloudinary from "../lib/cloudinary.js";
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
   const receiverIdExists= await User.exists({_id:receiverId});
   if(!receiverIdExists){
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
