import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

export type ContactFormData = {
  email: string;
  company: string;
  message: string;
};

export type ContactFormInput = ContactFormData & {
  website?: string;
};

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function parseContactInput(body: unknown): ContactFormInput | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const record = body as Record<string, unknown>;

  if (
    typeof record.email !== "string" ||
    typeof record.company !== "string" ||
    typeof record.message !== "string"
  ) {
    return null;
  }

  return {
    email: record.email.trim(),
    company: record.company.trim(),
    message: record.message.trim(),
    website: typeof record.website === "string" ? record.website.trim() : "",
  };
}

export function validateContactInput(
  input: ContactFormInput,
): { ok: true; data: ContactFormData } | { ok: false } {
  if (input.website) {
    return { ok: false };
  }

  if (
    !input.email ||
    !EMAIL_PATTERN.test(input.email) ||
    input.email.length > MAX_EMAIL_LENGTH
  ) {
    return { ok: false };
  }

  if (!input.company || input.company.length > MAX_COMPANY_LENGTH) {
    return { ok: false };
  }

  if (!input.message || input.message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false };
  }

  return {
    ok: true,
    data: {
      email: input.email,
      company: input.company,
      message: input.message,
    },
  };
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "TechRuby <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.error("Contact form misconfigured: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return false;
  }

  const resend = new Resend(apiKey);
  const safeEmail = escapeHtml(data.email);
  const safeCompany = escapeHtml(data.company);
  const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br />");

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: data.email,
    subject: `TechRuby discovery request — ${data.company}`,
    html: `
      <h2>New discovery request</h2>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Company:</strong> ${safeCompany}</p>
      <p><strong>Project overview:</strong></p>
      <p>${safeMessage}</p>
    `,
    text: [
      "New discovery request",
      "",
      `Email: ${data.email}`,
      `Company: ${data.company}`,
      "",
      "Project overview:",
      data.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return false;
  }

  return true;
}
