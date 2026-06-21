"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRightLeft,
  Box,
  Cpu,
  Database,
  Globe,
} from "lucide-react";

const pipelineNodes = [
  {
    id: "ingress",
    label: "API Gateway",
    icon: Globe,
    description: "Rate limiting, auth, routing",
  },
  {
    id: "events",
    label: "Event Bus",
    icon: ArrowRightLeft,
    description: "Async messaging, CQRS",
  },
  {
    id: "services",
    label: "Microservices",
    icon: Box,
    description: "Domain-driven boundaries",
  },
  {
    id: "compute",
    label: "Compute Layer",
    icon: Cpu,
    description: "Auto-scaling workloads",
  },
  {
    id: "data",
    label: "Data Layer",
    icon: Database,
    description: "Replicated, sharded stores",
  },
  {
    id: "observe",
    label: "Observability",
    icon: Activity,
    description: "Metrics, traces, alerts",
  },
];

const methodology = [
  "Event-Driven Architecture",
  "Zero-Downtime Deployments",
  "Chaos Engineering",
  "Continuous Delivery",
];

export function PipelineVisual() {
  return (
    <section
      id="engine"
      aria-labelledby="engine-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-ruby/3 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium uppercase tracking-widest text-ruby"
            >
              The Engine
            </motion.p>
            <motion.h2
              id="engine-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Data flows through precision-engineered pipelines
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 leading-relaxed text-muted-foreground"
            >
              Our methodology treats every system as a living pipeline — events
              propagate, services scale elastically, and deployments roll forward
              without interruption.
            </motion.p>

            <ul className="mt-8 space-y-3">
              {methodology.map((item, i) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ruby/15 text-xs font-bold text-ruby">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl themed-card bg-surface/60 p-6 backdrop-blur-xl">
            <div className="absolute inset-0 grid-bg rounded-2xl opacity-30" />

            <div className="relative space-y-3">
              {pipelineNodes.map((node, i) => {
                const Icon = node.icon;
                const isLast = i === pipelineNodes.length - 1;

                return (
                  <div key={node.id}>
                    <div className="flex items-center gap-4 rounded-xl border border-border bg-panel-muted px-4 py-3 transition-colors hover:border-ruby/30">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-ruby/10">
                        <Icon className="size-4 text-ruby" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{node.label}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {node.description}
                        </p>
                      </div>
                      <span className="size-2 shrink-0 rounded-full bg-ruby animate-pulse-ruby" />
                    </div>

                    {!isLast && (
                      <div className="flex justify-center py-1">
                        <div className="h-4 w-px bg-linear-to-b from-ruby/60 to-ruby/10" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="relative mt-4 flex items-center justify-between rounded-lg border border-ruby/20 bg-ruby/5 px-4 py-2.5">
              <span className="font-mono text-xs text-ruby">
                pipeline.status → healthy
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                throughput: 48.2k rps
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
