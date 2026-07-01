import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const ALLOWED_ORIGINS = new Set([
  "https://techruby.ir",
  "http://localhost:3000",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const body = req.body as {
    email?: string;
    company?: string;
    message?: string;
    website?: string;
  };

  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (
    !email ||
    !EMAIL_PATTERN.test(email) ||
    !company ||
    !message ||
    company.length > 200 ||
    message.length > 5000
  ) {
    return res.status(400).json({ error: "invalid_fields" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "TechRuby <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return res.status(503).json({ error: "misconfigured" });
  }

  const resend = new Resend(apiKey);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `TechRuby discovery request — ${company}`,
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
      `Email: ${email}`,
      `Company: ${company}`,
      "",
      "Project overview:",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(503).json({ error: "send_failed" });
  }

  return res.status(200).json({ ok: true });
}
