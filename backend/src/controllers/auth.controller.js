import { generateToken } from "../lib/utils.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    // check email valid or not with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    // user already exists or not

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    
    if (newUser) {
      
      generateToken (newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
