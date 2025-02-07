import { User } from '../models/user.model.js';
import { recipeModel } from "../models/recipe.model.js";

export const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // Count total users
    res.status(200).json({ success: true, totalUsers: userCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message  });
  }
};

export const getRecipeCount = async (req, res) => {
  try {
    const recipeCount = await recipeModel.countDocuments(); // Count total recipes
    res.status(200).json({ success: true, totalRecipes: recipeCount });
  } catch (error) {
    console.error("Error fetching recipe count:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const getUserGenderCount = async (req, res) => {
    try {
      const maleCount = await User.countDocuments({ gender: 'male' }); // Count male users
      const femaleCount = await User.countDocuments({ gender: 'female' }); // Count female users
    //  const recipeCount = await recipeModel.countDocuments(); // Fetch recipe count here

      res.status(200).json({ 
        success: true, 
      //  totalUsers: maleCount + femaleCount, 
        maleUsers: maleCount, 
        femaleUsers: femaleCount,
      //  totalRecipes: recipeCount // Corrected key name for consistency
      });
    } catch (error) {
      console.error("Error fetching user gender count:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message  });
    }
  };
