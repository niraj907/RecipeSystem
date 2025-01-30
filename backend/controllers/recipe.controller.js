import { recipeModel } from "../models/recipe.model.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// add recipe
export const addRecipe = async (req, res) => {
  try {
    const { name , category , description , ingredients , instructions,tot_time ,prep_time, cook_time, nepal ,hindi,  english} = req.body;

    // field all required 
    if (!name || !category || !description || !ingredients || !instructions || !tot_time || !prep_time ||  !cook_time || !nepal || !hindi || !english) {
      console.log('All fields are required');
      // throw new Error("All fields are required");
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }


    // Validate if files are uploaded
    if (!req.files || !req.files.images) {
      console.log("Image is required");
      console.log("Request files:", req.files); // Log for debugging
      return res.status(400).json({ success: false, msg: "Image is required" });
    }

    const imageFile = req.files.images;

    // Validate file type
    const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedExtensions.includes(imageFile.mimetype)) {
      console.log("Validation Error: Invalid file type");
      return res.status(400).json({ success: false, msg: "Invalid file type" });
    }

    // Upload the file to Cloudinary
    console.log("Uploading image to Cloudinary...");
    const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown error");
      return res.status(500).json({ success: false, msg: "Error uploading image" });
    }

    // Save the recipe to the database
    console.log("Saving recipe to the database...");

    console.log("Body: ",req.body);

    const recipes = new recipeModel({
      images: [
        {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      ],
      name,
      category,
      description,
      ingredients,
      instructions,
      tot_time ,
      prep_time, 
      cook_time, 
      nepal ,
      hindi, 
       english
       
    });
    

    const savedRecipe = await recipes.save();
    console.log("recipe saved successfully:", savedRecipe);

    return res.status(200).json({
      success: true,
      msg: "recipe added successfully",
      data: savedRecipe,
    });
  } catch (error) {
    console.error("Error in addRecipe:", error);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};






// get all recipes
export const getAllRecipes = async (req, res) => { 
  try {
    console.log("Fetching all recipes");
    const recipes = await recipeModel.find();
    console.log(recipes);
    return res.status(200).json({
      success: true,
      msg: "Get All recipes with sucessfully",
      data: recipes,
    });
   
} catch (error) {
  console.log("Error fetching recipes", error);
  res.status(500).json({success: false, message: error.message});
}
}




// get recipe by id
export const getRecipeId = async (req, res) => {
   try {
       const recipes = await recipeModel.findById(req.params.id);
       if (!recipes) {
           return res.status(404).send('recipes not found.');
       }
       console.log(recipes);
       return res.status(200).json({
        success: true,
        msg: "Get id by recipes with sucessfully",
        data: recipes,
      });
   } catch (error) {
     console.log('Error fetching recipes');
       res.status(500).json({success: false, message: error.message});
   }
};


// edit recipe 

export const editRecipe = async (req, res) => { 
  try {
    let updatedUserData = { ...req.body }; // Initialize the update object with request body

    // Handle image uploads if provided
    if (req.files && req.files.images) {
      const imageFile = req.files.images;

      // Validate file type
      const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!allowedExtensions.includes(imageFile.mimetype)) {
        return res.status(400).json({ success: false, message: "Invalid file type" });
      }

      // Upload the file to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.tempFilePath);

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return res.status(500).json({ success: false, message: "Error uploading image" });
      }

      // Update the images array in the updatedUserData object
      updatedUserData.images = [
        {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      ];
    }

    // Update the recipe in the database
    const result = await recipeModel.findByIdAndUpdate(req.params.id, updatedUserData, { new: true });

    if (!result) {
      return res.status(404).json({ success: false, msg: "Recipe not found" });
    }

    console.log("Recipe updated successfully:", result);
    return res.status(200).json({
      success: true,
      msg: "Update has been successful...",
      data: result,
    });

  } catch (error) {
    console.error("Error updating recipe:", error);
    return res.status(500).json({ success: false, msg: "There was an error updating the recipe" });
  }
};


// delete recipe
export const deleteRecipe = async (req, res) => { 
  try {
    const result = await recipeModel.findByIdAndDelete(req.params.id);
    console.log(result);
    res.status(200).send({ success: true, msg:'Successfully deleted the data...'});
} catch (error) {
    console.error(error);
    res.status(500).send('There was an error in deleting the data processing your request.');
}
}

