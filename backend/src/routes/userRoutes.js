import express from "express";
import { postFindUsername } from "../controllers/userController.js";

const router = express.Router();

router.post("/", postFindUsername);

export default router;
