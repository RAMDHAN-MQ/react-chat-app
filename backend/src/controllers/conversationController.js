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

export const getChat = async (req, res) => {
  try {
    const conversationID = req.params.conversationID;

    const cekConversationID = await Conversation.findOne({
      _id: conversationID,
    }).populate("participants", "nama username");

    const otherUser = cekConversationID.participants.find(
      (e) => String(e._id) !== String(req.user._id),
    );
    console.log(otherUser);

    if (!cekConversationID)
      return res.status(400).json({ message: "Conversation tidak ditemukan!" });

    const chats = await Chats.find({ conversation: conversationID })
      .populate("from", "nama username")
      .sort({ createdAt: 1 });

    res.status(200).json({ participant: otherUser, chats: chats });
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};
