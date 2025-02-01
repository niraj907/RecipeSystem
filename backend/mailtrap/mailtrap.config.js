import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sender = "Recipe System <noreply@tastetrack.com>";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT), // Convert port to number
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
