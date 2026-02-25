"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot, Target, LifeBuoy, Settings, Zap, RefreshCw, Mail,
  Link2, BarChart2
} from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  { label: "SDR Agent", icon: Bot, href: "/agent", count: "3" },
  { label: "Qualificação", icon: Target, href: "/agent", count: "1" },
  { label: "Suporte", icon: LifeBuoy, href: "/agent" },
  { label: "Operações", icon: Settings, href: "/agent" },
];

const automations = [
  { label: "WhatsApp Flow", icon: Zap, href: "/workflows", count: "2" },
  { label: "Lead Nurturing", icon: RefreshCw, href: "/workflows" },
  { label: "Email Sequences", icon: Mail, href: "/workflows" },
];

const integrations = [
  { label: "HubSpot", icon: Link2, href: "/integrations", connected: true },
  { label: "Salesforce", icon: Link2, href: "/integrations" },
  { label: "GA4 + Pixel", icon: BarChart2, href: "/integrations" },
];

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  count?: string;
  connected?: boolean;
  isActive?: boolean;
}

function SidebarItem({ icon: Icon, label, href, count, connected, isActive }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-5 py-2.5 text-sm transition-all border-l-2 border-transparent text-[#6b6b80] hover:bg-[#1a1a24] hover:text-[#e8e8f0]",
        isActive && "border-l-[#00e5a0] bg-[#00e5a0]/5 text-[#00e5a0]"
      )}
    >
      <Icon size={14} strokeWidth={1.75} />
      <span>{label}</span>
      {connected && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />
      )}
      {count && !connected && (
        <span className="ml-auto bg-[#1a1a24] px-2 py-0.5 rounded-full font-mono text-[10px]">
          {count}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-[#2a2a3a] bg-[#111118] py-6 hidden md:block">
      <div className="mb-8">
        <p className="px-5 pb-2.5 font-mono text-[10px] tracking-[2px] text-[#6b6b80] uppercase">
          Agentes Ativos
        </p>
        {agents.map((a) => (
          <SidebarItem
            key={a.label}
            {...a}
            isActive={pathname === a.href && a.label === "SDR Agent"}
          />
        ))}
      </div>

      <div className="mb-8">
        <p className="px-5 pb-2.5 font-mono text-[10px] tracking-[2px] text-[#6b6b80] uppercase">
          Automações
        </p>
        {automations.map((a) => (
          <SidebarItem key={a.label} {...a} isActive={pathname === a.href} />
        ))}
      </div>

      <div>
        <p className="px-5 pb-2.5 font-mono text-[10px] tracking-[2px] text-[#6b6b80] uppercase">
          Integrações
        </p>
        {integrations.map((i) => (
          <SidebarItem key={i.label} {...i} isActive={pathname === i.href} />
        ))}
      </div>
    </aside>
  );
}
