import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getChat } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", protect, getChat);
router.post('/send')

export default router;
