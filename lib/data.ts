import type {
  Lead,
  Integration,
  WorkflowNode,
  Metric,
  TrackingEvent,
  ApiLogEntry,
} from "./types";

export const INITIAL_LEADS: Lead[] = [
  { id: "1", name: "Carlos Lima", company: "Tech Solutions", score: 87, stage: "proposal", ltv: "R$8.4k", source: "WhatsApp Agent", lastContact: "há 2min" },
  { id: "2", name: "Ana Ferreira", company: "Varejo Digital", score: 72, stage: "qualified", ltv: "R$5.1k", source: "Google Ads", lastContact: "há 15min" },
  { id: "3", name: "Pedro Souza", company: "Agência XYZ", score: 55, stage: "lead", ltv: "R$2.8k", source: "Meta Ads", lastContact: "há 1h" },
  { id: "4", name: "Maria Costa", company: "E-commerce BR", score: 94, stage: "won", ltv: "R$14.2k", source: "SDR Agent", lastContact: "ontem" },
  { id: "5", name: "Lucas Mendes", company: "SaaS Labs", score: 61, stage: "qualified", ltv: "R$6.7k", source: "Indicação", lastContact: "há 3h" },
];

export const INTEGRATIONS: Integration[] = [
  { id: "hubspot", name: "HubSpot", logo: "hubspot", status: "connected", detail: "Conectado · API v3" },
  { id: "salesforce", name: "Salesforce", logo: "salesforce", status: "idle", detail: "Disponível" },
  { id: "meta", name: "Meta Ads API", logo: "meta", status: "connected", detail: "Conectado · Pixel ativo" },
  { id: "ga4", name: "Google Ads + GA4", logo: "ga4", status: "connected", detail: "Conectado · Enhanced" },
  { id: "whatsapp", name: "Evolution API (WA)", logo: "whatsapp", status: "connected", detail: "Instância ativa" },
  { id: "gtm", name: "GTM Server-Side", logo: "gtm", status: "connected", detail: "Container ativo" },
];

export const WORKFLOW_NODES: WorkflowNode[] = [
  { id: "1", icon: "webhook", label: "Webhook", type: "trigger" },
  { id: "2", icon: "filter", label: "Qualificar", type: "condition" },
  { id: "3", icon: "bot", label: "IA Agent", type: "action" },
  { id: "4", icon: "database", label: "HubSpot", type: "action" },
  { id: "5", icon: "message-square", label: "WhatsApp", type: "action" },
  { id: "6", icon: "bar-chart", label: "Pixel + GA4", type: "action" },
];

export const METRICS: Metric[] = [
  { label: "Leads Hoje", value: "47", delta: "+12% vs ontem", positive: true },
  { label: "Taxa Conversão", value: "18%", delta: "LTV médio R$2.4k", positive: true },
  { label: "Msgs Processadas", value: "1.2k", delta: "Agente SDR ativo", positive: true },
  { label: "ROI Automações", value: "3.8x", delta: "MRR +R$18k", positive: true },
];

export const INITIAL_EVENTS: TrackingEvent[] = [
  { id: "1", ts: "18:03:41", event: "purchase", source: "Meta CAPI", value: "R$1.2k" },
  { id: "2", ts: "18:03:38", event: "generate_lead", source: "GA4 + GTM", value: "+1" },
  { id: "3", ts: "18:03:35", event: "InitiateCheckout", source: "Pixel Meta", value: "R$890" },
  { id: "4", ts: "18:03:30", event: "ViewContent", source: "Pixel Meta", value: "+1" },
  { id: "5", ts: "18:03:22", event: "scroll_depth_75", source: "GTM Custom", value: "+1" },
];

export const INITIAL_LOGS: ApiLogEntry[] = [
  { id: "1", ts: "18:03:41", method: "POST", endpoint: "/crm/v3/objects/contacts", status: "201 Created", ms: 142 },
  { id: "2", ts: "18:03:39", method: "GET", endpoint: "/crm/v3/deals?stage=qualified", status: "200 OK", ms: 88 },
  { id: "3", ts: "18:03:38", method: "POST", endpoint: "/pixel/track → lead_qualified", status: "200 OK", ms: 45 },
  { id: "4", ts: "18:03:35", method: "POST", endpoint: "/ga4/mp/collect → generate_lead", status: "204 No Content", ms: 38 },
  { id: "5", ts: "18:03:30", method: "GET", endpoint: "/webhooks/whatsapp/message", status: "200 OK", ms: 201 },
];

const EVENT_POOL = ["PageView", "ViewContent", "InitiateCheckout", "generate_lead", "scroll_depth_75", "button_click", "purchase"];
const SOURCE_POOL = ["Pixel Meta", "GA4 + GTM", "Meta CAPI", "GTM Custom", "Google Ads"];
const VALUE_POOL = ["+1", "R$890", "R$1.2k", "R$450", "+1", "+1", "R$3.4k"];
const ENDPOINT_POOL = [
  "/crm/v3/objects/contacts", "/crm/v3/deals", "/pixel/track", "/ga4/mp/collect",
  "/webhooks/webhook", "/hubspot/events", "/meta/conversions", "/gtm/dataLayer",
];

export function generateEvent(): TrackingEvent {
  const now = new Date();
  return {
    id: Math.random().toString(36).slice(2),
    ts: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
    event: EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)],
    source: SOURCE_POOL[Math.floor(Math.random() * SOURCE_POOL.length)],
    value: VALUE_POOL[Math.floor(Math.random() * VALUE_POOL.length)],
  };
}

export function generateApiLog(): ApiLogEntry {
  const now = new Date();
  const method = Math.random() > 0.3 ? "POST" : "GET";
  const ok = Math.random() > 0.05;
  return {
    id: Math.random().toString(36).slice(2),
    ts: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
    method: method as "GET" | "POST",
    endpoint: ENDPOINT_POOL[Math.floor(Math.random() * ENDPOINT_POOL.length)],
    status: ok ? "200 OK" : "422 Error",
    ms: Math.floor(Math.random() * 200 + 30),
  };
}

export const AGENT_RESPONSES: Record<string, string> = {
  preço: "Nossos planos começam em R$997/mês para o pacote SDR automatizado. O ROI médio dos nossos clientes é de 3.8x em 90 dias. Quer agendar uma demo?",
  demo: "Perfeito! Para agilizar: você precisa mais de automação de WhatsApp, gestão de leads ou rastreamento de campanhas? Assim preparo a demo certa.",
  ia: "O agente usa GPT-4o com contexto de CRM em tempo real. Qualifica via BANT, sincroniza com HubSpot e dispara pixels de conversão — tudo automaticamente.",
};

export const AGENT_DEFAULTS = [
  "Entendido. Deixa eu verificar isso no CRM...",
  "Boa pergunta. Posso qualificar melhor sua necessidade?",
  "Vou registrar no HubSpot e acionar nosso time. Qual a urgência?",
  "Score atual: 72/100. Você está no caminho certo.",
];
