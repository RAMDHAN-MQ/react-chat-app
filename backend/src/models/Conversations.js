import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    lastChat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
      default: null,
    },
  },
  { timestamps: true },
);

const Conversation = mongoose.model("conversations", conversationSchema);

export default Conversation;
