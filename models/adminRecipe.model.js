import mongoose from "mongoose";

const AdminRecipeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    image: { type: String }, 
  },
  { timestamps: true }
);

export const AdminRecipe = mongoose.model("AdminRecipe", AdminRecipeSchema);
