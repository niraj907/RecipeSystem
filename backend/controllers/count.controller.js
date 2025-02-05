import { User } from '../models/user.model.js';

export const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // Count total users
    res.status(200).json({ success: true, totalUsers: userCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getUserGenderCount = async (req, res) => {
    try {
      const maleCount = await User.countDocuments({ gender: 'male' }); // Count male users
      const femaleCount = await User.countDocuments({ gender: 'female' }); // Count female users
      
      res.status(200).json({ 
        success: true, 
        totalUsers: maleCount + femaleCount, 
        maleUsers: maleCount, 
        femaleUsers: femaleCount 
      });
    } catch (error) {
      console.error("Error fetching user gender count:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };