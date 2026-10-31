import Users from "../models/Users.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Users.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      console.error("Token gagal:", error);
      return res.status(401).json({ message: "Token gagal" });
    }
  }
  
  return res.status(401).json({ message: "Token gagal" });
};
