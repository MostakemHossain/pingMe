import mongoose from "mongoose";
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
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
