"use client";

import { useState, useEffect } from "react";
import { Card, Toggle, FunnelChart, SectionTitle } from "@/components/ui";
import { INITIAL_EVENTS, generateEvent } from "@/lib/data";
import { Radio } from "lucide-react";
import type { TrackingEvent } from "@/lib/types";

const funnelSteps = [
  { label: "Impressões", value: "50k", pct: 100 },
  { label: "Cliques", value: "20k", pct: 40 },
  { label: "Leads", value: "7k", pct: 14 },
  { label: "Vendas", value: "2k", pct: 4 },
];

function EventRow({ event }: { event: TrackingEvent }) {
  return (
    <div className="grid grid-cols-[140px_1fr_120px_80px] gap-4 px-5 py-3 border-b border-[#2a2a3a]/50 last:border-0 text-xs items-center animate-slideIn">
      <span className="font-mono text-[#6b6b80]">{event.ts}</span>
      <span className="font-semibold">{event.event}</span>
      <span className="text-[#7c6bff] font-mono text-[10px]">{event.source}</span>
      <span className="text-[#00e5a0] font-bold font-mono">{event.value}</span>
    </div>
  );
}

export default function TrackingPage() {
  const [events, setEvents] = useState<TrackingEvent[]>(INITIAL_EVENTS);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => [generateEvent(), ...prev.slice(0, 7)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <SectionTitle title="Tracking & Eventos" sub="// Pixel · GTM · GA4 · Server-Side · Conversions API" />

      <div className="bg-[#111118] border border-[#2a2a3a] rounded-lg overflow-hidden mb-6">
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-[#2a2a3a]">
          <span className="text-xs font-bold uppercase tracking-[1px]">
            Stream de Eventos — Tempo Real
          </span>
        </div>
        <div>
          {events.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="Funil orientado a ROI">
          <FunnelChart steps={funnelSteps} />
        </Card>

        <Card title="Configuração GTM Server-Side">
          <Toggle label="Pixel Meta (client-side)" defaultOn />
          <Toggle label="Meta CAPI (server-side)" defaultOn />
          <Toggle label="GA4 Enhanced Ecommerce" defaultOn />
          <Toggle label="Google Ads Conversions" defaultOn />
          <Toggle label="Eventos customizados WA" defaultOn />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Event Match Quality">
          <div className="text-[42px] font-extrabold text-[#00e5a0]">8.4<span className="text-xl">/10</span></div>
          <p className="font-mono text-xs text-[#6b6b80] mt-1.5">Meta CAPI deduplication ativo</p>
        </Card>
        <Card title="Pixel Coverage">
          <div className="text-[42px] font-extrabold text-[#7c6bff]">94<span className="text-xl">%</span></div>
          <p className="font-mono text-xs text-[#6b6b80] mt-1.5">Server-side fallback ativo</p>
        </Card>
        <Card title="Eventos/Hora">
          <div className="text-[42px] font-extrabold text-[#ffd93d]">1.2<span className="text-xl">k</span></div>
          <p className="font-mono text-xs text-[#6b6b80] mt-1.5">Média últimas 24h</p>
        </Card>
      </div>
    </div>
  );
}
