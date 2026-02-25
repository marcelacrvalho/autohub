"use client";

import { Radio } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-[#2a2a3a] bg-[#0a0a0f]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="text-xl font-extrabold tracking-tight font-display">
        Auto<span className="text-[#00e5a0]">Hub</span>
      </div>
    </header>
  );
}
