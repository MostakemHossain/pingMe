import { Group } from "../models/Group.js";
import { Message } from "../models/Message.js";

export const createGroup = async (req, res) => {
  try {
    const { name, members, profilePic } = req.body?.payload;

    if (!name || !members || members.length < 2) {
      return res
        .status(400)
        .json({ message: "Group name and at least 2 members are required." });
    }

    if (!members.includes(req.user._id.toString())) {
      members.push(req.user._id);
    }

    const group = await Group.create({
      name,
      members,
      admin: req.user._id,
      profilePic: profilePic || "",
    });

    const populatedGroup = await Group.findById(group._id).populate(
      "members",
      "fullName profilePic"
    );

    res.status(201).json(populatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create group." });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id })
      .populate("members", "fullName profilePic")
      .sort({ updatedAt: -1 });

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch groups." });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { groupId, text, image } = req.body;
    const senderId = req.user._id;

    if (!groupId)
      return res.status(400).json({ message: "Group ID is required." });

    const message = await Message.create({
      senderId,
      groupId,
      text,
      image,
    });

    const populatedMessage = await Message.findById(message._id).populate(
      "senderId",
      "fullName profilePic"
    );

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send group message." });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({ message: "Group ID is required." });
    }

    // Fetch all messages for this group, populate sender info
    const messages = await Message.find({ groupId })
      .populate("senderId", "fullName profilePic") // show sender info
      .sort({ createdAt: 1 }); // oldest first

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch group messages." });
  }
};
