import { admin } from '../models/admin.model.js';
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import crypto from 'crypto'; 
import jwt from 'jsonwebtoken'; 
import { sendPasswordResetEmail , sendResetSuccessEmail} from '../mailtrap/emails.js';
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

// adminLogin
// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body; 

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // Find the admin by email
//     const adminUser = await admin.findOne({ email });

//     if (!adminUser) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     // Compare entered password with hashed password in DB
//     const isMatch = await bcryptjs.compare(password, adminUser.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Update last login time
//     adminUser.lastLogin = new Date();
//     await adminUser.save();

//     return res.status(200).json({ message: "Login successful", admin: adminUser });

//   } catch (error) {
//     console.error("Login error:", error.message);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



// Example login function
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminUser  = await admin.findOne({ email });
    if (!adminUser ) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcryptjs.compare(password, adminUser .password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: adminUser ._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Use secure cookies in production
    res.status(200).json({ message: "Login successful", admin: adminUser  });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Admins
// export const getAdmin = async (req, res) => {
//   try {
//     console.log("Fetching all users");
//     const admins = await admin.find(); // Renamed variable to avoid conflict
//     res.status(200).json(admins);
//   } catch (error) {
//     console.log("Failed to fetch admin data", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



export const getAdmin = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const adminUser  = await admin.findById(req.user.id);
    if (!adminUser ) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin: adminUser  });
  } catch (error) {
    console.error("Failed to fetch admin data", error);
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
  res.clearCookie("token");
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
            `http://localhost:5173/reset-password/${resetToken}`
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


// export const adminforgotPassword = async (req, res) => { 
//   console.log('Received raw request body:', req.body);  
//   console.log('Received headers:', req.headers);

//   if (!req.is('application/json')) {
//       return res.status(400).json({ success: false, message: "Invalid Content-Type. Use application/json." });
//   }

//   const { email } = req.body;
//   console.log("Extracted email:", email);

//   if (!email) {
//       return res.status(400).json({ success: false, message: "Email is required" });
//   }

//   res.status(200).json({ success: true, message: "Received request successfully" });
// };

 

