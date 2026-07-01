import { NextResponse } from "next/server";

import type { ContactProvider } from "@/lib/submit-contact";

export async function GET() {
  const provider = (process.env.CONTACT_PROVIDER ?? "resend") as ContactProvider;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? null;
  const proxyUrl = process.env.RESEND_PROXY_URL ?? null;

  return NextResponse.json({ provider, toEmail, proxyUrl });
}
