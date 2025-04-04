import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Notification } from '../models/notification.model.js'; 
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
} from "../mailtrap/emails.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const signup = async (req, res) => {
  const { name, email, password, username, country, gender } = req.body;
  try {
    if (!name || !email || !password || !username || !country || !gender) {
     // console.log("All fields are required");
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
   // console.log("userAlreadyExists:", userAlreadyExists);
    if (userAlreadyExists) {
   //   console.log("User already exists");
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });        
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Validate if files are uploaded
    if (!req.files || !req.files.images) {
      console.log("Validation Error: Image is required");
      console.log("Request files:", req.files); // Log for debugging
      return res.status(400).json({ success: false, msg: "Image is required" });
    }

    const imageFile = req.files.images;

    // Validate file type
    const allowedExtensions = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    if (!allowedExtensions.includes(imageFile.mimetype)) {
      console.log("Validation Error: Invalid file type");
      return res.status(400).json({ success: false, msg: "Invalid file type" });
    }

    // Upload the file to Cloudinary
    console.log("Uploading image to Cloudinary...");
    const cloudinaryResponse = await cloudinary.uploader.upload(
      imageFile.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown error"
      );
      return res
        .status(500)
        .json({ success: false, msg: "Error uploading image" });
    }

    // Save the item to the database
    console.log("Saving item to the database...");

    const user = new User({
      name,
      email,
      password: hashedPassword,
      username,
      images: [
        {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      ],
      country,
      gender,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      notificationCount: 1, // Initialize notification count
    });
    await user.save();

    // Generate JWT and set cookie
    generateTokenAndSetCookie(res, user._id);

    // Send verification email
    await sendVerificationEmail(email, verificationToken); 

// Create a notification for the user
const notification = new Notification({
  userId: user._id,
  message: `${name} have successfully signed up.`,
  image: user.images[0].url, // Use the user's profile image
});
await notification.save();
console.log("Notification created:", notification);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};


export const getAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch all notifications from the database
    const notifications = await Notification.find().sort({ createdAt: -1 });

    // Fetch the user's notification count
    const user = await User.findById(userId);
    const notificationCount = user ? user.notificationCount : 0;

    res.status(200).json({
      success: true,
      notifications,
      notificationCount, // Include notification count in the response
    });
  } catch (error) {
    console.error("Error fetching all notifications:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    // Mark the notification as read
    if (!notification.isRead) {
      notification.isRead = true;
      await notification.save();

      // Decrement the user's notification count
      const user = await User.findById(notification.userId);
      if (user && user.notificationCount > 0) {
        user.notificationCount -= 1;
        await user.save();
      }
    }

    res.status(200).json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    // Fetch notifications for the user
    const notifications = await Notification.find({ userId });

    // Fetch the user's notification count
    const user = await User.findById(userId);
    const notificationCount = user ? user.notificationCount : 0;

    res.status(200).json({
      success: true,
      notifications,
      notificationCount, // Include notification count in the response
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



//delete recipe
export const deleteNotification = async (req, res) => {
  try {
    const result = await Notification.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ success: false, msg: "Notification not found" });
    console.log(result);
    res.status(200).json({ success: true, msg: "Successfully deleted Notification" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error deleting Notification", error: error.message });
  }
};



export const verifyEmail = async (req, res) => {
  // 1 2 3 4 5 6
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid or expired verification code",
        });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // await sendWelcomeEmail(user.email, user.username);

    res.status(200).json({
      success: true,
      message: "Email verified sucessful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Raw Request Body:", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({
          success: false,
          message: "The password you entered is incorrect. Please try again.",
        });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please verify your email before logging in.",
        });
    }

    // Generate JWT and set cookie
    const token = generateTokenAndSetCookie(res, user._id);
    console.log("Generated Token:", token); // Log the generated token

    user.lastLogin = new Date();
    await user.save();

    console.log("Request Cookies:", req.cookies);
    // Log the cookies being sent in the response
    console.log("Cookies after setting:", res.getHeaders()["set-cookie"]);

    res.status(200).json({
      success: true,
      message: "Logged in sucessfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("login error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email

    await sendPasswordResetEmail(
      user.email,
      `http://localhost:5173/reset-password/${resetToken}`
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Password reset link sent to your email",
      });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "This email is not registered with us.",
        });
    }

    //update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Retrieve All Users
export const getAllUsers = async (req, res) => {
  try {
    console.log("Fetching all users");
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error fetching user");
    res.status(500).json({ success: false, message: error.message });
  }
};

