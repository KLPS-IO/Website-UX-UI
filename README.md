# KLPS Website UX/UI

React + Vite frontend for the KLPS public site, beta experience, Innovation Lab, Data Room, and public Body Discovery survey.

## Active Stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Railway Express backend for survey submission
- PostgreSQL for survey data
- Cloudflare R2 for voice recordings

## Active Routes

- `/` - public landing page
- `/body-discovery` - public Body Discovery survey
- `/innovation-lab` - Innovation Lab
- `/data-room` - Data Room
- `/beta-login` - beta login
- `/beta-dashboard/*` - beta dashboard experience

## Survey Storage

The Body Discovery survey posts multipart form data to:

```text
${VITE_API_BASE_URL || "https://klps-lema-production.up.railway.app"}/api/research
```

Voice recordings are uploaded by the backend to Cloudflare R2. Structured questionnaire
data should be inserted into PostgreSQL by the same backend request.

See `docs/research-platform-audit.md` for the current research pipeline audit and
`database/research_analytics.sql` for investor-safe analytics views.

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
