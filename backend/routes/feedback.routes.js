import express from "express";
import { createFeedback, getRecipeFeedback, getRecipeRatingCount , editFeedback, deleteFeedback} from "../controllers/feedback.controller.js";

const router = express.Router();

// Route to submit feedback
router.post("/feedback", createFeedback);

// Route to get feedback for a specific recipe
router.get("/feedback/:recipeId", getRecipeFeedback);

// Route to get total rating count for a specific recipe
router.get("/rating-count/:recipeId", getRecipeRatingCount);

router.put("/feedback/:id", editFeedback); // Edit feedback
router.delete("/feedback/:id", deleteFeedback); // Delete feedback

export default router;