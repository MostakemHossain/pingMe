import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  emoji: { type: String, required: true },
});

const messageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    text: { type: String, trim: true, maxlength: 2000 },
    image: { type: String },
    deleted: { type: Boolean, default: false },
    edited: { type: Boolean, default: false },
    reactions: [reactionSchema], 
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
