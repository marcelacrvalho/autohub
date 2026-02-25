"use client";

import { useState, useEffect } from "react";
import { Card, Button, SectionTitle } from "@/components/ui";
import { INITIAL_LOGS, generateApiLog } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Link2, Cloud, BarChart2, MessageSquare, Tag, CheckCircle2, Circle
} from "lucide-react";
import type { ApiLogEntry } from "@/lib/types";

const INTEGRATIONS = [
  { id: "hubspot", name: "HubSpot", icon: Tag, status: "connected" as const, detail: "Conectado · API v3" },
  { id: "salesforce", name: "Salesforce", icon: Cloud, status: "idle" as const, detail: "Disponível" },
  { id: "meta", name: "Meta Ads API", icon: Link2, status: "connected" as const, detail: "Conectado · Pixel ativo" },
  { id: "ga4", name: "Google Ads + GA4", icon: BarChart2, status: "connected" as const, detail: "Conectado · Enhanced" },
  { id: "whatsapp", name: "Evolution API (WA)", icon: MessageSquare, status: "connected" as const, detail: "Instância ativa" },
  { id: "gtm", name: "GTM Server-Side", icon: BarChart2, status: "connected" as const, detail: "Container ativo" },
];

function IntegrationCard({ integration }: { integration: typeof INTEGRATIONS[0] }) {
  const Icon = integration.icon;
  return (
    <div className={cn(
      "bg-[#111118] border border-[#2a2a3a] rounded-lg p-5 flex items-center gap-3.5 transition-all cursor-pointer hover:border-[#7c6bff]/50",
      integration.status === "connected" && "border-[#00e5a0]/30"
    )}>
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
        integration.status === "connected" ? "bg-[#00e5a0]/10" : "bg-[#1a1a24]"
      )}>
        <Icon size={18} className={integration.status === "connected" ? "text-[#00e5a0]" : "text-[#6b6b80]"} strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm">{integration.name}</p>
        <div className={cn(
          "flex items-center gap-1.5 font-mono text-[10px] mt-0.5",
          integration.status === "connected" ? "text-[#00e5a0]" : "text-[#6b6b80]"
        )}>
          {integration.status === "connected"
            ? <CheckCircle2 size={10} />
            : <Circle size={10} />
          }
          {integration.detail}
        </div>
      </div>
      <Button variant={integration.status === "connected" ? "secondary" : "primary"} size="sm">
        {integration.status === "connected" ? "Config" : "Conectar"}
      </Button>
    </div>
  );
}

function ApiLogLine({ entry }: { entry: ApiLogEntry }) {
  const isOk = entry.status.startsWith("2");
  return (
    <div className="mb-1 animate-fadeIn">
      <span className="text-[#6b6b80]">{entry.ts}</span>{" "}
      <span className={entry.method === "POST" ? "text-[#7c6bff]" : "text-[#61efce]"}>{entry.method}</span>{" "}
      {entry.endpoint}{" "}
      <span className={isOk ? "text-[#00e5a0]" : "text-[#ff6b6b]"}>{entry.status}</span>{" "}
      {entry.ms}ms
    </div>
  );
}

export default function IntegrationsPage() {
  const [logs, setLogs] = useState<ApiLogEntry[]>(INITIAL_LOGS);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [generateApiLog(), ...prev.slice(0, 19)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <SectionTitle title="Integrações & API REST" sub="// REST API · Webhooks · JSON Payloads" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {INTEGRATIONS.map((i) => (
          <IntegrationCard key={i.id} integration={i} />
        ))}
      </div>

      <Card title="API Request Log — Tempo Real">
        <div className="bg-black border border-[#2a2a3a] rounded-lg p-5 font-mono text-xs leading-[1.8] h-72 overflow-y-auto">
          {logs.map((l) => (
            <ApiLogLine key={l.id} entry={l} />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card title="Webhook Payload — Exemplo REST">
          <div className="bg-black border border-[#2a2a3a] rounded-lg p-4 font-mono text-xs leading-relaxed">
            <p><span className="text-[#6b6b80]">POST</span> /webhook/lead-captured</p>
            <p className="text-[#6b6b80] mt-2 mb-1">Headers:</p>
            <p><span className="text-[#7c6bff]">Content-Type</span>: application/json</p>
            <p><span className="text-[#7c6bff]">X-Hub-Signature</span>: sha256=...</p>
            <p className="text-[#6b6b80] mt-2 mb-1">Body:</p>
            <p>{"{"}</p>
            <p className="pl-4"><span className="text-[#7c6bff]">&quot;phone&quot;</span>: <span className="text-[#ffd93d]">&quot;+5511999887766&quot;</span>,</p>
            <p className="pl-4"><span className="text-[#7c6bff]">&quot;utm_source&quot;</span>: <span className="text-[#ffd93d]">&quot;meta_ads&quot;</span>,</p>
            <p className="pl-4"><span className="text-[#7c6bff]">&quot;campaign_id&quot;</span>: <span className="text-[#00e5a0]">120213456789</span></p>
            <p>{"}"}</p>
          </div>
        </Card>

        <Card title="Rate Limits & Saúde">
          {[
            { name: "HubSpot API", usage: 68, limit: "100 req/10s" },
            { name: "Meta CAPI", usage: 32, limit: "Sem limite" },
            { name: "GA4 MP", usage: 15, limit: "1 req/s" },
            { name: "Evolution WA", usage: 45, limit: "100 msg/min" },
          ].map((r) => (
            <div key={r.name} className="flex items-center gap-3 mb-3">
              <span className="w-32 text-xs text-[#6b6b80]">{r.name}</span>
              <div className="flex-1 bg-[#1a1a24] rounded h-2 overflow-hidden">
                <div
                  className={cn("h-full rounded", r.usage > 80 ? "bg-[#ff6b6b]" : "bg-[#00e5a0]")}
                  style={{ width: `${r.usage}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-[#6b6b80] w-20 text-right">{r.limit}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
