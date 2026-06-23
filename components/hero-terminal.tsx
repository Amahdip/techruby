"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Terminal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { springSoft } from "@/lib/motion";
import {
  TERMINAL_NODE_LABELS,
  TERMINAL_SCENARIOS,
  type NodeId,
  type TerminalScenario,
} from "@/lib/terminal-scenarios";
import { cn } from "@/lib/utils";

type NodeStatus = "idle" | "running" | "done";
type LineVariant = "command" | "muted" | "success";

type TerminalLine = {
  id: string;
  text: string;
  variant: LineVariant;
  typing?: boolean;
};

const NODE_IDS: NodeId[] = ["gateway", "eventBus", "k8s"];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function BlinkingCursor() {
  return (
    <span
      className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-ruby align-middle"
      aria-hidden
    />
  );
}

function ProgressBar({ label, progress }: { label: string; progress: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono tabular-nums">{progress}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-panel-muted">
        <motion.div
          className="h-full rounded-full bg-ruby"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.15, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function InfrastructureNode({
  label,
  status,
}: {
  label: string;
  status: NodeStatus;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border px-2 py-2 text-center text-xs transition-colors duration-500",
        status === "idle" && "border-border bg-panel-muted text-muted-foreground",
        status === "running" &&
          "border-ruby/40 bg-ruby/5 text-foreground shadow-[0_0_20px_rgba(225,29,72,0.12)]",
        status === "done" &&
          "border-emerald-500/30 bg-emerald-500/5 text-foreground",
      )}
    >
      {status === "running" && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-ruby/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      )}
      <div className="relative flex items-center justify-center gap-1.5">
        {status === "running" && (
          <Loader2 className="size-3 shrink-0 animate-spin text-ruby" />
        )}
        {status === "done" && (
          <Check className="size-3 shrink-0 text-emerald-500" />
        )}
        <span className="truncate">{label}</span>
      </div>
    </div>
  );
}

export function HeroTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [filename, setFilename] = useState("techruby-deploy.log");
  const [nodeStatus, setNodeStatus] = useState<Record<NodeId, NodeStatus>>({
    gateway: "idle",
    eventBus: "idle",
    k8s: "idle",
  });
  const [progress, setProgress] = useState<{ label: string; value: number } | null>(
    null,
  );
  const runIdRef = useRef(0);
  const scenarioIndexRef = useRef(0);

  const setNode = useCallback((id: NodeId, status: NodeStatus) => {
    setNodeStatus((prev) => ({ ...prev, [id]: status }));
  }, []);

  const resetNodes = useCallback(() => {
    setNodeStatus({ gateway: "idle", eventBus: "idle", k8s: "idle" });
  }, []);

  const appendLine = useCallback(
    (text: string, variant: LineVariant, typing = false) => {
      const id = `${Date.now()}-${Math.random()}`;
      setLines((prev) => {
        const next = [...prev, { id, text, variant, typing }];
        return next.slice(-7);
      });
      return id;
    },
    [],
  );

  const updateLine = useCallback((id: string, text: string, typing?: boolean) => {
    setLines((prev) =>
      prev.map((line) =>
        line.id === id ? { ...line, text, typing: typing ?? line.typing } : line,
      ),
    );
  }, []);

  const typeCommand = useCallback(
    async (command: string, runId: number) => {
      const lineId = appendLine("", "command", true);

      for (let i = 1; i <= command.length; i++) {
        if (runIdRef.current !== runId) return;
        updateLine(lineId, command.slice(0, i), true);
        await sleep(22 + Math.random() * 18);
      }

      updateLine(lineId, command, false);
      await sleep(350);
    },
    [appendLine, updateLine],
  );

  const runProgress = useCallback(
    async (label: string, node: NodeId, runId: number) => {
      setNode(node, "running");
      setProgress({ label, value: 0 });

      for (let p = 0; p <= 100; p += 4) {
        if (runIdRef.current !== runId) return;
        setProgress({ label, value: p });
        await sleep(42 + Math.random() * 12);
      }

      setProgress(null);
      setNode(node, "done");
    },
    [setNode],
  );

  const runScenario = useCallback(
    async (scenario: TerminalScenario, runId: number) => {
      setFilename(scenario.filename);

      for (const step of scenario.steps) {
        if (runIdRef.current !== runId) return;

        switch (step.action) {
          case "command":
            await typeCommand(step.text.replace(/^\$\s*/, ""), runId);
            break;
          case "line":
            appendLine(step.text, step.variant);
            if (step.delay) await sleep(step.delay);
            break;
          case "progress":
            await runProgress(step.label, step.node, runId);
            break;
          case "node":
            setNode(step.id, step.status);
            if (step.delay) await sleep(step.delay);
            break;
        }
      }
    },
    [appendLine, runProgress, setNode, typeCommand],
  );

  useEffect(() => {
    const runId = ++runIdRef.current;
    let cancelled = false;

    const isActive = () => !cancelled && runIdRef.current === runId;

    async function runLoop() {
      while (isActive()) {
        const scenario =
          TERMINAL_SCENARIOS[scenarioIndexRef.current % TERMINAL_SCENARIOS.length];
        scenarioIndexRef.current += 1;

        setLines([]);
        setProgress(null);
        resetNodes();
        await sleep(500);

        await runScenario(scenario, runId);
        if (!isActive()) return;

        await sleep(2400);
      }
    }

    runLoop();

    return () => {
      cancelled = true;
    };
  }, [resetNodes, runScenario]);

  return (
    <motion.div
      dir="ltr"
      lang="en"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springSoft, delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl themed-card bg-surface/80 p-1 backdrop-blur-xl"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative rounded-xl bg-panel p-5">
        <div className="mb-4 flex items-center justify-between gap-2 border-b border-divider pb-3">
          <div className="flex min-w-0 items-center gap-2">
            <Terminal className="size-4 shrink-0 text-ruby" />
            <AnimatePresence mode="wait">
              <motion.span
                key={filename}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="truncate font-mono text-xs text-muted-foreground"
              >
                {filename}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                live
              </span>
            </span>
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-red-500/80" />
              <span className="size-2.5 rounded-full bg-yellow-500/80" />
              <span className="size-2.5 rounded-full bg-green-500/80" />
            </span>
          </div>
        </div>

        <div
          className="min-h-[168px] space-y-1.5 text-left font-mono text-[13px] leading-relaxed"
          aria-live="polite"
          aria-label="Deployment terminal output"
        >
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex items-start gap-2 text-left",
                line.variant === "command" && "text-foreground",
                line.variant === "muted" && "text-muted-foreground",
                line.variant === "success" && "text-emerald-500",
              )}
            >
              <span className="w-3 shrink-0 select-none text-code-line opacity-40">
                {line.variant === "command" ? "$" : "›"}
              </span>
              <span className="min-w-0 flex-1 break-all text-left">
                {line.variant === "command"
                  ? line.text.replace(/^\$\s*/, "")
                  : line.text}
                {line.typing && <BlinkingCursor />}
              </span>
            </motion.div>
          ))}

          {progress && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-1 pl-5 text-left"
            >
              <ProgressBar label={progress.label} progress={progress.value} />
            </motion.div>
          )}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {NODE_IDS.map((id) => (
            <InfrastructureNode
              key={id}
              label={TERMINAL_NODE_LABELS[id]}
              status={nodeStatus[id]}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
