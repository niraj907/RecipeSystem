import mongoose from "mongoose";
import { type } from "os";

const adminSchema = new mongoose.Schema({
     name : {type: String} ,//option
     email:{ type:String,required : true, unique : true},
     password : {type: String, required : true},
     username : {type: String}, // Option
     country : {type: String}, // Option
     phonenumber:{type: String},  // Option
     images: [ // option
          {
            public_id: { type: String},
            url: { type: String},
          },
        ],
     lastLogin : {type: Date, default : Date.now},
     resetPasswordToken : String,
     resetPasswordExpiresAt: Date,
     verificationToken: String,
     verificationTokenExpiresAt: Date
    },{timestamps:true});



export const admin = mongoose.model('admin', adminSchema);
