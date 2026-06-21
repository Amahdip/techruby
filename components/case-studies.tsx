"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const caseStudies = [
  {
    client: "FinTech Platform",
    metric: "99.99%",
    label: "Uptime Achieved",
    description:
      "Re-architected a legacy monolith into event-driven microservices, eliminating single points of failure across three availability zones.",
    stats: [
      { value: "12M+", label: "Daily transactions" },
      { value: "45ms", label: "Avg response" },
      { value: "0", label: "Downtime incidents" },
    ],
  },
  {
    client: "E-Commerce Giant",
    metric: "Sub-100ms",
    label: "P99 Latency",
    description:
      "Built a globally distributed caching layer and CDN strategy that slashed page load times during peak traffic events.",
    stats: [
      { value: "3x", label: "Conversion lift" },
      { value: "200K", label: "Concurrent users" },
      { value: "40%", label: "Cost reduction" },
    ],
  },
  {
    client: "HealthTech SaaS",
    metric: "SOC 2",
    label: "Compliance Ready",
    description:
      "Implemented zero-trust infrastructure with end-to-end encryption, audit logging, and automated compliance pipelines.",
    stats: [
      { value: "100%", label: "Audit pass rate" },
      { value: "HIPAA", label: "Certified" },
      { value: "24/7", label: "Monitoring" },
    ],
  },
];

export function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? caseStudies.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === caseStudies.length - 1 ? 0 : prev + 1,
    );
  };

  const active = caseStudies[activeIndex];

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium uppercase tracking-widest text-ruby"
            >
              Proof of Delivery
            </motion.p>
            <motion.h2
              id="case-studies-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Results that speak in metrics
            </motion.h2>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              aria-label="Previous case study"
              onClick={handlePrevious}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Next case study"
              onClick={handleNext}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl themed-card bg-surface/60 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2"
            >
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="size-4 text-ruby" />
                  {active.client}
                </div>
                <p className="mt-4 text-5xl font-bold tracking-tight text-ruby sm:text-6xl">
                  {active.metric}
                </p>
                <p className="mt-1 text-lg font-medium">{active.label}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {active.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 self-center">
                {active.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-panel-muted p-4 text-center"
                  >
                    <p className="text-xl font-bold tracking-tight sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="flex justify-center gap-2 border-t border-divider py-4">
            {caseStudies.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to case study ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "w-8 bg-ruby"
                    : "w-1.5 bg-[var(--dot-inactive)] hover:opacity-70",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
