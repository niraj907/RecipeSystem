import { recipeModel } from "../models/recipe.model.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Cloudinary Configuration - Make sure to use v2
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// add recipe
export const addRecipe = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files structure:", req.files ? Object.keys(req.files) : "No files");
    
    // Check if req.files exists
    if (!req.files) {
      return res.status(400).json({ 
        success: false, 
        msg: "No files were uploaded. Make sure you're using the correct middleware for file uploads." 
      });
    }

    const { 
      menuId, 
      name, 
      category, 
      description, 
      ingredients, 
      instructions, 
      tot_time, 
      prep_time, 
      cook_time 
    } = req.body;

    // List of required fields
    const requiredFields = [
      'menuId', 
      'name', 
      'category', 
      'description', 
      'ingredients', 
      'instructions', 
      'tot_time', 
      'prep_time', 
      'cook_time'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        msg: "Missing fields: " + missingFields.join(", ") 
      });
    }

    // Validate required files
    const requiredFiles = ['images', 'nepalVideo', 'hindiVideo', 'englishVideo'];
    const missingFiles = requiredFiles.filter(field => !req.files[field]);
    
    if (missingFiles.length > 0) {
      return res.status(400).json({
        success: false,
        msg: `Missing files: ${missingFiles.join(", ")}`
      });
    }

    // Validate image file
    const imageFile = req.files.images;
    console.log("Image file details:", {
      name: imageFile.name,
      size: imageFile.size,
      mimetype: imageFile.mimetype,
      tempFilePath: imageFile.tempFilePath,
      exists: fs.existsSync(imageFile.tempFilePath)
    });
    
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    
    if (!allowedImageTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({ 
        success: false, 
        msg: `Invalid image type: ${imageFile.mimetype}. Allowed types: ${allowedImageTypes.join(", ")}` 
      });
    }

    // Validate video files
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
    const videoFiles = ['nepalVideo', 'hindiVideo', 'englishVideo'];
    
    for (const videoField of videoFiles) {
      const videoFile = req.files[videoField];
      console.log(`${videoField} details:`, {
        name: videoFile.name,
        size: videoFile.size,
        mimetype: videoFile.mimetype
      });
      
      if (!allowedVideoTypes.includes(videoFile.mimetype)) {
        return res.status(400).json({
          success: false,
          msg: `Invalid video type for ${videoField}: ${videoFile.mimetype}. Allowed types: ${allowedVideoTypes.join(", ")}`
        });
      }
    }

    // Upload image to Cloudinary
    console.log("Uploading image to Cloudinary...");
    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.v2.uploader.upload(imageFile.tempFilePath, {
        resource_type: "image", // Explicitly set resource_type for image
        timeout: 60000 // 1 minute timeout
      });
      
      console.log("Image upload successful:", cloudinaryResponse.public_id);
    } catch (error) {
      console.error("Error uploading image:", error);
      return res.status(500).json({ 
        success: false, 
        msg: "Error uploading image to Cloudinary", 
        error: error.message 
      });
    }

    // Upload videos one by one with explicit error handling
    let nepalVideoRes, hindiVideoRes, englishVideoRes;
    
    // Upload nepalVideo
    try {
      console.log("Uploading nepalVideo to Cloudinary...");
      nepalVideoRes = await cloudinary.v2.uploader.upload(req.files.nepalVideo.tempFilePath, {
        resource_type: "video", // CRITICAL: This must be set to "video"
        timeout: 120000 // 2 minute timeout
      });
      console.log("nepalVideo upload successful:", nepalVideoRes.public_id);
    } catch (error) {
      console.error("Error uploading nepalVideo:", error);
      return res.status(500).json({ 
        success: false, 
        msg: "Error uploading nepalVideo to Cloudinary", 
        error: error.message 
      });
    }
    
    // Upload hindiVideo
    try {
      console.log("Uploading hindiVideo to Cloudinary...");
      hindiVideoRes = await cloudinary.v2.uploader.upload(req.files.hindiVideo.tempFilePath, {
        resource_type: "video", // CRITICAL: This must be set to "video"
        timeout: 120000 // 2 minute timeout
      });
      console.log("hindiVideo upload successful:", hindiVideoRes.public_id);
    } catch (error) {
      console.error("Error uploading hindiVideo:", error);
      return res.status(500).json({ 
        success: false, 
        msg: "Error uploading hindiVideo to Cloudinary", 
        error: error.message 
      });
    }
    
    // Upload englishVideo
    try {
      console.log("Uploading englishVideo to Cloudinary...");
      englishVideoRes = await cloudinary.v2.uploader.upload(req.files.englishVideo.tempFilePath, {
        resource_type: "video", // CRITICAL: This must be set to "video"
        timeout: 120000 // 2 minute timeout
      });
      console.log("englishVideo upload successful:", englishVideoRes.public_id);
    } catch (error) {
      console.error("Error uploading englishVideo:", error);
      return res.status(500).json({ 
        success: false, 
        msg: "Error uploading englishVideo to Cloudinary", 
        error: error.message 
      });
    }

    // Parse ingredients and instructions if they're sent as strings
    let parsedIngredients = ingredients;
    let parsedInstructions = instructions;
    
    if (typeof ingredients === 'string') {
      try {
        parsedIngredients = JSON.parse(ingredients);
      } catch (e) {
        parsedIngredients = ingredients.split(',').map(item => item.trim());
      }
    }
    
    if (typeof instructions === 'string') {
      try {
        parsedInstructions = JSON.parse(instructions);
      } catch (e) {
        parsedInstructions = instructions.split(',').map(item => item.trim());
      }
    }

    // Create and save the recipe
    try {
      console.log("Creating recipe document...");
      const recipe = new recipeModel({
        menuId: Number(menuId),
        images: [
          {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          },
        ],
        name,
        category,
        description,
        ingredients: parsedIngredients,
        instructions: parsedInstructions,
        tot_time,
        prep_time,
        cook_time,
        nepalVideo: [{
          public_id: nepalVideoRes.public_id,
          url: nepalVideoRes.secure_url
        }],
        hindiVideo: [{
          public_id: hindiVideoRes.public_id,
          url: hindiVideoRes.secure_url
        }],
        englishVideo: [{
          public_id: englishVideoRes.public_id,
          url: englishVideoRes.secure_url
        }]
      });

      console.log("Saving recipe to database...");
      const savedRecipe = await recipe.save();
      console.log("Recipe saved successfully:", savedRecipe._id);

      return res.status(201).json({
        success: true,
        msg: "Recipe added successfully", 
        data: savedRecipe
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ 
        success: false, 
        msg: "Error saving recipe to database", 
        error: dbError.message 
      });
    }
  } catch (error) {
    console.error("Error in addRecipe:", error);
    return res.status(500).json({ 
      success: false, 
      msg: "Internal server error", 
      error: error.message 
    });
  }
};


    

