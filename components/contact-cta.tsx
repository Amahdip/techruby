"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactCta() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

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
                Get Started
              </p>
              <h2
                id="contact-heading"
                className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Schedule your technical discovery
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Tell us about your infrastructure challenges. Our principal
                engineers will respond within one business day with a tailored
                assessment plan.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Free 60-minute architecture review",
                  "No-obligation technical roadmap",
                  "NDA available on request",
                ].map((item) => (
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
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-ruby/15 ring-1 ring-ruby/30">
                    <CheckCircle2 className="size-7 text-ruby" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    Request received
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Our team will reach out to {email} shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Work email
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className={cn(
                          "w-full rounded-lg border border-border bg-input py-2.5 pr-4 pl-10 text-sm",
                          "placeholder:text-muted-foreground/60",
                          "focus:border-ruby/40 focus:outline-none focus:ring-2 focus:ring-ruby/20",
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className={cn(
                        "w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm",
                        "placeholder:text-muted-foreground/60",
                        "focus:border-ruby/40 focus:outline-none focus:ring-2 focus:ring-ruby/20",
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Project overview
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Describe your technical challenges, timeline, and goals..."
                      className={cn(
                        "w-full resize-none rounded-lg border border-border bg-input px-4 py-2.5 text-sm",
                        "placeholder:text-muted-foreground/60",
                        "focus:border-ruby/40 focus:outline-none focus:ring-2 focus:ring-ruby/20",
                      )}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Discovery Request
                    <Send className="size-4" />
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
