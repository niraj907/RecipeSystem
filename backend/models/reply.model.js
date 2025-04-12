import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User ", required: true },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
    feedbackId: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback", required: true },
    name: { type: String, required: true },
    image: { type: String, required: true }, 
    comment: { type: String, required: true },
  },
  { timestamps: true } 
);

export const ReplyMessage = mongoose.model("Reply", replySchema);