// get all recipes
export const getAllRecipes = async (req, res) => { 
  try {
   // console.log("Fetching all recipes");
    const recipes = await recipeModel.find().sort({ createdAt: -1 });
  //  console.log(recipes);
    return res.status(200).json({ success: true, msg: "Fetched all recipes successfully", data: recipes });
} catch (error) {
 // console.log("Error fetching recipes", error);
  res.status(500).json({ success: false, msg: "Error fetching recipes", error: error.message });
}
}


// get search recipe

export const getSearchedRecipe = async (req, res) => {
  try {
    console.log("Search request received with query:", req.query.q); // Debug log
    const query = req.query.q;
    
    if (!query) {
      console.log("Query parameter missing"); // Debug log
      return res.status(400).json({ message: "Query parameter is required" });
    }
    
    const recipes = await recipeModel.find({ name: { $regex: query, $options: "i" } });

    if (recipes.length === 0) {
      console.log("No recipes found for:", query); // Debug log
      return res.status(404).json({ message: "No recipes found" });
    }

    console.log("Recipes found:", recipes); // Debug log
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error in search:", error.message); // Debug log
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get category-based items
export const getCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const recipes = await recipeModel.find({ category: new RegExp(`^${category}$`, "i") });

    if (!recipes.length) {
      return res.status(404).json({ success: false, msg: "Category not found" });
    }

    return res.status(200).json({ success: true, msg: "Category found successfully", data: recipes });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error", error: error.message });
  }
};

