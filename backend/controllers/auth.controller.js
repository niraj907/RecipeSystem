import {User} from '../models/user.model.js'
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => { 
const {email,password , username,country,gender} = req.body;    
try {
  if(!email || !password || !username || !country || !gender){
    console.log('All fields are required');
    return res.status(400).json({ success: false, msg: "All fields are required" });
    // throw new Error("All fields are required");
  }  
  const userAlreadyExists = await User.findOne({email});
  console.log("userAlreadyExists:",userAlreadyExists);
  if(userAlreadyExists){
    return res.status(400).json({success:false, message : "User already exists"});
  }

  const hashedPassword = await bcryptjs.hash(password,10);
  const verificationToken =  Math.floor(100000+ Math.random()* 900000).toString();

  const user = new User({
    email,
    password:hashedPassword,
    username,
    country,
    gender,
    verificationToken,
    verificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  })
  await user.save();

// jwt
generateTokenAndSetCookie(res,user._id)

res.status(201).json({
    success: true,
    message: "User created sucessfully",
    user : {
        ...user._doc,
        password : undefined,
    }
})

} catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" }); 
}

}
export const login = async (req, res) => { 
res.send("login route");
}
export const logout = async (req, res) => { 
res.send("logout route");
}


