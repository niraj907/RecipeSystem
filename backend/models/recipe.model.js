import mongoose from "mongoose";
const { Schema } = mongoose;

const recipeSchema = new Schema({
//   menuId : {
// type:Number
//   } ,

   images: [{public_id: { type: String, required: true,},
   url: { type: String, required: true,},},
  ],
  name: {type: String, required: true,},
  cateRecipe: { type: String,  required: true,},
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
