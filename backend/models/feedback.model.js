import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
    name: { type: String, required: true },
    image: { type: String, required: true }, 
    imagerecipe: { type: String, required: true }, 
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    likes: { type: Number, default: 0 }, // Number of likes
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the comment
  },
  { timestamps: true } 
);

export const FeedbackMessage = mongoose.model("Feedback", feedbackSchema);