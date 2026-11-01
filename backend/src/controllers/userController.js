import Users from "../models/Users.js";

export const postFindUsername = async (req, res) => {
  try {
    const { userLogin, username } = req.body;

    const users = await Users.find({
      $and: [
        { username: { $regex: username, $options: "i" } },
        { username: { $ne: userLogin } },
      ],
    }).select("_id nama username");

    if (users.length === 0)
      return res.status(400).json({ message: "Username Tidak Ditemukan" });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: `Terjadi Error: ${error}` });
  }
};
