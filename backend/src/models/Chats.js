import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    to: {
      type: String,
      ref: "users",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model("chats", chatSchema);

export default Chat;
