import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// konfigurasi
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// port
const PORT = process.env.PORT;

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB terhubung!"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "halooo" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
