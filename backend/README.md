# Backend (Express + TypeScript)

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Start (production): `npm start` (runs `node server.js` -> `dist/index.js`)

## Environment

Create a `.env` file locally (see `.env.example`). Required:

- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL` (your Vercel app URL)

Optional:

- `ALLOWED_ORIGINS` (comma-separated list)
- `EMAIL_USER`, `EMAIL_PASS`, `ADMIN_EMAIL`, `WHATSAPP_NUMBER`

## Deployment (Render)

Use the repo root `render.yaml` blueprint (recommended) or deploy the `backend` folder as a Node web service.

Render settings:

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Health check: `/api/health`
