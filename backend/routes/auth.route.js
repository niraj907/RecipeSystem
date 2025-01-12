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
  deleteUserById
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


router.get('/allUser', getAllUsers); // get all user
router.get('/:id', getUserById); //get user by id
router.put('/:id', updateUserById); // update 
router.delete('/:id', deleteUserById); // delete

export default router;
