"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Dashboard", href: "/" },
  { label: "Agente IA", href: "/agent" },
  { label: "Workflows", href: "/workflows" },
  { label: "Integrações & API", href: "/integrations" },
  { label: "Tracking & Eventos", href: "/tracking" },
  { label: "CRM / Leads", href: "/crm" },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-0 border-b border-[#2a2a3a] bg-[#111118] px-8 overflow-x-auto">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "px-5 py-3.5 text-[11px] font-bold tracking-[0.5px] uppercase transition-all whitespace-nowrap border-b-2 border-transparent text-[#6b6b80] hover:text-[#e8e8f0]",
            pathname === tab.href && "text-[#00e5a0] border-b-[#00e5a0]"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
