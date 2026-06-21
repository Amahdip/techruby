"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

import { AnchorLink } from "@/components/anchor-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const codeLines = [
  { prefix: "const", content: " architecture = await audit();" },
  { prefix: "await", content: " deploy.zeroDowntime();" },
  { prefix: "return", content: " scale.infinite();", highlight: true },
];

function ArchitectureCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl themed-card bg-surface/80 p-1 backdrop-blur-xl"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative rounded-xl bg-panel p-5">
        <div className="mb-4 flex items-center gap-2 border-b border-divider pb-3">
          <Terminal className="size-4 text-ruby" />
          <span className="font-mono text-xs text-muted-foreground">
            rubytech-architecture.ts
          </span>
          <span className="ml-auto flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/80" />
            <span className="size-2.5 rounded-full bg-yellow-500/80" />
            <span className="size-2.5 rounded-full bg-green-500/80" />
          </span>
        </div>

        <div className="space-y-2 font-mono text-sm">
          {codeLines.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="select-none text-code-line">{i + 1}</span>
              <span className="text-code-keyword">{line.prefix}</span>
              <span
                className={cn(
                  line.highlight ? "text-ruby" : "text-code-text",
                )}
              >
                {line.content}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {["API Gateway", "Event Bus", "K8s Cluster"].map((node) => (
            <div
              key={node}
              className="rounded-lg border border-border bg-panel-muted px-2 py-2 text-center text-xs text-muted-foreground"
            >
              {node}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-ruby/8 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-ruby/20 bg-ruby/10 px-3 py-1 text-xs font-medium text-ruby">
                <span className="size-1.5 rounded-full bg-ruby animate-pulse-ruby" />
                Premium Engineering Services
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Engineering systems that{" "}
              <span className="text-gradient-ruby">scale without limits</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              RubyTech delivers end-to-end technical implementations — from
              distributed backends and cloud-native DevOps to pixel-perfect
              frontends. We architect, build, and scale mission-critical systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button size="lg" asChild>
                <AnchorLink href="#contact">
                  Schedule Technical Discovery
                  <ArrowRight className="size-4" />
                </AnchorLink>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <AnchorLink href="#capabilities">Explore Capabilities</AnchorLink>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground"
            >
              <div>
                <span className="block text-2xl font-bold tracking-tight text-foreground">
                  99.99%
                </span>
                Uptime SLA
              </div>
              <div>
                <span className="block text-2xl font-bold tracking-tight text-foreground">
                  &lt;100ms
                </span>
                P99 Latency
              </div>
              <div>
                <span className="block text-2xl font-bold tracking-tight text-foreground">
                  24/7
                </span>
                Managed Ops
              </div>
            </motion.div>
          </div>

          <ArchitectureCard />
        </div>
      </div>
    </section>
  );
}
