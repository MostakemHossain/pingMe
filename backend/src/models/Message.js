import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  emoji: { type: String, required: true }, // e.g., "❤️", "👍"
});

const messageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, trim: true, maxlength: 2000 },
    image: { type: String },
    deleted: { type: Boolean, default: false },
    edited: { type: Boolean, default: false },
    reactions: [reactionSchema], // <-- Add this
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
