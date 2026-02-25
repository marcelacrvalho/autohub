export type Stage = "lead" | "qualified" | "proposal" | "won";

export interface Lead {
  id: string;
  name: string;
  company: string;
  score: number;
  stage: Stage;
  ltv: string;
  source: string;
  lastContact: string;
}

export interface TrackingEvent {
  id: string;
  ts: string;
  event: string;
  source: string;
  value: string;
}

export interface ApiLogEntry {
  id: string;
  ts: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  status: string;
  ms: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot" | "thinking";
  content: string;
}

export interface Integration {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "idle";
  detail: string;
}

export interface WorkflowNode {
  id: string;
  icon: string;
  label: string;
  type: "trigger" | "condition" | "action";
}

export interface Metric {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}
