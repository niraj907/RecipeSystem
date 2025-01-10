import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  endpoint: "https://send.api.mailtrap.io/",
  token: "ee3a0251de3e83b9fc8507fe4c4741ac",
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Niraj",
};
