import express from "express";
import {
  getMe,
  postLogin,
  postRegister,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", postLogin);
router.post("/register", postRegister);
router.get("/me", protect, getMe);

export default router;
