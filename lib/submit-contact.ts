import type { ContactFormData } from "@/lib/contact";

export type ContactProvider = "resend" | "formsubmit" | "resend-proxy";

export type ContactConfig = {
  provider: ContactProvider;
  toEmail: string | null;
  proxyUrl: string | null;
};

export async function fetchContactConfig(): Promise<ContactConfig> {
  const response = await fetch("/api/contact/config");

  if (!response.ok) {
    return { provider: "resend", toEmail: null, proxyUrl: null };
  }

  return response.json();
}

export async function submitViaResendProxy(
  proxyUrl: string,
  data: ContactFormData,
  website: string,
): Promise<boolean> {
  const response = await fetch(proxyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      website,
    }),
  });

  return response.ok;
}

export async function submitViaFormSubmit(
  toEmail: string,
  data: ContactFormData,
): Promise<boolean> {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `TechRuby discovery request — ${data.company}`,
        _template: "table",
        _captcha: "false",
        email: data.email,
        company: data.company,
        message: data.message,
      }),
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: string | boolean };

  return String(result.success) === "true";
}

export async function submitViaResendApi(
  data: ContactFormData,
  website: string,
): Promise<Response> {
  return fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      website,
    }),
  });
}

export async function submitContactForm(
  data: ContactFormData,
  website: string,
): Promise<boolean> {
  const config = await fetchContactConfig();

  if (config.provider === "resend-proxy" && config.proxyUrl) {
    return submitViaResendProxy(config.proxyUrl, data, website);
  }

  if (config.provider === "formsubmit" && config.toEmail) {
    return submitViaFormSubmit(config.toEmail, data);
  }

  const response = await submitViaResendApi(data, website);

  if (response.ok) {
    return true;
  }

  if (response.status === 503) {
    const payload = (await response.json()) as {
      fallback?: string;
      toEmail?: string | null;
    };

    if (payload.fallback === "formsubmit" && payload.toEmail) {
      return submitViaFormSubmit(payload.toEmail, data);
    }
  }

  return false;
}
