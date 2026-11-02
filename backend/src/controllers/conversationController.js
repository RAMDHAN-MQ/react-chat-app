import Conversation from "../models/Conversations.js";
import Users from "../models/Users.js";
import Chats from "../models/Chats.js";

export const postCreateConversation = async (req, res) => {
  try {
    const { participant } = req.body;
    const userLoginID = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [userLoginID, participant],
        $size: 2,
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userLoginID, participant],
      });
    }

    return res.status(200).json({ message: "Berhasil buat conversations" });
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userLoginID = req.user._id;

    const conversations = await Conversation.find({
      participants: userLoginID,
    })
      .populate("participants", "nama username")
      .populate("lastChat")
      .sort({ updatedAt: -1 });

    return res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};
