import express from "express";
import { postCreateConversation, getConversations } from "../controllers/conversationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, postCreateConversation);
router.get("/", protect, getConversations);

export default router;
