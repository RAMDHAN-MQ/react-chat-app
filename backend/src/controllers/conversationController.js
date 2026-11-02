import Conversation from "../models/Conversations.js";
import Users from "../models/Users.js";

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
