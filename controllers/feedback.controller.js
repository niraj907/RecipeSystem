import { FeedbackMessage } from "../models/feedback.model.js";
import { User } from "../models/user.model.js";
import { recipeModel } from "../models/recipe.model.js";

// create feedback
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
        imagerecipe: recipe.images[0]?.url || "", 
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


  // admin to show the get all feedback
  export const getAllFeedback = async (req, res) => { 
    try {
      const feedbacks = await FeedbackMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({ 
        success: true, 
        message: "Fetched all feedback successfully", 
        data: feedbacks 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Error fetching feedback", 
        error: error.message 
      });
    }
  };


// user Get all feedback for a specific recipe
export const getRecipeFeedback = async (req, res) => {
  const { recipeId } = req.params;

  try {
    // Check if the recipe exists
    const recipe = await recipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Find all feedback messages for the recipe
    const feedbackMessages = await FeedbackMessage.find({ recipeId }).sort({createdAt: -1})

    // Return the feedback messages
    res.status(200).json({ recipeId, feedbackMessages });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// edit feedback
export const editFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    // Find the original feedback
    const originalFeedback = await FeedbackMessage.findById(id);
    if (!originalFeedback) {
      return res.status(404).json({ success: false, msg: "Feedback not found" });
    }

    // Update the feedback
    const updatedFeedback = await FeedbackMessage.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedFeedback) {
      return res.status(404).json({ success: false, msg: "Feedback not found" });
    }

    // If the rating is updated, adjust the recipe's ratingCount
    if (updatedData.rating && updatedData.rating !== originalFeedback.rating) {
      const recipe = await recipeModel.findById(originalFeedback.recipeId);
      if (recipe) {
        // Subtract the old rating and add the new rating
        recipe.ratingCount = recipe.ratingCount - originalFeedback.rating + updatedData.rating;
        await recipe.save();
      }
    }

    return res.status(200).json({
      success: true,
      msg: "Feedback updated successfully",
      data: updatedFeedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error updating feedback",
      error: error.message,
    });
  }
};


export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the feedback to be deleted
    const feedback = await FeedbackMessage.findById(id);
    if (!feedback) {
      return res.status(404).json({ success: false, msg: "Feedback not found" });
    }

    // Delete the feedback
    const result = await FeedbackMessage.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ success: false, msg: "Feedback not found" });
    }

    // Update the recipe's ratingCount
    const recipe = await recipeModel.findById(feedback.recipeId);
    if (recipe) {
      recipe.ratingCount -= feedback.rating;
      await recipe.save();
    }

    res.status(200).json({ success: true, msg: "Successfully deleted Feedback" });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error deleting feedback",
      error: error.message,
    });
  }
};



// Like a feedback comment
export const likeFeedback = async (req, res) => {
  try {
    const { userId } = req.body;
    const feedbackId = req.params.id;

    const feedback = await FeedbackMessage.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ success: false, msg: "Feedback not found" });
    }

    if (feedback.likedBy.includes(userId)) {
      return res.status(400).json({ success: false, msg: "Already liked" });
    }

    feedback.likedBy.push(userId);
    feedback.likes = feedback.likedBy.length; // Update likes count based on array length
    await feedback.save();

    res.status(200).json({ 
      success: true, 
      msg: "Feedback liked successfully", 
      data: feedback 
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error liking feedback", error: error.message });
  }
};


// Unlike a feedback comment
export const unlikeFeedback = async (req, res) => {
  try {
    const { userId } = req.body;
    const feedbackId = req.params.id;

    const feedback = await FeedbackMessage.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ success: false, msg: "Feedback not found" });
    }

    if (!feedback.likedBy.includes(userId)) {
      return res.status(400).json({ success: false, msg: "Not yet liked" });
    }

    feedback.likedBy = feedback.likedBy.filter(id => id.toString() !== userId);
    feedback.likes = feedback.likedBy.length; // Update likes count based on array length
    await feedback.save();

    res.status(200).json({ 
      success: true, 
      msg: "Feedback unliked successfully", 
      data: feedback 
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error unliking feedback", error: error.message });
  }
};