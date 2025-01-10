import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  endpoint: "https://send.api.mailtrap.io/",
  token: "e201c3a41f83cf7a8900e40012117a34",
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "niraj",
};


