import { admin } from '../models/admin.model.js';
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import crypto from 'crypto'; 
import { sendPasswordResetEmail , sendResetSuccessEmail, sendUpdatePasswordSuccessEmail} from '../mailtrap/emails.js';
import { generateToken } from '../utils/generateToken.js';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ceateAdmin
const createAdmin = async () => {
  try {
    const existingAdmin = await admin.findOne({ email: "nirajchaudhary@gmail.com" });

    if (existingAdmin) {
      console.log("Admin with this email already exists.");
      return;  // Stop execution if the admin already exists
    }

    const salt = await bcryptjs.genSalt(10); // Generate salt
    const hashedPassword = await bcryptjs.hash("nirajchy", salt); // Hash the password

    const newAdmin = new admin({
      name: "niraj",
      email: "nirajchaudhary@gmail.com",
      password: hashedPassword, // Store hashed password
    });

    await newAdmin.save();
    console.log("Admin created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

createAdmin();


// admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const adminUser  = await admin.findOne({ email });

    if (!adminUser ) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcryptjs.compare(password, adminUser .password);

    if (!isMatch) {
      return res.status(401).json({ message: "The password you entered is incorrect. Please try again." });
    }

    // Update last login time
    adminUser .lastLogin = new Date();
    await adminUser .save();

    // Generate token with correct payload
const admin_Token = generateToken(adminUser._id);

// Set cookie with correct name
res.cookie("adminToken", admin_Token, { 
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
});

    console.log("Request Cookies:", req.cookies);
    // Log the cookies being sent in the response
    console.log("Cookies after setting:", res.getHeaders()['set-cookie']);

    // Respond with success message and admin details (excluding password)
    res.status(200).json({
      message: "Login successful",
      admin: {
        id: adminUser ._id,
        name: adminUser .name,
        email: adminUser .email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message || error);
    return res.status(500).json({ message: "Server error" });
  }
};


// update admin password
export const adminUpdatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate input fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: "All password fields are required" 
      });
    }

    // Find admin using different variable name
    const adminUser = await admin.findById(req.adminId);
    if (!adminUser) {
      return res.status(404).json({ 
        success: false, 
        message: "Admin not found" 
      });
    }

    // Verify current password
    const isPasswordValid = await bcryptjs.compare(currentPassword, adminUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: "Current password is incorrect" 
      });
    }

    // Validate new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: "New passwords do not match" 
      });
    }

    // Hash and save new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    adminUser.password = hashedPassword;
    await adminUser.save();
    await sendUpdatePasswordSuccessEmail(adminUser.email);
    return res.status(200).json({ 
      success: true, 
      message: "Password updated successfully" 
    });

  } catch (error) {
    console.error("Password update error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};


// fetch admin detail
export const getAdmin = async (req, res) => {
  try {
   console.log("Fetching admin details");
    const adminUser = await admin.findOne(); // Fetch the first admin user

    if (!adminUser) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({ admin: adminUser });
  } catch (error) {
    console.log("Error fetching admin", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// update code
export const updateAdmin = async (req, res) => {
  try {
    console.log("Update request received for adminUser:", req.params.id);
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const { password, ...otherUpdates } = req.body;
    let updatedUserData = { ...otherUpdates };

    // Handle image uploads if provided
    if (req.files && req.files.images) {
      console.log("Processing image upload...");
      let imageFiles = req.files.images;

      // Ensure imageFiles is always an array for easier processing
      if (!Array.isArray(imageFiles)) {
        imageFiles = [imageFiles];
      }

      updatedUserData.images = [];

      for (const imageFile of imageFiles) {
        // Validate file type
        const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
        if (!allowedExtensions.includes(imageFile.mimetype)) {
          console.log("Invalid file type:", imageFile.mimetype);
          return res.status(400).json({ success: false, message: "Invalid file type" });
        }

        // Upload the file to Cloudinary
        console.log("Uploading to Cloudinary...");
        const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.tempFilePath);

        if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.log("Cloudinary upload error:", cloudinaryResponse.error || "Unknown error");
          return res.status(500).json({ success: false, message: "Error uploading image" });
        }

        // Add uploaded image to the array
        updatedUserData.images.push({
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        });
      }
    }
    // Hash the new password if it is being updated
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      updatedUserData.password = hashedPassword; // Store hashed password
    }

    if (!req.params.id || req.params.id.length !== 24) {
      return res.status(400).json({ success: false, message: "Invalid adminUser ID format" });
    }

    console.log("Updating adminUser in database...");
    const adminUser = await admin.findByIdAndUpdate(req.params.id, updatedUserData, { new: true });

    if (!adminUser) {
      console.log("Admin user not found for update");
      return res.status(404).json({ success: false, message: "Admin user not found" });
    }

    console.log("Admin user updated successfully:", adminUser);
    res.status(200).json({ success: true, adminUser });
  } catch (error) {
    console.error("Error in updateAdmin:", error.message);
    res.status(500).json({ success: false, message: "Error updating admin user", error: error.message });
  }
};


//logout
export const adminLogout = async (req, res) => { 
  res.clearCookie("adminToken");
  res.status(200).json({success: true, message: "Logged out successfully"});
  }




// forgot Password
  export const adminforgotPassword = async (req, res) => { 
    console.log('Received request body:', req.body);  

    const email = req.body.email;  // Extract email correctly
    console.log("Extracted email:", email);

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Validate email format using a regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Find the admin user by email
        const adminUser = await admin.findOne({ email });

        if (!adminUser) {
            console.log("Admin not found with email:", email);
            return res.status(400).json({ success: false, message: "Admin not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour validity

        adminUser.resetPasswordToken = resetToken; 
        adminUser.resetPasswordExpiresAt = resetTokenExpiresAt;

        await adminUser.save();

        await sendPasswordResetEmail(
            adminUser.email,
            `http://localhost:5173/reset-password-admin/${resetToken}`
        );

        console.log("Password reset link sent to:", adminUser.email);  

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });

    } catch (error) {
        console.error("Error in forgotPassword:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// Reset Password
export const adminResetPassword = async (req,res) =>{
  try {
    const {token} = req.params;
    const {password} = req.body;

    const adminUser = await admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt : {$gt: Date.now()},
    });

    if(!adminUser){
      return res.status(400).json({success:false,message: "This email is not registered with us."});
    }

    //update password
    const hashedPassword = await bcryptjs.hash(password,10);

    adminUser.password = hashedPassword;
    adminUser.resetPasswordToken = undefined;
    adminUser.resetPasswordExpiresAt = undefined;

    await adminUser.save();

    await sendResetSuccessEmail(adminUser.email);

    res.status(200).json({success: true, message:"Password reset successful"});
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(400).json({ success: false, message: error.message });  
  }
}




 

