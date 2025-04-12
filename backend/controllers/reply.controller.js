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