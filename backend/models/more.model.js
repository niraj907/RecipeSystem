import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the "more" schema
const moreSchema = new Schema({
  tot_time: { type: String, required: true },
  prep_time: { type: String, required: true },
  cook_time: { type: String, required: true },
});

// Create models for the above schemas
export const moreModel = mongoose.model("more", moreSchema);