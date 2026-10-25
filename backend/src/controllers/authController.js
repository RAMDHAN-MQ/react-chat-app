import Users from "../models/Users.js";
import bcrypt from "bcrypt";

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "email tidak ditemukan" });

    const cekPassword = await bcrypt.compare(password, user.password);
    if (!cekPassword)
      return res.status(400).json({ message: "password salah" });

    res.status(200).json({
      id: user._id,
      nama: user.nama,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};
export const postRegister = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    const cekEmail = await Users.findOne({ email });
    if (cekEmail) return res.status(400).json({ message: "email sudah ada" });

    const userBaru = new Users({ nama, email, password });
    await userBaru.save();

    res.status(201).json({ message: "User baru berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};
