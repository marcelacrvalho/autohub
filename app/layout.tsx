import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { NavTabs } from "@/components/layout/NavTabs";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "AutoHub — Central de Automação IA",
  description: "Hub de automação com IA, workflows, integrações CRM e tracking de eventos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="grid-bg">
        <Header />
        <NavTabs />
        <div className="grid md:grid-cols-[280px_1fr] min-h-[calc(100vh-120px)]">
          <Sidebar />
          <main className="p-8 overflow-y-auto relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
