import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model("chats", chatSchema);

export default Chat;
