# AI Report Builder

Aplicação fullstack para montar relatórios analíticos de forma visual: arraste blocos para o canvas e use IA para gerar o conteúdo de cada bloco com base em um contexto fornecido.

## Arquitetura

```
┌─────────────────────────────────────────┐
│              React Frontend             │
│  ┌──────────┐        ┌───────────────┐  │
│  │ Sidebar  │──drag──▶    Canvas     │  │
│  │ (blocos) │        │  (drop zone)  │  │
│  └──────────┘        └──────┬────────┘  │
│                             │ POST      │
└─────────────────────────────┼───────────┘
                              │
┌─────────────────────────────▼───────────┐
│           FastAPI Backend               │
│  POST /api/generate-block               │
│         │                               │
│         ▼                               │
│   PromptBuilder → Groq API              │
└─────────────────────────────────────────┘
```

## Stack

| Camada   | Tecnologias                                      |
|----------|--------------------------------------------------|
| Frontend | React, Vite, TailwindCSS, dnd-kit, Zustand, Axios |
| Backend  | Python, FastAPI, Pydantic, Groq SDK              |
| Deploy   | Railway (backend) + Vercel (frontend)          |

## Início rápido

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
cp .env.example .env          # adicione GROQ_API_KEY
uvicorn main:app --reload --port 8000
```

API disponível em `http://localhost:8000` — documentação em `/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App em `http://localhost:5173`. O proxy do Vite encaminha `/api` para `localhost:8000`.

## Tipos de bloco

| Tipo            | Descrição                          |
|-----------------|------------------------------------|
| `summary`       | Resumo executivo                   |
| `kpi`           | Indicador com valor, tendência e delta |
| `insight`       | Insight estratégico                |
| `recommendation`| Recomendação acionável             |

## Contrato da API

```
POST /api/generate-block

{
  "block_type": "summary",
  "context": "vendas do Q1 cresceram 20% vs Q4",
  "language": "pt-BR"
}
```

## Decisões de arquitetura

| Decisão | Motivo |
|---------|--------|
| FastAPI | Async nativo, ideal para I/O com APIs de IA |
| dnd-kit | Mantido ativamente, melhor acessibilidade |
| Zustand | Estado simples sem overhead do Redux |
| `response_format: json_object` | JSON válido sem parsing de markdown |
| Prompts por tipo | Contrato de saída claro por bloco |

## Deploy

**Backend (Railway):** defina `GROQ_API_KEY` e inicie com `uvicorn main:app --host 0.0.0.0 --port $PORT`.

**Frontend (Vercel):** defina `VITE_API_URL` com a URL pública do backend + `/api`.
