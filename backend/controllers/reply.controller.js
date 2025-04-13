import { ReplyMessage } from "../models/reply.model.js";
import { User } from "../models/user.model.js";
import { FeedbackMessage } from "../models/feedback.model.js";

export const createReply = async (req, res) => {
    const { userId, recipeId, feedbackId, comment } = req.body;

    try {
        // Validate required fields
        if (!userId || !recipeId || !feedbackId || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }

        // Check if the feedback exists
        const feedback = await FeedbackMessage.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Create reply object
        const reply = new ReplyMessage({
            userId,
            recipeId,
            feedbackId,
            name: user.name,
            image: user.images[0]?.url || "",
            comment,
        });

        // Save reply to the database
        await reply.save();

        // Return success response
        res.status(201).json({ message: "Reply submitted successfully", reply });
    } catch (error) {
        console.error("Error submitting reply:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get all replies for a specific feedback
export const getFeedbackReplies = async (req, res) => {
    const { feedbackId } = req.params;

    try {
        // Check if the feedback exists
        const feedback = await FeedbackMessage.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Find all replies for the feedback
        const replies = await ReplyMessage.find({ feedbackId });

        // Return the replies
        res.status(200).json({ feedbackId, replies });
    } catch (error) {
        console.error("Error fetching replies:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// Like a reply
export const likeReply = async (req, res) => {
    try {
      const { userId } = req.body; // Get userId from the request body
      const replyId = req.params.id; // Get replyId from the URL
  
      const reply = await ReplyMessage.findById(replyId);
      if (!reply) {
        return res.status(404).json({ success: false, msg: "Reply not found" });
      }
  
      // Check if the user has already liked the reply
      if (reply.likedBy.includes(userId)) {
        return res.status(400).json({ success: false, msg: "You have already liked this reply" });
      }
  
      // Add the user to the likedBy array and increment likes
      reply.likedBy.push(userId);
      reply.likes += 1;
      await reply.save();
  
      res.status(200).json({ success: true, msg: "Reply liked successfully", data: reply });
    } catch (error) {
      res.status(500).json({ success: false, msg: "Error liking reply", error: error.message });
    }
  };
  
  // Unlike a reply
  export const unlikeReply = async (req, res) => {
    try {
      const { userId } = req.body; // Get userId from the request body
      const replyId = req.params.id; // Get replyId from the URL
  
      const reply = await ReplyMessage.findById(replyId);
      if (!reply) {
        return res.status(404).json({ success: false, msg: "Reply not found" });
      }
  
      // Check if the user has liked the reply
      if (!reply.likedBy.includes(userId)) {
        return res.status(400).json({ success: false, msg: "You have not liked this reply" });
      }
  
      // Remove the user from the likedBy array and decrement likes
      reply.likedBy = reply.likedBy.filter(id => id.toString() !== userId);
      reply.likes -= 1;
      await reply.save();
  
      res.status(200).json({ success: true, msg: "Reply unliked successfully", data: reply });
    } catch (error) {
      res.status(500).json({ success: false, msg: "Error unliking reply", error: error.message });
    }
  };