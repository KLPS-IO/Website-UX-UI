# KLPS Website UX/UI

React + Vite frontend for the KLPS public site, beta experience, Innovation Lab, Data Room, and public Body Discovery survey.

## Active Stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Cloudflare Pages Functions for survey submission
- Cloudflare D1/KV/R2 bindings for survey data and voice recordings

## Active Routes

- `/` - public landing page
- `/body-discovery` - public Body Discovery survey
- `/innovation-lab` - Innovation Lab
- `/data-room` - Data Room
- `/beta-login` - beta login
- `/beta-dashboard/*` - beta dashboard experience

## Survey Storage
Removed 

## Development

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Type check:

```bash
npx tsc --noEmit
```
