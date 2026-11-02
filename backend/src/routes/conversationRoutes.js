import express from "express";
import {
  postCreateConversation,
  getConversations,
  getChat,
  postSendChat,
} from "../controllers/conversationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, postCreateConversation);
router.get("/", protect, getConversations);

router.get("/:conversationID", protect, getChat);
router.post("/send", protect, postSendChat);

export default router;
