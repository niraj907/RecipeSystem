import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllNotifications,
  getNotifications,
  deleteNotification,
  markNotificationAsRead,
  getAlladminRecipe,
  deleteadminRecipe
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// User routes
router.get('/allUser', getAllUsers); // get all user
router.get('/:id', getUserById); //get user by id
router.put('/:id', updateUserById); // update 
router.delete('/:id', deleteUserById); // delete

// Notification routes - specific routes first
router.get("/notifications/all", getAllNotifications); // Get all notifications
router.get("/notifications/user/:userId", getNotifications); // Changed parameter name for clarity
router.put("/notifications/mark-read/:notificationId", markNotificationAsRead); // More descriptive path
router.delete("/notifications/:id", deleteNotification);
router.get("/getAlladminRecipe/save",getAlladminRecipe)
router.delete("/deleteadminRecipe/save/:id",deleteadminRecipe)
export default router;