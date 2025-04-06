import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// user signup
export const signup = async (req, res) => {
  try {
    const {
      fullName,
      username,
      password,
      confirmPassword,
      gender,
      profilePic,
    } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.json({ success: false, message: "Incomplete credentials" });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Passowrd shouldn't be less than 6 characters",
      });
    }
    if (password !== confirmPassword) {
      return res.json({ success: false, message: "Passwords don't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    // File upload
    if (profilePic) {
      const imageUrl = await cloudinary.uploader.upload(profilePic.path, {
        resource_type: "image", // Specify it's an image
      });

      return imageUrl.secure_url;
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();
    // Generating Token
    generateToken(newUser._id, res);

    return res.json({
      success: true,
      userData: {
        userId: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.log("Error signing up", error.message);
    return res.json({ success: false, message: "Internal server error" });
  }
};

// user login
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.json({ success: false, message: "Incomplete credentials" });
    }
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid username or password",
      });
    }
    generateToken(user._id, res);
    return res.json({
      success: true,
      userData: {
        userId: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("Error logging in:", error.message);
  return  res.json({ success: false, message: "Internal server errror" });
  }
};

// Logout function
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", "", { maxAge: 0 });
    res.json({ success: true, message: "Logged out" });
  } catch (error) {
    console.log("Error logging out:", error.message);
    res.json({ success: false, message: "Internal server errror" });
  }
};
