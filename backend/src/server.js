import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";

// konfigurasi
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// port
const PORT = process.env.PORT || 5001;

// connect db
connectDB();

// routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
