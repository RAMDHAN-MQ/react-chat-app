import Chats from "../models/Chats.js";

export const getChat = async (req, res) => {
  res.status(200).json(req.user);
};
