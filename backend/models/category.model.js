import mongoose from "mongoose";
const { Schema } = mongoose;

const recipeSchema = new Schema({
name : String,
menuId: Number
})