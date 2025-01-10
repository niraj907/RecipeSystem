import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';

export const signup = async (req, res) => {
  const { email, password, username, country, gender } = req.body;
  try {
    if (!email || !password || !username || !country || !gender) {
      console.log('All fields are required');
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists:", userAlreadyExists);
    if (userAlreadyExists) {
      console.log('User already exists');
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashedPassword,
      username,
      country,
      gender,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
    await user.save();

    // Generate JWT and set cookie
    generateTokenAndSetCookie(res, user._id);

    // Send verification email
    await sendVerificationEmail(email, verificationToken); // Fixed argument order

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    });

  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => { 
// 1 2 3 4 5 6 
const {code} = req.body;
try {
  const user = await User.findOne({
    verificationToken : code,
    verificationTokenExpiresAt: { $gt: Date.now()}
  })

  if(!user){
    return res.status(400).json({success: false, message : "Invalid or expired verification code"})
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();

  await sendWelcomeEmail(user.email, user.username);

  res.status(200).json({
    success: true,
    message : "Email verified sucessful",
    user: {
      ...user._doc,
      password: undefined,
    }
  })

} catch (error) {
  console.log("error in verifyEmail ", error);
  res.status(500).json({ success: false, message: "Server error" });
}
}

export const login = async (req, res) => { 
  const { email, password} = req.body;

  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success: false, message: "Invalid credentials"});
    }

    const isPasswordValid = await bcryptjs.compare(password , user.password);

    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "User not found."});
    }

    generateTokenAndSetCookie(res,user._id);
    
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message : "Logged in sucessfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })


  } catch (error) {
    console.error("login error:", error.message);
    res.status(400).json({ success: false, message: error.message });  
  }

}

export const logout = async (req, res) => { 
res.clearCookie("token");
res.status(200).json({success: true, message: "Logged out successfully"});
}