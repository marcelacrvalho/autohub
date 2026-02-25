"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

// ── Card ──────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn("bg-[#111118] border border-[#2a2a3a] rounded-lg p-5 transition-colors hover:border-[#7c6bff]/40", className)}>
      {title && (
        <h4 className="font-mono text-[10px] tracking-[1px] text-[#6b6b80] uppercase mb-3.5">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}

// ── MetricCard ────────────────────────────────────────────────────
interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}

export function MetricCard({ label, value, delta, positive = true }: MetricCardProps) {
  return (
    <div className="bg-[#111118] border border-[#2a2a3a] rounded-lg p-5 relative overflow-hidden hover:border-[#7c6bff]/50 transition-colors">
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00e5a0] to-[#7c6bff] opacity-50" />
      <p className="font-mono text-[10px] tracking-[1.5px] text-[#6b6b80] uppercase mb-2.5">{label}</p>
      <p className="text-[32px] font-extrabold leading-none">{value}</p>
      <p className={cn("font-mono text-xs mt-1.5", positive ? "text-[#00e5a0]" : "text-[#ff6b6b]")}>{delta}</p>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "live" | "lead" | "qualified" | "proposal" | "won";
}

const badgeVariants = {
  default: "border-[#2a2a3a] text-[#6b6b80]",
  live: "border-[#00e5a0] text-[#00e5a0]",
  lead: "bg-[#7c6bff]/20 text-[#7c6bff] border-[#7c6bff]/40",
  qualified: "bg-[#ffd93d]/15 text-[#ffd93d] border-[#ffd93d]/40",
  proposal: "bg-[#00e5a0]/15 text-[#00e5a0] border-[#00e5a0]/40",
  won: "bg-[#00e5a0]/30 text-[#00e5a0] border-[#00e5a0]",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={cn("inline-block font-mono text-[10px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full border", badgeVariants[variant])}>
      {children}
    </span>
  );
}

// ── Button ────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
  children: React.ReactNode;
}

const btnVariants = {
  primary: "bg-[#00e5a0] text-black hover:opacity-85",
  secondary: "bg-[#1a1a24] text-[#e8e8f0] border border-[#2a2a3a] hover:border-[#7c6bff]/50",
  danger: "bg-[#ff6b6b]/15 text-[#ff6b6b] border border-[#ff6b6b]/30 hover:bg-[#ff6b6b]/25",
};

const btnSizes = {
  sm: "px-3 py-1.5 text-[10px]",
  md: "px-4.5 py-2.5 text-xs",
};

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "font-bold font-display uppercase tracking-[0.5px] rounded-md transition-all cursor-pointer",
        btnVariants[variant],
        btnSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// ── Toggle ────────────────────────────────────────────────────────
interface ToggleProps {
  label: string;
  defaultOn?: boolean;
}

export function Toggle({ label, defaultOn = false }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex justify-between items-center text-sm mb-2.5">
      <span className="text-[#e8e8f0]">{label}</span>
      <div
        className={cn("toggle-track", on && "on")}
        onClick={() => setOn(!on)}
      />
    </div>
  );
}

// ── SectionTitle ──────────────────────────────────────────────────
interface SectionTitleProps {
  title: string;
  sub: string;
}

export function SectionTitle({ title, sub }: SectionTitleProps) {
  return (
    <>
      <h1 className="text-2xl font-extrabold mb-1.5">{title}</h1>
      <p className="font-mono text-xs text-[#6b6b80] mb-7">{sub}</p>
    </>
  );
}

// ── FunnelChart ───────────────────────────────────────────────────
interface FunnelStep {
  label: string;
  value: string;
  pct: number;
}

export function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((s) => (
        <div key={s.label} className="flex items-center gap-3 text-sm">
          <span className="w-28 text-[#6b6b80] text-xs">{s.label}</span>
          <div className="flex-1 bg-[#1a1a24] rounded h-7 overflow-hidden">
            <div
              className="h-full rounded flex items-center pl-3 font-mono text-xs font-bold bg-gradient-to-r from-[#00e5a0] to-[#7c6bff]"
              style={{ width: `${s.pct}%` }}
            >
              {s.value}
            </div>
          </div>
          <span className="w-10 font-mono text-xs text-right text-[#6b6b80]">{s.pct}%</span>
        </div>
      ))}
    </div>
  );
}
