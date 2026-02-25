import { Card, Badge, SectionTitle } from "@/components/ui";
import { Webhook, Filter, Bot, Database, MessageSquare, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

const WORKFLOW_NODES = [
  { id: "1", icon: Webhook, label: "Webhook", type: "trigger" as const },
  { id: "2", icon: Filter, label: "Qualificar", type: "condition" as const },
  { id: "3", icon: Bot, label: "IA Agent", type: "action" as const },
  { id: "4", icon: Database, label: "HubSpot", type: "action" as const },
  { id: "5", icon: MessageSquare, label: "WhatsApp", type: "action" as const },
  { id: "6", icon: BarChart2, label: "Pixel + GA4", type: "action" as const },
];

const nodeColors = {
  trigger: "border-[#00e5a0] text-[#00e5a0]",
  condition: "border-[#ffd93d] text-[#ffd93d]",
  action: "border-[#7c6bff] text-[#7c6bff]",
};

const nodeTypeLabels = {
  trigger: "TRIGGER",
  condition: "CONDITION",
  action: "ACTION",
};

export default function WorkflowsPage() {
  return (
    <div>
      <SectionTitle title="Workflows de Automação" sub="// n8n · Make · Zapier — ORCHESTRATION LAYER" />

      <div className="bg-[#111118] border border-[#2a2a3a] rounded-lg p-6 min-h-48 mb-6 overflow-x-auto">
        <p className="font-mono text-[10px] text-[#6b6b80] mb-6">
          WORKFLOW: Lead Captured → Qualify → CRM → Notify
        </p>
        <div className="flex items-center min-w-max gap-0">
          {WORKFLOW_NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={node.id} className="flex items-center">
                <div
                  className={cn(
                    "bg-[#1a1a24] border rounded-lg p-4 w-[130px] text-center cursor-pointer transition-all hover:-translate-y-0.5",
                    nodeColors[node.type]
                  )}
                >
                  <div className="flex justify-center mb-2">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-[0.5px] text-[#e8e8f0]">{node.label}</div>
                  <div className="font-mono text-[9px] text-[#6b6b80] mt-1">{nodeTypeLabels[node.type]}</div>
                </div>
                {i < WORKFLOW_NODES.length - 1 && (
                  <span className="text-[#2a2a3a] text-xl px-2">—</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Runs Hoje">
          <div className="text-[36px] font-extrabold text-[#00e5a0]">1,847</div>
          <p className="font-mono text-xs text-[#6b6b80] mt-1.5">98.7% success rate</p>
        </Card>
        <Card title="Tempo Médio">
          <div className="text-[36px] font-extrabold text-[#7c6bff]">
            1.2<span className="text-lg">s</span>
          </div>
          <p className="font-mono text-xs text-[#6b6b80] mt-1.5">Latência end-to-end</p>
        </Card>
        <Card title="Plataforma">
          <div className="flex gap-2 flex-wrap mt-2">
            <Badge variant="live">n8n</Badge>
            <Badge>Make</Badge>
            <Badge>Zapier</Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Workflows Ativos">
          {[
            { name: "Lead SDR WhatsApp", status: "running", runs: 847 },
            { name: "Lead Nurturing Email", status: "running", runs: 412 },
            { name: "CRM Sync HubSpot", status: "running", runs: 588 },
            { name: "Pixel Conversion API", status: "paused", runs: 0 },
          ].map((w) => (
            <div key={w.name} className="flex items-center justify-between py-3 border-b border-[#2a2a3a]/50 last:border-0">
              <div>
                <p className="text-sm font-semibold">{w.name}</p>
                <p className="font-mono text-[10px] text-[#6b6b80] mt-0.5">{w.runs} execuções hoje</p>
              </div>
              <span className={cn(
                "font-mono text-[10px] px-2.5 py-1 rounded-full border",
                w.status === "running"
                  ? "bg-[#00e5a0]/15 text-[#00e5a0] border-[#00e5a0]/40"
                  : "bg-[#6b6b80]/15 text-[#6b6b80] border-[#6b6b80]/40"
              )}>
                {w.status === "running" ? "RUNNING" : "PAUSED"}
              </span>
            </div>
          ))}
        </Card>

        <Card title="Exemplo n8n JSON Config">
          <div className="bg-black border border-[#2a2a3a] rounded-lg p-4 font-mono text-xs leading-relaxed overflow-y-auto max-h-52">
            <span className="text-[#7c6bff]">&quot;nodes&quot;</span>{": [\n  {\n    "}
            <span className="text-[#7c6bff]">&quot;type&quot;</span>{": "}
            <span className="text-[#ffd93d]">&quot;n8n-nodes-base.webhook&quot;</span>
            {",\n    "}
            <span className="text-[#7c6bff]">&quot;name&quot;</span>{": "}
            <span className="text-[#ffd93d]">&quot;Lead Webhook&quot;</span>
            {",\n    "}
            <span className="text-[#7c6bff]">&quot;method&quot;</span>{": "}
            <span className="text-[#ffd93d]">&quot;POST&quot;</span>
            {"\n  },\n  {\n    "}
            <span className="text-[#7c6bff]">&quot;type&quot;</span>{": "}
            <span className="text-[#ffd93d]">&quot;@n8n/n8n-nodes-langchain.agent&quot;</span>
            {",\n    "}
            <span className="text-[#7c6bff]">&quot;model&quot;</span>{": "}
            <span className="text-[#ffd93d]">&quot;gpt-4o-mini&quot;</span>
            {"\n  }\n]"}
          </div>
        </Card>
      </div>
    </div>
  );
}
