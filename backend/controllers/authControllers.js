import bcrypt from "bcryptjs";
import streamifier from "streamifier";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

// user signup
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
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

    const uploadFromBuffer = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Usage:
    const result = await uploadFromBuffer(req.file.buffer);
    const imageUrl = result.secure_url;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: imageUrl,
      
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
        profilePic: imageUrl,
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
    return res.json({ success: false, message: "Internal server errror" });
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
