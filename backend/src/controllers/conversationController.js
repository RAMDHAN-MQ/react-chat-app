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

    return res.status(200).json(conversation._id);
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

    if (!cekConversationID)
      return res.status(400).json({ message: "Conversation tidak ditemukan!" });

    const otherUser = cekConversationID.participants.find(
      (e) => String(e._id) !== String(req.user._id),
    );

    const chats = await Chats.find({ conversation: conversationID })
      .populate("sender", "nama username")
      .sort({ createdAt: 1 });

    res.status(200).json({ participant: otherUser, message: chats });
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};

export const postSendChat = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user._id,
    });

    if (!conversation)
      return res.status(400).json({ message: "Obrolan tidak ditemukan!" });

    const chat = await Chats.create({
      conversation: conversationId,
      sender: req.user._id,
      text,
    });

    conversation.lastChat = chat._id;
    await conversation.save();

    // socket
    const chatSocket = await Chats.findById(chat._id).populate(
      "sender",
      "nama username",
    );

    const io = req.app.get("io");

    io.to(String(conversationId)).emit("newMessage", chatSocket);

    return res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};