// update code
export const updateUserById = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters
  const { name, email, username, country, gender } = req.body; // Destructure the fields to update

  try {
    // Validate that at least one field is provided for update
    if (
      !name &&
      !email &&
      !username &&
      !country &&
      !gender &&
      !req.files?.images
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "At least one field is required for update.",
        });
    }

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User  not found." });
    }

    // Update user fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (username) user.username = username;
    if (country) user.country = country;
    if (gender) user.gender = gender;

    // Handle image upload if a new image is provided
    if (req.files && req.files.images) {
      const imageFile = req.files.images;

      // Validate file type
      const allowedExtensions = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedExtensions.includes(imageFile.mimetype)) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid file type" });
      }

      // Upload the file to Cloudinary
      console.log("Uploading image to Cloudinary...");
      const cloudinaryResponse = await cloudinary.uploader.upload(
        imageFile.tempFilePath
      );

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown error"
        );
        return res
          .status(500)
          .json({ success: false, msg: "Error uploading image" });
      }

      // Update user image information
      user.images = [
        {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      ];
    }

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "User  updated successfully.",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from response
      },
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete User
export const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully.");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//addToFavorites
export const addToFavorites = async (req, res) => {
  try {
    console.log("🔍 Incoming request to add recipe to favorites.");
    console.log("📥 Raw Request Body:", req.body);

    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error("🚨 Error: Request body is empty!");
      return res
        .status(400)
        .json({
          success: false,
          message: "Request body is empty. Please send userId and recipeId.",
        });
    }

    // Extract userId and recipeId from req.body
    const { userId, recipeId } = req.body;
    console.log("🔎 Extracted userId:", userId);
    console.log("🔎 Extracted recipeId:", recipeId);

    // Validate userId and recipeId
    if (!userId || !recipeId) {
      console.error("🚨 Error: Missing userId or recipeId!");
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or recipeId." });
    }

    // Ensure userId and recipeId are valid ObjectId format
    if (userId.length !== 24 || recipeId.length !== 24) {
      console.error("🚨 Error: Invalid ID format!");
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid userId or recipeId format.",
        });
    }

    // Find user and add recipe to favorites
    console.log("🔍 Searching for user with userId:", userId);
    const user = await User.findById(userId);
    if (!user) {
      console.error("🚨 Error: User not found!");
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Check if recipe is already in favorites
    console.log("🔍 Checking if recipe is already in favorites...");
    if (user.favorites.includes(recipeId)) {
      console.error("🚨 Error: Recipe is already in favorites!");
      return res
        .status(400)
        .json({ success: false, message: "Recipe is already in favorites." });
    }

    // Add recipeId to favorites
    console.log("🔍 Adding recipe to favorites...");
    user.favorites.push(recipeId);
    await user.save();

    console.log("✅ Recipe added to favorites successfully!");
    res
      .status(200)
      .json({ success: true, message: "Recipe added to favorites." });
  } catch (error) {
    console.error("🚨 Server Error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

//removeFromFavorites
export const removeFromFavorites = async (req, res) => {
  try {
    console.log("🔍 Incoming request to remove recipe from favorites.");
    console.log("📥 Raw Request Body:", req.body);

    // Extract userId and recipeId from request body
    const { userId, recipeId } = req.body;

    // Validate userId and recipeId
    if (!userId || !recipeId) {
      console.error("🚨 Error: Missing userId or recipeId!");
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or recipeId." });
    }

    // Ensure valid ObjectId format (MongoDB ObjectIds are 24-character hex strings)
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(recipeId)
    ) {
      console.error("🚨 Error: Invalid ID format!");
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid userId or recipeId format.",
        });
    }

    // Find the user in the database
    console.log("🔍 Searching for user with userId:", userId);
    const user = await User.findById(userId);

    if (!user) {
      console.error("🚨 Error: User not found!");
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Ensure user.favorites exists and is an array
    if (!Array.isArray(user.favorites)) {
      console.error("🚨 Error: user.favorites is not an array!");
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal error: user favorites data is missing.",
        });
    }

    // Check if the recipe exists in user's favorites
    if (!user.favorites.includes(recipeId)) {
      console.error("🚨 Error: Recipe is not in favorites!");
      return res
        .status(400)
        .json({ success: false, message: "Recipe is not in favorites." });
    }

    // Remove the recipe from the user's favorites
    console.log("🔍 Removing recipe from favorites...");
    user.favorites = user.favorites.filter((id) => id?.toString() !== recipeId);

    // Save updated user data
    await user.save();

    console.log("✅ Recipe removed from favorites successfully!");
    return res
      .status(200)
      .json({ success: true, message: "Recipe removed from favorites." });
  } catch (error) {
    console.error("🚨 Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Server error", error: error.message });
  }
};

// Get all favorite recipes
export const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("favorites"); // Populate recipe details
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Server error", error: error.message });
  }
};



