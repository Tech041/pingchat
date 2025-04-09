import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const deleteAccount = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ success: false, message: "Token not found" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!token_decode) {
      return res.json({ success: false, message: "Token is invalid" });
    }
    const user = await User.findById(token_decode.userId);
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in deleteUser middleware:", error.message);
    return res.json({ success: false, message: "Error deleting account" });
  }
};
