"use server";

import { sendMail } from "@/utils/mail.util";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function sendContactMessage(values: z.infer<typeof contactSchema>) {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Invalid form data." };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    return { error: "Admin email is not configured." };
  }

  const { name, email, subject, message } = parsed.data;

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  const result = await sendMail({
    to: adminEmail,
    subject: `Contact Us: ${subject}`,
    html,
  });

  if (result.error) {
    return { error: result.error };
  }

  return { success: "Message sent successfully." };
}


