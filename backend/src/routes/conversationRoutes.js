import express from "express";
import { postCreateConversation } from "../controllers/conversationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, postCreateConversation);

export default router;
