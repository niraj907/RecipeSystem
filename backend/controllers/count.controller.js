import { User } from '../models/user.model.js';
import { recipeModel } from "../models/recipe.model.js";

export const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ success: true, totalUsers: userCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getRecipeCount = async (req, res) => {
  try {
    const recipeCount = await recipeModel.countDocuments();
    res.status(200).json({ success: true, totalRecipes: recipeCount });
  } catch (error) {
    console.error("Error fetching recipe count:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getUserGenderCount = async (req, res) => {
  try {
    const maleCount = await User.countDocuments({ gender: 'male' });
    const femaleCount = await User.countDocuments({ gender: 'female' });

    res.status(200).json({
      success: true,
      maleUsers: maleCount,
      femaleUsers: femaleCount,
    });
  } catch (error) {
    console.error("Error fetching user gender count:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
