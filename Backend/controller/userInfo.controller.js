import User from "../models/user.model.js"; // Correct import

// Your controller logic here

// @desc    Get user info
// @route   GET /api/user-info
// @access  Private
// @desc    Get user info
// @route   GET /api/user-info
// @access  Private
import mongoose from "mongoose";

// @desc    Get user info
// @route   GET /api/user-info
// @access  Private
const getUserInfo = async (req, res) => {
  try {
    // Log the decoded userId from the token
    console.log("Decoded userId:", req.userId); // This comes from the JWT token

    // Query the database to find the user
    const user = await User.findById(req.userId).lean(); // Using .lean() to get a plain JavaScript object

    // Log the user object to see if it's being fetched correctly
    console.log("Fetched user from DB:", user);

    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the _id from the database
    console.log("User _id from DB:", user._id); // This comes from the MongoDB query

    // Respond with user data
    res.status(200).json({
      message: "User found",
      userInfo: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// @desc    Update user info
// @route   PUT /api/user-info
// @access  Private
const updateUserInfo = async (req, res) => {
  try {
    const { name, phone, gender, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (email) user.email = email;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user info" });
  }
};

export { getUserInfo, updateUserInfo };
