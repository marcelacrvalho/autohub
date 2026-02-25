# AutoHub — Central de Automação IA

Projeto portfolio desenvolvido com **Next.js 14 + TypeScript + Tailwind CSS** cobrindo os requisitos da vaga de Desenvolvedor na V4 Company.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones)

## Instalação

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## Estrutura

```
autohub/
├── app/
│   ├── layout.tsx          # Layout raiz com Header + NavTabs + Sidebar
│   ├── page.tsx            # Dashboard — métricas, funil, JSON payload
│   ├── agent/page.tsx      # Agente IA SDR com chat funcional
│   ├── workflows/page.tsx  # Workflows n8n/Make visualizados
│   ├── integrations/       # API REST log ao vivo + integrações
│   ├── tracking/           # Stream de eventos GA4/Pixel/GTM
│   └── crm/page.tsx        # CRM com lead scoring e filtros
├── components/
│   ├── layout/             # Header, Sidebar, NavTabs
│   └── ui/                 # Card, Button, Badge, Toggle, FunnelChart, MetricCard
└── lib/
    ├── types.ts            # Tipagens: Lead, TrackingEvent, ApiLogEntry...
    ├── data.ts             # Mock data + geradores de dados ao vivo
    └── utils.ts            # cn() helper
```

## Requisitos cobertos

### Inteligência Artificial & Automação
- Agente SDR com chat funcional (qualificação BANT)
- Configuração de modelo LLM, persona e temperatura
- Fluxo conversacional WhatsApp + Web
- Visualização de workflows n8n/Make/Zapier
- Arquitetura orientada a funil, LTV e ROI

### Integrações & Dados
- Log ao vivo de chamadas REST API (GET/POST)
- Payload JSON de webhooks estruturado
- Cards de integração: HubSpot, Salesforce, Meta Ads, GA4, GTM
- Rate limits e saúde das integrações

### Tracking & Conversão
- Stream ao vivo de eventos (Pixel Meta, CAPI, GA4, GTM custom)
- Toggle de tracking server-side vs client-side
- Funil orientado a ROI

### Web & Infraestrutura
- Next.js 14 App Router
- TypeScript com tipos bem definidos
- Componentes reutilizáveis
- Layout responsivo

## Arquitetura real (produção)

```
Lead (WhatsApp/Ads)
  └─► Webhook → n8n
        ├─► AI Agent (GPT-4o) → Qualifica via BANT
        ├─► HubSpot CRM → Cria/atualiza deal
        ├─► Meta CAPI → Dispara conversão
        └─► GA4 → Evento generate_lead
```

## Deploy

```bash
npm run build
npm run start
```
 ![Example Image](https://github.com/marcelacrvalho/autohub/blob/master/autohub.PNG)
