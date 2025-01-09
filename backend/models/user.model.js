import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     email:{ type:String,required : true, unique : true},
     password : {type: String, required : true},
     username : {type: String, required: true},
     country : {type: String, required : true},
     gender: { type: String, required: true, enum: ['male', 'female'] },
     lastLogin : {type: Date, default : Date.now},
     isVerified : {type: Boolean, default: false},
     resetPasswordToken : String,
     resetPasswordExpiresAt: Date,
     verificationToken: String,
     verificationTokenExpiresAt: Date
},{timeseries:true});


export const User = mongoose.model('User', userSchema);
