# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Frontend (React + Vite)

  ## Commands

  - Dev: `npm run dev`
  - Build: `npm run build`
  - Preview build: `npm run preview`

  ## Environment

  Create a `.env` file locally (see `.env.example`).

  - `VITE_API_URL` should point at the backend and include `/api`.
    - Local: `http://localhost:8080/api`
    - Render: `https://<your-render-service>.onrender.com/api`

  ## Deployment (Vercel)

  Recommended: create a Vercel project with **Root Directory = `frontend`**.

  Set Environment Variables in Vercel:

  - `VITE_API_URL=https://<your-render-service>.onrender.com/api`

  SPA routing is handled via [frontend/vercel.json](frontend/vercel.json).

