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
    template_uuid: "797d1d98-6693-48e5-9faa-ee306b0ecb89",
    template_variables: {
      "company_info_name": "Auth Company",
      "company_info_address": "Kupondole, Lalitpur",
      "company_info_city": "Kathmandu",
      "company_info_zip_code": "12345",
      "company_info_country": "Nepali"
    }
  })
  console.log('Welcome email sent sucessfully',response);
} catch (error) {
  console.error('Error sending welcome email',error);

  throw new Error(`Error sending welcome email: ${error}`);
}
};  