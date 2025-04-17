import mongoose from "mongoose";

const AdminFeedbackSchema = new mongoose.Schema(
  {
    FeedbackId: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback", required: true },
    name: { type: String, required: true },
    image: { type: String, required: true }, 
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export const AdminFeedback = mongoose.model("AdminFeedback", AdminFeedbackSchema);
