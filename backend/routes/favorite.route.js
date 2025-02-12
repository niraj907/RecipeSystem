import express from "express";
import { addToFavorites, removeFromFavorites, getUserFavorites } from "../controllers/favorite.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Ensure user is authenticated

const router = express.Router();

router.post("/:recipeId/favorite", verifyToken, addToFavorites); // Add to favorites
router.delete("/:recipeId/unfavorite", verifyToken, removeFromFavorites); // Remove from favorites
router.get("/favorites", verifyToken, getUserFavorites); // Get all favorite recipes

export default router;
