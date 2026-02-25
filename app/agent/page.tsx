"use client";

import { useState, useRef, useEffect } from "react";
import { Card, Button, Toggle, SectionTitle } from "@/components/ui";
import { Bot, Send, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENT_RESPONSES, AGENT_DEFAULTS } from "@/lib/data";
import type { ChatMessage } from "@/lib/types";

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("preço") || lower.includes("valor") || lower.includes("custo")) return AGENT_RESPONSES.preço;
  if (lower.includes("demo") || lower.includes("apresenta")) return AGENT_RESPONSES.demo;
  if (lower.includes("ia") || lower.includes("inteligência") || lower.includes("funciona")) return AGENT_RESPONSES.ia;
  return AGENT_DEFAULTS[Math.floor(Math.random() * AGENT_DEFAULTS.length)];
}

export default function AgentPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "0",
      role: "bot",
      content: "Olá! Sou o agente SDR da AutoHub. Como posso ajudar você hoje? Posso qualificar seu interesse, apresentar proposta ou conectar com nosso time.",
    },
  ]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMsg = (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setInput("");

    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: msg };
    const thinkMsg: ChatMessage = { id: "thinking", role: "thinking", content: "Processando... consultando CRM + LLM" };

    setMessages((prev) => [...prev, userMsg, thinkMsg]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "thinking"),
        { id: Date.now().toString(), role: "bot", content: getResponse(msg) },
      ]);
    }, 1200);
  };

  return (
    <div>
      <SectionTitle title="Agente IA — SDR" sub="// CONVERSATIONAL FLOW — GPT-4o + Contexto CRM" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        {/* Chat Window */}
        <div className="bg-[#111118] border border-[#2a2a3a] rounded-lg flex flex-col h-[520px]">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2a2a3a]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00e5a0] to-[#7c6bff] flex items-center justify-center">
              <Bot size={16} className="text-black" />
            </div>
            <div>
              <div className="font-bold text-sm">SDR Agent v2</div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00e5a0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />
                ONLINE — WhatsApp + Web
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] px-4 py-3 rounded-lg text-sm leading-relaxed animate-fadeIn",
                  m.role === "bot" && "bg-[#1a1a24] border border-[#2a2a3a] self-start",
                  m.role === "user" && "bg-[#00e5a0]/10 border border-[#00e5a0]/30 self-end text-[#00e5a0]",
                  m.role === "thinking" && "bg-[#1a1a24] border border-[#2a2a3a] self-start text-[#6b6b80] font-mono text-xs"
                )}
              >
                {m.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 px-4 pb-2 flex-wrap">
            {["Qual o preço?", "Quero uma demo", "Como funciona a IA?"].map((s) => (
              <button
                key={s}
                onClick={() => sendMsg(s)}
                className="text-[11px] px-3 py-1.5 border border-[#2a2a3a] rounded-full bg-[#1a1a24] text-[#6b6b80] font-mono cursor-pointer hover:border-[#00e5a0] hover:text-[#00e5a0] transition-all"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-2 p-4 border-t border-[#2a2a3a]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Enviar mensagem para o agente..."
              className="flex-1 bg-[#1a1a24] border border-[#2a2a3a] rounded-md px-3.5 py-2.5 text-sm text-[#e8e8f0] placeholder-[#6b6b80] outline-none focus:border-[#00e5a0] font-display transition-colors"
            />
            <Button onClick={() => sendMsg()} className="flex items-center gap-2">
              <Send size={13} />
              Enviar
            </Button>
          </div>
        </div>

        {/* Config Panel */}
        <div className="flex flex-col gap-4">
          <Card title="Configuração do Agente">
            <div className="mb-3">
              <label className="text-xs text-[#6b6b80] block mb-1.5">Modelo LLM</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-md px-3 py-2 text-[#e8e8f0] font-mono text-xs outline-none"
              >
                <option>gpt-4o-mini</option>
                <option>gpt-4o</option>
                <option>claude-3-haiku</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="text-xs text-[#6b6b80] block mb-1.5">Persona / Prompt base</label>
              <textarea
                className="w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-md px-3 py-2 text-[#e8e8f0] font-mono text-xs outline-none resize-y focus:border-[#00e5a0]"
                rows={3}
                defaultValue="Você é um SDR consultivo da V4 Company. Qualifique leads usando BANT. Seja direto, amigável e orientado a conversão."
              />
            </div>
            <div>
              <label className="text-xs text-[#6b6b80] block mb-1.5">Temperature</label>
              <input type="range" min={0} max={100} defaultValue={30} className="w-full accent-[#00e5a0]" />
            </div>
          </Card>

          <Card title="Canais & Integrações">
            <Toggle label="WhatsApp (Evolution API)" defaultOn />
            <Toggle label="Web Chat" defaultOn />
            <Toggle label="Sync HubSpot CRM" defaultOn />
            <Toggle label="Disparar Pixel Meta" />
            <Toggle label="Notif. Slack time" defaultOn />
          </Card>

          <Card title="Score do Último Lead">
            <div className="flex items-end justify-center gap-2 my-3">
              <TrendingUp size={28} className="text-[#00e5a0] mb-1" />
              <span className="text-[48px] font-extrabold text-[#00e5a0] leading-none">
                87<span className="text-xl">/100</span>
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1 mt-2">
              {[
                { label: "Budget", ok: true },
                { label: "Authority", ok: true },
                { label: "Need", ok: true },
                { label: "Timeline", ok: false },
              ].map((item) => (
                <div key={item.label} className={cn(
                  "text-center py-1.5 rounded text-[10px] font-mono font-bold border",
                  item.ok
                    ? "bg-[#00e5a0]/10 text-[#00e5a0] border-[#00e5a0]/30"
                    : "bg-[#6b6b80]/10 text-[#6b6b80] border-[#6b6b80]/30"
                )}>
                  {item.label}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
