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




export const getMonthlyUserGenderStats = async (req, res) => {
  try {
    const monthlyStats = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" }, // Extract month from createdAt timestamp
          gender: 1
        }
      },
      {
        $group: {
          _id: {
            month: "$month",
            gender: "$gender"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.month",
          males: {
            $sum: {
              $cond: [{ $eq: ["$_id.gender", "male"] }, "$count", 0]
            }
          },
          females: {
            $sum: {
              $cond: [{ $eq: ["$_id.gender", "female"] }, "$count", 0]
            }
          }
        }
      },
      {
        $project: {
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Jan" },
                { case: { $eq: ["$_id", 2] }, then: "Feb" },
                { case: { $eq: ["$_id", 3] }, then: "Mar" },
                { case: { $eq: ["$_id", 4] }, then: "Apr" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "Jun" },
              ],
              default: "Unknown"
            }
          },
          males: 1,
          females: 1
        }
      },
      { $sort: { "_id": 1 } } // Sort by month number
    ]);

    res.status(200).json({
      success: true,
      data: monthlyStats
    });
    
  } catch (error) {
    console.error("Error fetching monthly gender stats:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};