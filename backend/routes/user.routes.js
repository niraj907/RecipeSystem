import express from "express";
import { addToFavorites,removeFromFavorites,getFavorites} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/add-favorite', addToFavorites); // Add recipe to favorites
router.delete('/remove-favorite', removeFromFavorites);
router.get("/:userId/favorites", getFavorites); // Get all favorite recipes

export default router;
