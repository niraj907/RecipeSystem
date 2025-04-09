import { FeedbackMessage } from "../models/feedback.model.js";
import { User } from "../models/user.model.js";
import { recipeModel } from "../models/recipe.model.js";

export const createFeedback = async (req, res) => {
    const { userId, recipeId, rating, comment } = req.body;
  
    try {
      // Validate required fields
      if (!userId || !recipeId || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the recipe exists
      const recipe = await recipeModel.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      // Create feedback object
      const feedback = new FeedbackMessage({
        userId,
        recipeId,
        name: user.name, 
        image: user.images[0]?.url || "", 
        rating,
        comment,
      });
  
      // Save feedback to the database
      await feedback.save();

          // Update the recipe's ratingCount
    recipe.ratingCount += rating;
    await recipe.save();
  
      // Return success response
      res.status(201).json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };




// Get all feedback for a specific recipe
export const getRecipeFeedback = async (req, res) => {
  const { recipeId } = req.params;

  try {
    // Check if the recipe exists
    const recipe = await recipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Find all feedback messages for the recipe
    const feedbackMessages = await FeedbackMessage.find({ recipeId });

    // Return the feedback messages
    res.status(200).json({ recipeId, feedbackMessages });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Get total rating count for a specific recipe
export const getRecipeRatingCount = async (req, res) => {
  const { recipeId } = req.params;

  try {
    // Check if the recipe exists
    const recipe = await recipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Return the ratingCount
    res.status(200).json({ recipeId, totalRating: recipe.ratingCount });
  } catch (error) {
    console.error("Error calculating rating count:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};