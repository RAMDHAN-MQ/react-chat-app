import Users from "../models/Users.js";

export const postFindUsername = async (req, res) => {
  try {
    const { username } = req.body;

    const users = await Users.find({
      username: { $regex: username, $options: "i" },
    }).select("_id nama username");

    if (users === 0)
      return res.status(400).json({ message: "Username Tidak Ditemukan" });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};
