import { NextResponse } from "next/server";

import {
  parseContactInput,
  sendContactEmail,
  validateContactInput,
} from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const input = parseContactInput(body);

  if (!input) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const validation = validateContactInput(input);

  if (!validation.ok) {
    if (input.website) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const sent = await sendContactEmail(validation.data);

  if (!sent) {
    return NextResponse.json(
      {
        error: "send_failed",
        fallback: "formsubmit",
        toEmail: process.env.CONTACT_TO_EMAIL ?? null,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
