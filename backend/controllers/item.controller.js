import itemModel from "../models/item.model.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addItem = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate the 'name' field
    if (!name) {
      console.log("Validation Error: Name is required");
      return res.status(400).json({ success: false, msg: "Name is required" });
    }

    // Validate if files are uploaded
    if (!req.files || !req.files.images) {
      console.log("Validation Error: Image is required");
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

    // Save the item to the database
    console.log("Saving item to the database...");
    const newItem = new itemModel({
      name,
      images: [
        {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      ],
    });

    const savedItem = await newItem.save();
    console.log("Item saved successfully:", savedItem);

    return res.status(200).json({
      success: true,
      msg: "Item added successfully",
      data: savedItem,
    });
  } catch (error) {
    console.error("Error in addItem:", error);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
