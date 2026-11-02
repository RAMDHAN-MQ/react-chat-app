import express from "express";
import {
  postCreateConversation,
  getConversations,
  getChat,
} from "../controllers/conversationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, postCreateConversation);
router.get("/", protect, getConversations);
router.get("/:conversationID", protect, getChat);

export default router;
