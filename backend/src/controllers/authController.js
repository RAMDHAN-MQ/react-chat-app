import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// auth
export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Email tidak ditemukan" });

    const cekPassword = await bcrypt.compare(password, user.password);
    if (!cekPassword)
      return res.status(400).json({ message: "Password salah" });

    const token = generateToken(user._id);
    res.status(200).json({
      id: user._id,
      nama: user.nama,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};

export const postRegister = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    const cekEmail = await Users.findOne({ email });
    if (cekEmail)
      return res.status(400).json({ message: "Email sudah terdaftar!" });

    const userBaru = new Users({ nama, email, password });
    await userBaru.save();

    res.status(201).json({ message: "Akun berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};

// chat
export const getChat = async (req, res) => {
  res.status(200).json(req.user);
};

// generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
