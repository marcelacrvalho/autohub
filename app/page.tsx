import { MetricCard, Card, FunnelChart } from "@/components/ui";
import { METRICS } from "@/lib/data";

const funnelSteps = [
  { label: "Visitantes", value: "10.2k", pct: 100 },
  { label: "Leads", value: "6.9k", pct: 68 },
  { label: "Qualificados", value: "3.2k", pct: 32 },
  { label: "Proposta", value: "1.8k", pct: 18 },
  { label: "Fechado", value: "840", pct: 8 },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1.5">Central de Controle</h1>
      <p className="font-mono text-xs text-[#6b6b80] mb-7">// PIPELINE OVERVIEW — TEMPO REAL</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Funil de Conversão">
          <FunnelChart steps={funnelSteps} />
        </Card>

        <Card title="Payload JSON — Último Webhook">
          <div className="bg-black border border-[#2a2a3a] rounded-lg p-5 font-mono text-xs leading-[1.8] max-h-64 overflow-y-auto">
            <span className="text-[#7c6bff]">&quot;event&quot;</span>
            {": "}
            <span className="text-[#ffd93d]">&quot;lead_qualified&quot;</span>
            {",\n"}
            <span className="text-[#7c6bff]">&quot;timestamp&quot;</span>
            {": "}
            <span className="text-[#ffd93d]">&quot;2025-02-25T18:03:41Z&quot;</span>
            {",\n"}
            <span className="text-[#7c6bff]">&quot;source&quot;</span>
            {": "}
            <span className="text-[#ffd93d]">&quot;whatsapp_agent&quot;</span>
            {",\n"}
            <span className="text-[#7c6bff]">&quot;contact&quot;</span>
            {": {\n  "}
            <span className="text-[#7c6bff]">&quot;name&quot;</span>
            {": "}
            <span className="text-[#ffd93d]">&quot;Carlos Lima&quot;</span>
            {",\n  "}
            <span className="text-[#7c6bff]">&quot;phone&quot;</span>
            {": "}
            <span className="text-[#ffd93d]">&quot;+5511999887766&quot;</span>
            {",\n  "}
            <span className="text-[#7c6bff]">&quot;score&quot;</span>
            {": "}
            <span className="text-[#00e5a0]">87</span>
            {",\n  "}
            <span className="text-[#7c6bff]">&quot;stage&quot;</span>
            {": "}
            <span className="text-[#ffd93d]">&quot;SQL&quot;</span>
            {"\n},\n"}
            <span className="text-[#7c6bff]">&quot;crm_sync&quot;</span>
            {": "}
            <span className="text-[#ff6b6b]">true</span>
            {",\n"}
            <span className="text-[#7c6bff]">&quot;hubspot_deal_id&quot;</span>
            {": "}
            <span className="text-[#ffd93d]">&quot;hs_124556&quot;</span>
            {",\n"}
            <span className="text-[#7c6bff]">&quot;pixel_fired&quot;</span>
            {": "}
            <span className="text-[#ff6b6b]">true</span>
            {",\n"}
            <span className="text-[#7c6bff]">&quot;ga4_event&quot;</span>
            {": "}
            <span className="text-[#ffd93d]">&quot;generate_lead&quot;</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
