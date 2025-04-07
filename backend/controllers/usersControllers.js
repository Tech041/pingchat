import User from "../models/userModel.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    console.log("AllUsers are in number", filteredUsers.length);
    return res.json({ success: true, users: filteredUsers });
  } catch (error) {
    console.log("Error getUsers controller:", error.message);
    return res.json({ success: false, message: "Internal server error" });
  }
};
