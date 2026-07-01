"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";

import { useTranslation } from "@/hooks/use-translation";
import { submitContactForm } from "@/lib/submit-contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactCta() {
  const { t } = useTranslation();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");

    const formData = new FormData(event.currentTarget);
    const website = formData.get("website");

    try {
      const sent = await submitContactForm(
        { email, company, message },
        typeof website === "string" ? website : "",
      );

      if (!sent) {
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const highlights = t("contact.highlights") as string[];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ruby/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl themed-card bg-surface/80 backdrop-blur-xl"
        >
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-divider p-8 sm:p-10 lg:border-r lg:border-b-0">
              <p className="text-sm font-medium uppercase tracking-widest text-ruby">
                {t("contact.badge")}
              </p>
              <h2
                id="contact-heading"
                className="mt-3 type-section-title text-3xl sm:text-4xl"
              >
                {t("contact.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {t("contact.description")}
              </p>

              <ul className="mt-8 space-y-3">
                {Array.isArray(highlights) && highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-ruby" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 sm:p-10">
              {submitState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-ruby/15 ring-1 ring-ruby/30">
                    <CheckCircle2 className="size-7 text-ruby" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    {t("contact.form.success_title")}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("contact.form.success_desc", { email })}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div
                    className="absolute left-[-9999px] h-px w-px overflow-hidden"
                    aria-hidden="true"
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {t("contact.form.email_label")}
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3 rtl:left-auto rtl:right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("contact.form.email_placeholder")}
                        disabled={submitState === "submitting"}
                        className={cn(
                          "w-full rounded-lg border border-border bg-input py-2.5 pr-4 pl-10 rtl:pr-10 rtl:pl-4 text-sm",
                          "placeholder:text-muted-foreground/60",
                          "focus:border-ruby/40 focus:outline-none focus:ring-2 focus:ring-ruby/20",
                          "disabled:cursor-not-allowed disabled:opacity-60",
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {t("contact.form.company_label")}
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t("contact.form.company_placeholder")}
                      disabled={submitState === "submitting"}
                      className={cn(
                        "w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm",
                        "placeholder:text-muted-foreground/60",
                        "focus:border-ruby/40 focus:outline-none focus:ring-2 focus:ring-ruby/20",
                        "disabled:cursor-not-allowed disabled:opacity-60",
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {t("contact.form.project_label")}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("contact.form.project_placeholder")}
                      disabled={submitState === "submitting"}
                      className={cn(
                        "w-full resize-none rounded-lg border border-border bg-input px-4 py-2.5 text-sm",
                        "placeholder:text-muted-foreground/60",
                        "focus:border-ruby/40 focus:outline-none focus:ring-2 focus:ring-ruby/20",
                        "disabled:cursor-not-allowed disabled:opacity-60",
                      )}
                    />
                  </div>

                  {submitState === "error" && (
                    <p
                      role="alert"
                      className="rounded-lg border border-ruby/30 bg-ruby/10 px-4 py-3 text-sm text-ruby"
                    >
                      {t("contact.form.error_message")}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={submitState === "submitting"}
                  >
                    {submitState === "submitting" ? (
                      <>
                        {t("contact.form.submitting_btn")}
                        <Loader2 className="size-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        {t("contact.form.submit_btn")}
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
