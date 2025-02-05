import { MailtrapClient  } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = "3c75af49ad3dfec8a568b9f385918b32";
// console.log("Mailtrap Token:", process.env.MAILTRAP);

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Samridhi",
};
