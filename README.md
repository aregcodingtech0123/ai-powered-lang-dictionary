# AI-powered language dictionary (MVP)

English ↔ Turkish dictionary with mock glosses, plus Google **Gemini** explanations and three example sentences. Frontend: **Next.js** + **Tailwind**. Backend: **Express** + **TypeScript**.

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm
- A [Google AI Studio](https://aistudio.google.com/apikey) **Gemini API key** (optional; without it, mock meanings still work and AI fields show a placeholder message)

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env` and set `GEMINI_API_KEY`. Optionally set `GEMINI_MODEL` (default `gemini-2.5-flash`) if your project uses a different model id.

```bash
npm run dev
```

API listens on **http://localhost:3001** by default.

- `GET /api/translate?word=...&from=en|tr&to=en|tr` — full response (meanings + AI)
- `POST /api/translate/regenerate` — body: `{ "word": "...", "from": "en", "to": "tr" }` — returns `{ "examples": [...] }` only (new AI examples)
- `GET /health` — liveness check

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
```

Optional: copy `frontend/.env.local.example` to `frontend/.env.local` if the API is not on `http://localhost:3001`.

```bash
npm run dev
```

Open **http://localhost:3000**.

## Production build

**Backend**

```bash
cd backend
npm run build
npm start
```

**Frontend**

```bash
cd frontend
npm run build
npm start
```

Set `NEXT_PUBLIC_API_URL` to your deployed API URL for production.

## Project layout

- `backend/src` — Express app, mock dictionary, Gemini `aiService`
- `frontend/src` — Next.js App Router, UI components, API client
