"use client";

import { useState } from "react";
import { Badge, Button, SectionTitle } from "@/components/ui";
import { INITIAL_LEADS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Lead, Stage } from "@/lib/types";

const stageMap: Record<Stage, { label: string; variant: "lead" | "qualified" | "proposal" | "won" }> = {
  lead: { label: "Lead", variant: "lead" },
  qualified: { label: "Qualificado", variant: "qualified" },
  proposal: { label: "Proposta", variant: "proposal" },
  won: { label: "Fechado", variant: "won" },
};

export default function CrmPage() {
  const [leads] = useState<Lead[]>(INITIAL_LEADS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = leads.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || l.stage === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <SectionTitle title="CRM & Pipeline de Leads" sub="// HubSpot Sync · Lead Scoring · LTV Tracking" />

      <div className="flex gap-3 mb-6 flex-wrap items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar lead..."
          className="bg-[#1a1a24] border border-[#2a2a3a] rounded-md px-3 py-2 text-sm text-[#e8e8f0] placeholder-[#6b6b80] outline-none focus:border-[#00e5a0] font-mono w-64 transition-colors"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#1a1a24] border border-[#2a2a3a] rounded-md px-3 py-2 text-[#e8e8f0] font-mono text-xs outline-none w-44"
        >
          <option value="all">Todos os estágios</option>
          <option value="lead">Lead</option>
          <option value="qualified">Qualificado</option>
          <option value="proposal">Proposta</option>
          <option value="won">Fechado</option>
        </select>
        <Button>+ Novo Lead</Button>
      </div>

      <div className="bg-[#111118] border border-[#2a2a3a] rounded-lg overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr>
              {["Nome", "Empresa", "Score", "Estágio", "LTV Est.", "Origem", "Último Contato"].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-mono text-[10px] tracking-[1.5px] uppercase text-[#6b6b80] border-b border-[#2a2a3a] bg-[#111118]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-semibold border-b border-[#2a2a3a]/50">{lead.name}</td>
                <td className="px-4 py-3 border-b border-[#2a2a3a]/50">{lead.company}</td>
                <td className={cn("px-4 py-3 font-mono font-bold border-b border-[#2a2a3a]/50",
                  lead.score >= 80 ? "text-[#00e5a0]" : lead.score >= 60 ? "text-[#ffd93d]" : "text-[#ff6b6b]"
                )}>
                  {lead.score}
                </td>
                <td className="px-4 py-3 border-b border-[#2a2a3a]/50">
                  <Badge variant={stageMap[lead.stage].variant}>{stageMap[lead.stage].label}</Badge>
                </td>
                <td className="px-4 py-3 font-mono border-b border-[#2a2a3a]/50">{lead.ltv}</td>
                <td className="px-4 py-3 border-b border-[#2a2a3a]/50">{lead.source}</td>
                <td className="px-4 py-3 text-[#6b6b80] font-mono text-xs border-b border-[#2a2a3a]/50">{lead.lastContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["lead", "qualified", "proposal", "won"] as Stage[]).map((stage) => {
          const count = leads.filter((l) => l.stage === stage).length;
          const total = leads.reduce((acc, l) => l.stage === stage ? acc + parseFloat(l.ltv.replace(/[^0-9.]/g, "")) : acc, 0);
          return (
            <div key={stage} className="bg-[#111118] border border-[#2a2a3a] rounded-lg p-4">
              <Badge variant={stageMap[stage].variant}>{stageMap[stage].label}</Badge>
              <div className="text-2xl font-extrabold mt-2">{count}</div>
              <div className="font-mono text-[10px] text-[#6b6b80] mt-1">
                LTV: R${total.toFixed(1)}k
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
