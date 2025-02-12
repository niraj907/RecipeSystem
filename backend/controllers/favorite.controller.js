import { recipeModel } from "../models/recipe.model.js";

// Add to favorites
export const addToFavorites = async (req, res) => {
    try {
      const { recipeId } = req.params;
      const userId = req.userId; // Use userId instead of req.user.id
  
      const recipe = await recipeModel.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ success: false, msg: "Recipe not found" });
      }
  
      if (!recipe.favorites.includes(userId)) {
        recipe.favorites.push(userId);
        await recipe.save();
      }
  
      res.status(200).json({ success: true, msg: "Added to favorites", data: recipe });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
  };
  

// Remove from favorites
export const removeFromFavorites = async (req, res) => {
    try {
      const { recipeId } = req.params;
      const userId = req.user.id;
  
      const recipe = await recipeModel.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ success: false, msg: "Recipe not found" });
      }
  
      // Filter out null or undefined values and ensure valid IDs are compared
      recipe.favorites = recipe.favorites.filter(id => id && id.toString() !== userId.toString());
  
      // Save the updated recipe
      await recipe.save();
  
      res.status(200).json({ success: true, msg: "Removed from favorites", data: recipe });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
  };
  

// Get user's favorite recipes


export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // Get the userId from the token (which should be an ObjectId)

    // Ensure userId is cast to ObjectId before querying
    const objectId = mongoose.Types.ObjectId(userId);
    
    // Find all recipes where the favorites array contains the ObjectId of the user
    const recipes = await recipeModel.find({ favorites: objectId });

    if (recipes.length === 0) {
      return res.status(404).json({ success: false, msg: "No favorite recipes found" });
    }

    res.status(200).json({ success: true, msg: "Fetched favorite recipes", data: recipes });
  } catch (error) {
    console.log("Error fetching favorite recipes: ", error);
    res.status(500).json({ success: false, msg: "Error fetching favorite recipe"});
  }
};

