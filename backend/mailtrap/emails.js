import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

import { mailtrapClient, sender } from "../mailtrap/mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    console.log("Email argument:", email);
    console.log("Verification Token:", verificationToken);
    const recipient = [{ email }]; // Corrected email assignment
  
    try {
      const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        category: "Email Verification",
      });
      console.log("Email sent successfully", response);
    } catch (error) {
      console.log(`Error sending verification`, error);
      throw new Error(`Error sending verification email: ${error.message}`);
    }
  };
  

export const sendWelcomeEmail = async (email , username) => {
const recipient= [{email}];
try {
  
 const response =  await mailtrapClient.send({
    from: sender,
    to: recipient,
    template_uuid: "fc9dcaa0-b6a9-429f-9df2-083bd8d8272d",
    template_variables: {
      company_info_name: "Recipe System",
      username: username,
    },
  });
  console.log('Welcome email sent sucessfully',response);
} catch (error) {
  console.error(`Error sending welcome email`, error);
  throw new Error(`Error sending welcome email: ${error}`);
}
};  