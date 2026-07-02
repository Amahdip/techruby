"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Server,
  ExternalLink,
} from "lucide-react";

import { useTranslation } from "@/hooks/use-translation";
import { SpotlightCard } from "@/components/spotlight-card";
import { springSoft, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function BentoGrid() {
  const { t } = useTranslation();

  // NOTE: `key` is a STABLE, locale-independent id. Keying the cards by their
  // translated title instead caused them to remount on every language switch —
  // and because the reveal animation below uses viewport={{ once: true }}, the
  // freshly-mounted cards stayed stuck at initial="hidden" (opacity 0), i.e. the
  // whole grid went blank after toggling language. Stable keys let the same
  // elements persist and simply swap their text.
  const capabilities = [
    {
      key: "backend",
      title: t("capabilities.items.backend.title"),
      description: t("capabilities.items.backend.description"),
      icon: Server,
      className: "md:col-span-2 md:row-span-2",
      featured: true,
      tags: ["Microservices", "Event Sourcing", "CQRS"],
    },
    {
      key: "devops",
      title: t("capabilities.items.devops.title"),
      description: t("capabilities.items.devops.description"),
      icon: Cloud,
      className: "md:col-span-1",
      tags: ["Kubernetes", "Terraform", "GitOps"],
    },
    {
      key: "frontend",
      title: t("capabilities.items.frontend.title"),
      description: t("capabilities.items.frontend.description"),
      icon: Code2,
      className: "md:col-span-1",
      tags: ["React", "Next.js", "Design Systems"],
    },
    {
      key: "distributed",
      title: t("capabilities.items.distributed.title"),
      description: t("capabilities.items.distributed.description"),
      icon: GitBranch,
      className: "md:col-span-1",
      tags: ["Kafka", "Redis", "gRPC"],
    },
    {
      key: "data",
      title: t("capabilities.items.data.title"),
      description: t("capabilities.items.data.description"),
      icon: Database,
      className: "md:col-span-1",
      tags: ["PostgreSQL", "ClickHouse", "ETL"],
    },
    {
      key: "talent",
      title: t("capabilities.items.talent.title"),
      description: t("capabilities.items.talent.description"),
      icon: Layers,
      className: "md:col-span-2",
      tags: ["SalamRuby", "Mentorship", "Junior Devs"],
    },
  ];

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springSoft}
            className="text-sm font-medium uppercase tracking-widest text-ruby"
          >
            {t("capabilities.badge")}
          </motion.p>
          <motion.h2
            id="capabilities-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springSoft, delay: 0.05 }}
            className="mt-3 type-section-title text-3xl sm:text-4xl"
          >
            <span className="block">{t("capabilities.title_part1").trim()}</span>
            <span className="block text-muted-foreground">
              {t("capabilities.title_muted")}
            </span>
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-3"
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <SpotlightCard
                key={cap.key}
                featured={cap.featured}
                className={cn(cap.className)}
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-ruby/10 ring-1 ring-ruby/20">
                  <Icon className="size-5 text-ruby" />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cap.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {cap.tags.map((tag) => {
                    if (tag === "SalamRuby") {
                      return (
                        <a
                          key={tag}
                          href="https://salamruby.ir"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-mono text-xs text-amber-500 hover:bg-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all duration-300 flex items-center gap-1"
                        >
                          {tag}
                          <ExternalLink className="size-3" />
                        </a>
                      );
                    }
                    return (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-panel-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </SpotlightCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
