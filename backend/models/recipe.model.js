import mongoose from "mongoose";
const { Schema } = mongoose;

const recipeSchema = new Schema({
  menuId : { type:Number, required : true } ,
  images: [
    {public_id: { type: String, required: true,},
    url: { type: String, required: true,},},
  ],
  name: {type: String, required: true,},
  category: { type: String, required: true, enum: ['breakfast', 'lunch','dinner','snacks'] },
  description: { type: String, required: true, },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  tot_time: { type: String, required: true },
  prep_time: { type: String, required: true },
  cook_time: { type: String, required: true },
  nepal: { type: String, required: true },
  nepalPublishedName: { type: String, required: true },
  hindi: { type: String, required: true },
  hindiPublishedName: { type: String, required: true },
  english: { type: String, required: true },
  englishPublishedName: { type: String, required: true },
  ratingCount: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: () => Date.now() },
});

// Create and export the recipe model
export const recipeModel = mongoose.model("Recipe", recipeSchema);
