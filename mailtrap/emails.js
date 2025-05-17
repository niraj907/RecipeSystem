import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE , PASSWORD_UPDATE_SUCCESS_TEMPLATE } from "./emailTemplates.js"

import { sendMail, sender } from "../mailtrap/mailtrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
  console.log("Email argument:", email);
  console.log("Verification Token:", verificationToken);
  
  try {
      const response = await sendMail(
          email,  
          "Verify your email",
          "",
          VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
      );
      console.log("Email sent successfully", response);
  } catch (error) {
      console.error(`Error sending verification`, error);
      throw new Error(`Error sending verification email: ${error.message}`);
  }
};


export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await sendMail(
      email,  
      "Reset your password",
      "",
      PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
    );
    console.log('Password Reset Email sent successfully', response);
  } catch (error) {
    console.error('Error sending password reset email', error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};




export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await sendMail(
      email,  
      "Your password has been reset",
      "",
      PASSWORD_RESET_SUCCESS_TEMPLATE
    );
    console.log('Password reset success email sent successfully', response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
    throw new Error(`Error sending password reset success email: ${error.message}`);
  }
};





export const sendUpdatePasswordSuccessEmail = async (email) => {
  try {
    const response = await sendMail(
      email, 
      "Your password has been update",
      "",
      PASSWORD_UPDATE_SUCCESS_TEMPLATE
    );
    console.log('Password update success email sent successfully', response);
  } catch (error) {
    console.error(`Error sending password update success email`, error);
    throw new Error(`Error sending password update success email: ${error.message}`);
  }
};




