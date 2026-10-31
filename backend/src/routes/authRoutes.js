import express from "express";
import {
  getChat,
  postLogin,
  postRegister,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// auth
router.post("/login", postLogin);
router.post("/register", postRegister);

// chat
router.get("/chat", protect, getChat);

export default router;
