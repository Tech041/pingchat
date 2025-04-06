import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const messageAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ success: false, message: "Token not available" });
    }
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded_token) {
      return res.json({ success: false, message: "Token is invalid" });
    }
    const user = await User.findById(decoded_token.userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in messageAuth middleware:", error.message);
    return res.json({ success: false, message: "Message sender is Unkown" });
  }
};
export default messageAuth;
