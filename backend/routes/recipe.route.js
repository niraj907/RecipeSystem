import express from "express";
import { addRecipe,getAllRecipes ,getRecipeId, editRecipe,deleteRecipe } from '../controllers/recipe.controller.js'

const router = express.Router();
router.post("/add", addRecipe); // add recipe
router.get("/",getAllRecipes);// get all recipes
router.get("/:id",getRecipeId);// get  recipes by id
router.put("/:id",editRecipe) // Edit recipe
router.delete("/:id",deleteRecipe) // delete recipe
export default router;
