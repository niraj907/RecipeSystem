import express from "express";
import { addRecipe, getAllRecipes, getSearchedRecipe, getRecipeId, editRecipe, deleteRecipe, getCategory } from "../controllers/recipe.controller.js";
const router = express.Router();
router.post("/", addRecipe); // add recipe
router.get("/items",getSearchedRecipe)
router.get("/",getAllRecipes);// get all recipes
router.get("/:id",getRecipeId);// get  recipes by id
router.put("/:id",editRecipe) // Edit recipe
router.delete("/:id",deleteRecipe) // delete recipe

router.get("/categories/:category", getCategory); // Get recipes by category
export default router;
