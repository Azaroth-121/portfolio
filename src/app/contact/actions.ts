"use server";

import { siteConfig } from "@/config/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const honeypot = formData.get("company_website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    // Bot filled the hidden field — pretend success, don't tip it off.
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Name, email, and message are required." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "That email address doesn't look valid." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // TODO(Kurt): set RESEND_API_KEY and a verified sending domain
    // (RESEND_FROM_EMAIL) in Vercel to enable delivery. Until then,
    // submissions are not sent anywhere — this message tells the visitor
    // to use the plain-text email address on the page instead.
    return {
      status: "error",
      message:
        "Email delivery isn't configured yet — please email me directly instead.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "portfolio@resend.dev",
      to: siteConfig.email,
      reply_to: email,
      subject: `New project inquiry from ${name}`,
      text: `From: ${name} <${email}>\nProject type: ${projectType}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return {
      status: "error",
      message: "Something went wrong sending that — please email me directly instead.",
    };
  }

  return { status: "success" };
}
