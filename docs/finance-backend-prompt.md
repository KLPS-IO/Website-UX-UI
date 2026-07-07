# Finance OS Backend Prompt

Build the PostgreSQL backend for the KLPS Finance OS now present in the React app.

The frontend expects finance data to behave as living business objects, not flat numbers. Implement tables, repositories and services for:

- assumptions with category, value, unit, confidence score, confidence level, source, owner, status, notes and linked metrics
- evidence records with attachment placeholders, source metadata and supported assumption links
- version history for every editable financial record
- audit fields: `created_at`, `updated_at`, `created_by`, `updated_by`, `version`, `change_reason`
- finance events for recent activity
- decisions with financial impact, linked evidence, status and outcome
- risks with probability, impact, mitigation, owner, review date and status
- products, revenue streams, expenses, payroll/hiring, funding, cash flow and reports

Expose endpoints suitable for founder and invited data-room guest access:

- `GET /api/finance/state`
- `PATCH /api/finance/assumptions/:id`
- `GET /api/finance/evidence`
- `POST /api/finance/evidence`
- `GET /api/finance/events`
- `GET /api/finance/decisions`
- `POST /api/finance/decisions`
- `GET /api/finance/risks`
- `PATCH /api/finance/risks/:id`
- `GET /api/finance/reports`

Keep calculations owned by a backend financial service that mirrors the frontend Financial Engine. Reports and AI insight endpoints must consume structured engine outputs only; no report or AI path should calculate directly from raw tables.

Return placeholder data matching the frontend seeds until real records are created. Design the schema so future AI can consume a complete graph of assumptions, derived metrics, evidence, events, decisions, risks and version history.
