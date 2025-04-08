import express from "express";
import { createFeedback, getRecipeFeedback, getRecipeRatingCount } from "../controllers/feedback.controller.js";

const router = express.Router();

// Route to submit feedback
router.post("/feedback", createFeedback);

// Route to get feedback for a specific recipe
router.get("/feedback/:recipeId", getRecipeFeedback);

// Route to get total rating count for a specific recipe
router.get("/rating-count/:recipeId", getRecipeRatingCount);

export default router;