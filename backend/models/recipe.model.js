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
  ingredients: { type: Array, required: true, },
  instructions: { type: Array, required: true,},
  tot_time: { type: String, required: true },
  prep_time: { type: String, required: true },
  cook_time: { type: String, required: true },
  nepal: { type: String, required: true },
  hindi: { type: String, required: true },
  english: { type: String, required: true },
});

// Create and export the recipe model
export const recipeModel = mongoose.model("recipe", recipeSchema);
