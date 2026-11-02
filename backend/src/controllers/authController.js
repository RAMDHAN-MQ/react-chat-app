import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (!user)
      return res.status(400).json({ message: "Username tidak ditemukan" });

    const cekPassword = await bcrypt.compare(password, user.password);
    if (!cekPassword)
      return res.status(400).json({ message: "Password salah" });

    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      nama: user.nama,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};

export const postRegister = async (req, res) => {
  try {
    const { nama, username, email, password } = req.body;

    const cekEmail = await Users.findOne({ email });
    if (cekEmail)
      return res.status(400).json({ message: "Email sudah terdaftar!" });

    const cekUsername = await Users.findOne({ username });
    if (cekUsername)
      return res.status(400).json({ message: "Username sudah dipakai!" });

    const userBaru = new Users({ nama, username, email, password });
    await userBaru.save();

    res.status(201).json({ message: "Akun berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
