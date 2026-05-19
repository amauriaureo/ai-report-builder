# AI Report Builder

Fullstack app for building analytical reports visually: drag blocks onto the canvas and use AI to generate each block's content from user-provided context.

## Architecture

```
┌─────────────────────────────────────────┐
│              React Frontend             │
│  ┌──────────┐        ┌───────────────┐  │
│  │ Sidebar  │──drag──▶    Canvas     │  │
│  │ (blocks) │        │  (drop zone)  │  │
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

| Layer    | Technologies                                       |
|----------|----------------------------------------------------|
| Frontend | React, Vite, TailwindCSS, dnd-kit, Zustand, Axios, jsPDF |
| Backend  | Python, FastAPI, Pydantic, Groq SDK                |
| Deploy   | Railway (backend) + Vercel (frontend)              |

## Quick start

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
cp .env.example .env          # add GROQ_API_KEY
uvicorn main:app --reload --port 8080
```

API at `http://localhost:8080` — docs at `/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App at `http://localhost:5173`. In development, `VITE_API_URL` in `.env.development` points to the backend (default `http://127.0.0.1:8080/api`).

## Block types

| Type             | Description                              |
|------------------|------------------------------------------|
| `summary`        | Executive summary                        |
| `kpi`            | Metric with value, trend, and delta      |
| `insight`        | Strategic insight                        |
| `recommendation` | Actionable recommendation                |

## API contract

```
POST /api/generate-block

{
  "block_type": "summary",
  "context": "Q1 revenue grew 20% vs Q4",
  "language": "en-US"
}
```

## Features

- Drag-and-drop block palette and canvas reordering
- AI generation per block via Groq (`llama-3.3-70b-versatile`)
- **Export as PDF** — enabled after at least one block has AI-generated content

## Architecture decisions

| Decision | Rationale |
|----------|-----------|
| FastAPI | Native async, ideal for AI API I/O |
| dnd-kit | Actively maintained, strong accessibility |
| Zustand | Simple global state without Redux overhead |
| `response_format: json_object` | Reliable JSON from the model |
| Per-type prompts | Clear output contract per block |

## Deploy

**Backend (Railway):** set `GROQ_API_KEY` and run `uvicorn main:app --host 0.0.0.0 --port $PORT`.

**Frontend (Vercel):** set `VITE_API_URL` to your public backend URL + `/api`.
