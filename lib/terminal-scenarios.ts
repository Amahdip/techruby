export type NodeId = "gateway" | "eventBus" | "k8s";

export type ScenarioStep =
  | { action: "command"; text: string }
  | {
      action: "line";
      text: string;
      variant: "muted" | "success";
      delay?: number;
    }
  | { action: "progress"; label: string; node: NodeId }
  | {
      action: "node";
      id: NodeId;
      status: "idle" | "running" | "done";
      delay?: number;
    };

export type TerminalScenario = {
  filename: string;
  steps: ScenarioStep[];
};

export const TERMINAL_NODE_LABELS: Record<NodeId, string> = {
  gateway: "API Gateway",
  eventBus: "Event Bus",
  k8s: "K8s Cluster",
};

/** Always English — terminal output is not localized. */
export const TERMINAL_SCENARIOS: TerminalScenario[] = [
  {
    filename: "techruby-deploy.log",
    steps: [
      { action: "command", text: "$ techruby audit --production" },
      { action: "line", text: "scanning 47 microservices...", variant: "muted", delay: 500 },
      { action: "line", text: "validating event schemas...", variant: "muted", delay: 450 },
      { action: "line", text: "audit passed — all systems nominal", variant: "success", delay: 700 },
      { action: "command", text: "$ deploy pipeline --zero-downtime" },
      { action: "progress", label: "rolling update api-gateway", node: "gateway" },
      { action: "line", text: "kafka consumer lag: 0ms", variant: "muted", delay: 400 },
      { action: "node", id: "eventBus", status: "running", delay: 300 },
      { action: "node", id: "eventBus", status: "done" },
      { action: "line", text: "zero-downtime deploy complete", variant: "success", delay: 600 },
      { action: "command", text: "$ kubectl scale deployment/api --replicas=12" },
      { action: "node", id: "k8s", status: "running" },
      { action: "line", text: "scaling workloads across 3 zones...", variant: "muted", delay: 650 },
      { action: "node", id: "k8s", status: "done" },
      { action: "line", text: "cluster healthy — 12 replicas online", variant: "success", delay: 0 },
    ],
  },
  {
    filename: "terraform-apply.log",
    steps: [
      { action: "command", text: "$ terraform plan -out=prod.tfplan" },
      { action: "line", text: "parsing 6 modules, 38 resources...", variant: "muted", delay: 550 },
      { action: "line", text: "plan: 14 to add, 0 to change, 0 to destroy", variant: "muted", delay: 500 },
      { action: "command", text: "$ terraform apply -auto-approve prod.tfplan" },
      { action: "progress", label: "provisioning VPC + subnets", node: "gateway" },
      { action: "line", text: "eks cluster endpoint: ready", variant: "muted", delay: 400 },
      { action: "node", id: "k8s", status: "running", delay: 350 },
      { action: "node", id: "k8s", status: "done" },
      { action: "line", text: "msk kafka cluster: active", variant: "muted", delay: 450 },
      { action: "node", id: "eventBus", status: "running", delay: 300 },
      { action: "node", id: "eventBus", status: "done" },
      { action: "line", text: "infrastructure synchronized — apply complete", variant: "success", delay: 0 },
    ],
  },
  {
    filename: "incident-response.log",
    steps: [
      { action: "command", text: "$ kubectl get pods -n production" },
      { action: "line", text: "api-7f2k9: CrashLoopBackOff (2/12 pods)", variant: "muted", delay: 600 },
      { action: "line", text: "p99 latency spike: 840ms → alerting", variant: "muted", delay: 500 },
      { action: "command", text: "$ techruby heal --auto --namespace production" },
      { action: "node", id: "gateway", status: "running" },
      { action: "line", text: "draining unhealthy endpoints...", variant: "muted", delay: 500 },
      { action: "progress", label: "rolling restart api replicas", node: "gateway" },
      { action: "line", text: "event bus backpressure: cleared", variant: "muted", delay: 400 },
      { action: "node", id: "eventBus", status: "running", delay: 300 },
      { action: "node", id: "eventBus", status: "done" },
      { action: "node", id: "k8s", status: "running", delay: 350 },
      { action: "line", text: "12/12 pods ready — p99: 68ms", variant: "muted", delay: 500 },
      { action: "node", id: "k8s", status: "done" },
      { action: "line", text: "incident resolved in 47s", variant: "success", delay: 0 },
    ],
  },
  {
    filename: "db-migration.log",
    steps: [
      { action: "command", text: "$ techruby migrate --env production --safe" },
      { action: "line", text: "acquiring advisory lock on ledger_db...", variant: "muted", delay: 500 },
      { action: "line", text: "pending: 003_ledger_indexes.sql", variant: "muted", delay: 450 },
      { action: "progress", label: "creating concurrent indexes", node: "eventBus" },
      { action: "line", text: "replication lag: 0.3s — within threshold", variant: "muted", delay: 450 },
      { action: "command", text: "$ psql -c 'SELECT verify_ledger_balance();'" },
      { action: "line", text: "double-entry constraint: verified", variant: "muted", delay: 500 },
      { action: "node", id: "gateway", status: "running", delay: 300 },
      { action: "line", text: "connection pool warmed — 200 conns", variant: "muted", delay: 400 },
      { action: "node", id: "gateway", status: "done" },
      { action: "node", id: "k8s", status: "running", delay: 350 },
      { action: "node", id: "k8s", status: "done" },
      { action: "line", text: "migration complete — zero downtime", variant: "success", delay: 0 },
    ],
  },
  {
    filename: "observability.log",
    steps: [
      { action: "command", text: "$ helm upgrade otel-collector ./charts --namespace monitoring" },
      { action: "line", text: "pulling chart v2.4.1...", variant: "muted", delay: 450 },
      { action: "progress", label: "deploying collectors to 12 nodes", node: "k8s" },
      { action: "line", text: "scraping 847 metric endpoints", variant: "muted", delay: 500 },
      { action: "command", text: "$ techruby trace --sample-rate 0.1" },
      { action: "node", id: "gateway", status: "running", delay: 400 },
      { action: "line", text: "trace pipeline: 12.4k spans/s ingested", variant: "muted", delay: 500 },
      { action: "node", id: "gateway", status: "done" },
      { action: "node", id: "eventBus", status: "running", delay: 350 },
      { action: "line", text: "log aggregation: 2.1M events/min", variant: "muted", delay: 450 },
      { action: "node", id: "eventBus", status: "done" },
      { action: "line", text: "dashboards live — SLO burn rate: normal", variant: "success", delay: 0 },
    ],
  },
];