// get recipe by id
export const getRecipeId = async (req, res) => {
   try {
       const recipes = await recipeModel.findById(req.params.id);
       if (!recipes) {
           return res.status(404).send('recipes not found.');
       }
       console.log(recipes);
       return res.status(200).json({ success: true, msg: "Fetched recipe successfully", data: recipes });
   } catch (error) {
     console.log('Error fetching recipes');
     res.status(500).json({ success: false, msg: "Error fetching recipe", error: error.message });
   }
};


// edit recipe 
// export const editRecipe = async (req, res) => {
//   try {
//     let updatedData = { ...req.body };

//     if (req.files && req.files.images) {
//       const imageFile = req.files.images;
//       const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.tempFilePath);
//       updatedData.images = [{ public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url }];
//     }



//     const updatedRecipe = await recipeModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     if (!updatedRecipe) return res.status(404).json({ success: false, msg: "Recipe not found" });

//     return res.status(200).json({ success: true, msg: "Recipe updated successfully", data: updatedRecipe });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: "Error updating recipe", error: error.message });
//   }
// };


// edit recipe 
export const editRecipe = async (req, res) => {
  try {
    console.log("Editing recipe with ID:", req.params.id);
    console.log("Request body:", req.body);
    console.log("Request files:", req.files ? Object.keys(req.files) : "No files");

    // First, find the existing recipe
    const existingRecipe = await recipeModel.findById(req.params.id);
    if (!existingRecipe) {
      return res.status(404).json({ success: false, msg: "Recipe not found" });
    }

    // Start with the existing data and update with new data from request body
    let updatedData = { ...req.body };

    // Handle image update if provided
    if (req.files && req.files.images) {
      try {
        console.log("Uploading new image to Cloudinary...");
        const imageFile = req.files.images;
        
        // Delete old image from Cloudinary if it exists
        if (existingRecipe.images && existingRecipe.images.length > 0) {
          try {
            await cloudinary.v2.uploader.destroy(existingRecipe.images[0].public_id);
            console.log("Old image deleted from Cloudinary");
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
        
        // Upload new image
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(imageFile.tempFilePath, {
          resource_type: "image"
        });
        
        updatedData.images = [{ 
          public_id: cloudinaryResponse.public_id, 
          url: cloudinaryResponse.secure_url 
        }];
        
        console.log("New image uploaded successfully:", cloudinaryResponse.public_id);
      } catch (imageError) {
        console.error("Error updating image:", imageError);
        return res.status(500).json({ 
          success: false, 
          msg: "Error updating image", 
          error: imageError.message 
        });
      }
    }

    // Handle nepalVideo update if provided
    if (req.files && req.files.nepalVideo) {
      try {
        console.log("Uploading new nepalVideo to Cloudinary...");
        
        // Delete old video from Cloudinary if it exists
        if (existingRecipe.nepalVideo && existingRecipe.nepalVideo.length > 0) {
          try {
            await cloudinary.v2.uploader.destroy(existingRecipe.nepalVideo[0].public_id, { 
              resource_type: "video" 
            });
            console.log("Old nepalVideo deleted from Cloudinary");
          } catch (deleteError) {
            console.error("Error deleting old nepalVideo:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
        
        // Upload new video
        const nepalVideoRes = await cloudinary.v2.uploader.upload(
          req.files.nepalVideo.tempFilePath, 
          { resource_type: "video" }
        );
        
        updatedData.nepalVideo = [{ 
          public_id: nepalVideoRes.public_id, 
          url: nepalVideoRes.secure_url 
        }];
        
        console.log("New nepalVideo uploaded successfully:", nepalVideoRes.public_id);
      } catch (videoError) {
        console.error("Error updating nepalVideo:", videoError);
        return res.status(500).json({ 
          success: false, 
          msg: "Error updating nepalVideo", 
          error: videoError.message 
        });
      }
    }

    // Handle hindiVideo update if provided
    if (req.files && req.files.hindiVideo) {
      try {
        console.log("Uploading new hindiVideo to Cloudinary...");
        
        // Delete old video from Cloudinary if it exists
        if (existingRecipe.hindiVideo && existingRecipe.hindiVideo.length > 0) {
          try {
            await cloudinary.v2.uploader.destroy(existingRecipe.hindiVideo[0].public_id, { 
              resource_type: "video" 
            });
            console.log("Old hindiVideo deleted from Cloudinary");
          } catch (deleteError) {
            console.error("Error deleting old hindiVideo:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
        
        // Upload new video
        const hindiVideoRes = await cloudinary.v2.uploader.upload(
          req.files.hindiVideo.tempFilePath, 
          { resource_type: "video" }
        );
        
        updatedData.hindiVideo = [{ 
          public_id: hindiVideoRes.public_id, 
          url: hindiVideoRes.secure_url 
        }];
        
        console.log("New hindiVideo uploaded successfully:", hindiVideoRes.public_id);
      } catch (videoError) {
        console.error("Error updating hindiVideo:", videoError);
        return res.status(500).json({ 
          success: false, 
          msg: "Error updating hindiVideo", 
          error: videoError.message 
        });
      }
    }

    // Handle englishVideo update if provided
    if (req.files && req.files.englishVideo) {
      try {
        console.log("Uploading new englishVideo to Cloudinary...");
        
        // Delete old video from Cloudinary if it exists
        if (existingRecipe.englishVideo && existingRecipe.englishVideo.length > 0) {
          try {
            await cloudinary.v2.uploader.destroy(existingRecipe.englishVideo[0].public_id, { 
              resource_type: "video" 
            });
            console.log("Old englishVideo deleted from Cloudinary");
          } catch (deleteError) {
            console.error("Error deleting old englishVideo:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
        
        // Upload new video
        const englishVideoRes = await cloudinary.v2.uploader.upload(
          req.files.englishVideo.tempFilePath, 
          { resource_type: "video" }
        );
        
        updatedData.englishVideo = [{ 
          public_id: englishVideoRes.public_id, 
          url: englishVideoRes.secure_url 
        }];
        
        console.log("New englishVideo uploaded successfully:", englishVideoRes.public_id);
      } catch (videoError) {
        console.error("Error updating englishVideo:", videoError);
        return res.status(500).json({ 
          success: false, 
          msg: "Error updating englishVideo", 
          error: videoError.message 
        });
      }
    }

    // Parse ingredients and instructions if they're sent as strings
    if (typeof updatedData.ingredients === 'string') {
      try {
        updatedData.ingredients = JSON.parse(updatedData.ingredients);
      } catch (e) {
        updatedData.ingredients = updatedData.ingredients.split(',').map(item => item.trim());
      }
    }
    
    if (typeof updatedData.instructions === 'string') {
      try {
        updatedData.instructions = JSON.parse(updatedData.instructions);
      } catch (e) {
        updatedData.instructions = updatedData.instructions.split(',').map(item => item.trim());
      }
    }

    // Update the recipe in the database
    console.log("Updating recipe in database...");
    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      req.params.id, 
      updatedData, 
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ success: false, msg: "Recipe not found after update" });
    }

    console.log("Recipe updated successfully:", updatedRecipe._id);
    return res.status(200).json({ 
      success: true, 
      msg: "Recipe updated successfully", 
      data: updatedRecipe 
    });
  } catch (error) {
    console.error("Error in editRecipe:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Error updating recipe", 
      error: error.message 
    });
  }
};




//delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const result = await recipeModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ success: false, msg: "Recipe not found" });
    console.log(result);
    res.status(200).json({ success: true, msg: "Successfully deleted recipe" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error deleting recipe", error: error.message });
  }
};