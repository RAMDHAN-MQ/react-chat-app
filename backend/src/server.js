import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
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
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
