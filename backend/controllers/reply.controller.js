import { ReplyMessage } from "../models/reply.model.js";
import { User } from "../models/user.model.js";
import { FeedbackMessage } from "../models/feedback.model.js";
import mongoose from "mongoose"; 

export const createReply = async (req, res) => {
  const { userId, recipeId, feedbackId, comment } = req.body;

    try {
        // Validate required fields
        if (!userId || !feedbackId || !comment) {
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
          feedbackId,
          recipeId, // optional if not needed
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




export const likeReply = async (req, res) => {
    try {
      const { userId } = req.body;
      const { replyId } = req.params;

      // ID validation
      if (!mongoose.Types.ObjectId.isValid(replyId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ 
          success: false, 
          msg: "Invalid ID format" 
        });
      }

      const reply = await ReplyMessage.findById(replyId);
      if (!reply) {
        return res.status(404).json({ 
          success: false, 
          msg: "Reply not found" 
        });
      }

      if (reply.likedBy.includes(userId)) {
        return res.status(400).json({ 
          success: false, 
          msg: "You have already liked this reply" 
        });
      }

      reply.likedBy.push(userId);
      reply.likes += 1;
      await reply.save();

      res.status(200).json({ 
        success: true, 
        msg: "Reply liked successfully", 
        data: reply 
      });
    } catch (error) {
      console.error("Error in likeReply:", error);
      res.status(500).json({ 
        success: false, 
        msg: "Error liking reply", 
        error: error.message 
      });
    }
};

 
  export const unlikeReply = async (req, res) => {
      try {
        const { userId } = req.body;
        const { replyId } = req.params;
  
        // Validate ID formats
        if (!mongoose.Types.ObjectId.isValid(replyId) || !mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ 
            success: false, 
            msg: "Invalid ID format" 
          });
        }
  
        // Find the reply
        const reply = await ReplyMessage.findById(replyId);
        if (!reply) {
          return res.status(404).json({ 
            success: false, 
            msg: "Reply not found" 
          });
        }
  
        // Check if user already liked the reply
        const userIndex = reply.likedBy.indexOf(userId);
        if (userIndex === -1) {
          return res.status(400).json({ 
            success: false, 
            msg: "You have not liked this reply" 
          });
        }
  
        // Remove like
        reply.likedBy.splice(userIndex, 1);
        reply.likes -= 1;
        
        await reply.save();
  
        res.status(200).json({ 
          success: true, 
          msg: "Reply unliked successfully", 
          data: reply 
        });
  
      } catch (error) {
        console.error("Error in unlikeReply:", error);
        res.status(500).json({ 
          success: false, 
          msg: "Error unliking reply", 
          error: error.message 
        });
      }
  };


  export const editReply = async (req, res) => {
    const { replyId } = req.params; // Get replyId from the URL
    const { comment } = req.body; // Get updated comment from the request body

    try {
        // Validate required fields
        if (!comment) {
            return res.status(400).json({ success: false, msg: "Comment is required" });
        }

        // Find the reply and update the comment
        const updatedReply = await ReplyMessage.findByIdAndUpdate(
            replyId,
            { comment },
            { new: true } // Return the updated document
        );

        // Check if the reply exists
        if (!updatedReply) {
            return res.status(404).json({ success: false, msg: "Reply not found" });
        }

        // Return success response with the updated reply
        res.status(200).json({ success: true, msg: "Reply updated successfully", data: updatedReply });
    } catch (error) {
        console.error("Error updating reply:", error);
        res.status(500).json({ success: false, msg: "Error updating reply", error: error.message });
    }
};

  
export const deleteReply = async (req, res) => {
  const { replyId } = req.params; // Get replyId from the URL

  try {
      // Find the reply and delete it
      const deletedReply = await ReplyMessage.findByIdAndDelete(replyId);

      // Check if the reply exists
      if (!deletedReply) {
          return res.status(404).json({ success: false, msg: "Reply not found" });
      }

      // Return success response
      res.status(200).json({ success: true, msg: "Reply deleted successfully", data: deletedReply });
  } catch (error) {
      console.error("Error deleting reply:", error);
      res.status(500).json({ success: false, msg: "Error deleting reply", error: error.message });
  }
};