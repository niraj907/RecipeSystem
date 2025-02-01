import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

// import { sendMailder } from "../mailtrap/mailtrap.config.js"

import { sendMail, sender } from "../mailtrap/mailtrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
  console.log("Email argument:", email);
  console.log("Verification Token:", verificationToken);
  
  try {
      const response = await sendMail(
          email,  // ✅ Use email directly as recipient
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


// export const sendWelcomeEmail = async (email , username) => {
// const recipient= [{email}];
// try {
  
//  const response =  await sendMail({
//     from: sender,
//     to: recipient,
//     template_uuid: "fc9dcaa0-b6a9-429f-9df2-083bd8d8272d",
//     template_variables: {
//       company_info_name: "Recipe System",
//       username: username,
//     },
//   });
//   console.log('Welcome email sent sucessfully',response);
// } catch (error) {
//   console.error(`Error sending welcome email`, error);
//   throw new Error(`Error sending welcome email: ${error}`);
// }
// };  


export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await sendMail(
      email,  // ✅ Use email directly
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
      email,  // ✅ Use email directly
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






// import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
// import { sendMail, sender } from "../mailtrap/mailtrap.config.js";

// export const sendVerificationEmail = async (email, verificationToken) => {
//   try {
//     const response = await sendMail(
//       email,
//       "Verify your email",
//       "",
//       VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
//     );
//     console.log("Verification email sent successfully:", response);
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     throw new Error(`Error sending verification email: ${error.message}`);
//   }
// };

// export const sendPasswordResetEmail = async (email, resetURL) => {
//   try {
//     const response = await sendMail(
//       email,
//       "Reset your password",
//       "",
//       PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
//     );
//     console.log("Password reset email sent successfully:", response);
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw new Error(`Error sending password reset email: ${error.message}`);
//   }
// };

// export const sendResetSuccessEmail = async (email) => {
//   try {
//     const response = await sendMail(email, "Your password has been reset", "", PASSWORD_RESET_SUCCESS_TEMPLATE);
//     console.log("Password reset success email sent successfully:", response);
//   } catch (error) {
//     console.error("Error sending password reset success email:", error);
//     throw new Error(`Error sending password reset success email: ${error.message}`);
//   }
// };
