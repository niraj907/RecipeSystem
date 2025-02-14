import express from "express";
import { addToFavorites} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/add-favorite', addToFavorites); // Add recipe to favorites

export default router;
// router.delete("/:userId/favorites", removeFromFavorites); // Remove recipe from favorites
// router.get("/:userId/favorites", getFavorites); // Get all favorite recipes
