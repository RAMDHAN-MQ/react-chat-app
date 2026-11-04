import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import { connectDB } from "./config/db.js";

// konfigurasi
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// http server
const server = http.createServer(app);

// socket io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// socket connection
io.on("connection", (socket) => {
  console.log("User terhubung:", socket.id);

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log("Bergabung ke room:", conversationId);
  });

  socket.on("disconnect", () => {
    console.log("User terputus:", socket.id);
  });
});

app.set("io", io);

// port
const PORT = process.env.PORT || 5001;

// connect db
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversation", conversationRoutes);

server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
