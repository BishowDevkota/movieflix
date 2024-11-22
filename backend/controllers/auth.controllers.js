const User = require("../models/users.models");
const becrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokens");
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({
          sucess: false,
          message: "Password must be at least 6 characters long",
        });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({
          sucess: false,
          message: "User already exists with this username " + username,
        });
    }
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({
          sucess: false,
          message: `User already exists with this email ${email}`,
        });
    }

    const salt = await becrypt.genSalt();
    const hashedPassword = await becrypt.hash(password, salt);
    const profilePic = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = profilePic[Math.floor(Math.random() * profilePic.length)];
    const user = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    generateTokenAndSetCookie(user._id, res);
    await user.save();

    res
      .status(201)
      .json({
        sucess: true,
        message: "User created successfully",
        user: { ...user._doc, password: "" },
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        sucess: false,
        message: "internal server error at /signup route",
      });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid credentials" });
    }

    const isMatch = await becrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid credentials" });
    }
    generateTokenAndSetCookie(user._id, res);
    res
      .status(200)
      .json({
        sucess: true,
        message: "User logged in successfully",
        user: { ...user._doc, password: "" },
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        sucess: false,
        message: "internal server error at /login route",
      });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("netflix-token", {
      httpOnly: true, // Same settings as the original cookie
      secure: process.env.NODE_ENV === 'production', // Set to true if in production
      sameSite: 'Strict', // Or 'Lax' depending on your setup
      path: '/', // Ensure the correct path where the cookie was set
    });
    res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error at /logout route",
    });
  }
};



const authCheck = async (req, res) => {
  try {
    res.status(200).json({ sucess: true, user: req.user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        sucess: false,
        message: "internal server error at /authCheck route",
      });
  }
};

module.exports = {
  signUp,
  login,
  logout,
  authCheck,
};
