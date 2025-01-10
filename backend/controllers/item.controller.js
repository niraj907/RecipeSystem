import itemModel from "../models/item.model.js";
import cloudinary from "cloudinary";

export const addItem = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate 'name'
    if (!name) {
      console.log('Name is required');
      return res.status(400).json({ success: false, msg: "Name is required" });
    }

    // Validate 'images' field
    if (!req.files || !req.files.images) {
      console.log('Image is required');
      console.log("Request files: ", req.files);

      return res.status(400).json({ success: false, msg: "Image is required" });
    }

    const images = req.files.images;

    // Validate file type
    const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedExtensions.includes(images.mimetype)) {
      return res.status(400).json({ success: false, msg: "Invalid file type" });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(images.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown error");
      return res.status(500).json({ success: false, msg: "Error uploading image" });
    }

    // Save item to the database
    const newItem = new itemModel({
      name,
      images: [{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      }],
    });

    const savedItem = await newItem.save();
    res.status(200).json({
      success: true,
      msg: "Item added successfully",
      data: savedItem,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
