"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Server,
} from "lucide-react";

import { cn } from "@/lib/utils";

const capabilities = [
  {
    title: "Backend Excellence",
    description:
      "Scalable, high-concurrency architectures, microservices, and distributed systems engineered for peak throughput.",
    icon: Server,
    className: "md:col-span-2 md:row-span-2",
    featured: true,
    tags: ["Microservices", "Event Sourcing", "CQRS"],
  },
  {
    title: "DevOps & Cloud-Native",
    description:
      "CI/CD automation, Kubernetes orchestration, and cloud-agnostic infrastructure as code.",
    icon: Cloud,
    className: "md:col-span-1",
    tags: ["Kubernetes", "Terraform", "GitOps"],
  },
  {
    title: "Frontend Engineering",
    description:
      "High-performance, pixel-perfect user interfaces and modern web applications.",
    icon: Code2,
    className: "md:col-span-1",
    tags: ["React", "Next.js", "Design Systems"],
  },
  {
    title: "Distributed Systems",
    description:
      "Fault-tolerant clusters, consensus protocols, and globally distributed data layers.",
    icon: GitBranch,
    className: "md:col-span-1",
    tags: ["Kafka", "Redis", "gRPC"],
  },
  {
    title: "Data Architecture",
    description:
      "Optimized data pipelines, real-time analytics, and schema evolution at scale.",
    icon: Database,
    className: "md:col-span-1",
    tags: ["PostgreSQL", "ClickHouse", "ETL"],
  },
  {
    title: "Platform Engineering",
    description:
      "Internal developer platforms, service meshes, and observability stacks.",
    icon: Layers,
    className: "md:col-span-2",
    tags: ["Istio", "Prometheus", "OpenTelemetry"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function BentoGrid() {
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
            className="text-sm font-medium uppercase tracking-widest text-ruby"
          >
            Core Capabilities
          </motion.p>
          <motion.h2
            id="capabilities-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Full-stack engineering,{" "}
            <span className="text-muted-foreground">zero compromise</span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-3"
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <motion.article
                key={cap.title}
                variants={itemVariants}
                className={cn(
                  "group relative overflow-hidden rounded-2xl themed-card bg-surface/60 p-6 backdrop-blur-sm transition-colors hover:border-ruby/30 hover:bg-surface/80",
                  cap.className,
                )}
              >
                {cap.featured && (
                  <div className="pointer-events-none absolute -top-20 -right-20 size-40 rounded-full bg-ruby/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />
                )}

                <div className="relative">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-ruby/10 ring-1 ring-ruby/20">
                    <Icon className="size-5 text-ruby" />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {cap.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-panel-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
