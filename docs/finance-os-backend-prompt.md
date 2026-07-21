# KLPS Finance OS Backend Build Prompt

Build the backend for the KLPS Finance OS as the PostgreSQL-backed source of truth for all financial planning data. Preserve the current frontend contract and design the API so every financial value is traceable, versioned, evidence-linked, recalculated by the financial engine, and safe for future AI analysis.

Core requirements:

- Use PostgreSQL with schemas/tables for assumptions, assumption_versions, evidence, evidence_links, finance_events, decisions, risks, reports, scenarios, products, hires, funding, documents, and audit metadata.
- Every editable table must include `created_at`, `updated_at`, `created_by`, `updated_by`, `version`, and `change_reason`.
- Assumptions must store name, category, value, unit, confidence score, confidence level, source, owner, status, notes, linked metrics, and evidence relationships.
- Evidence must support supplier quotes, research, surveys, competitor analysis, contracts, invoices, and prototype costs. Store placeholder file metadata now, with signed document URL support later.
- Every mutation must create an immutable finance event such as `Manufacturing Cost Updated`, `Revenue Forecast Recalculated`, `Added Supplier Quote`, `Payroll Updated`, or `Funding Scenario Created`.
- Reports must never calculate values directly. They should consume persisted/calculated Financial Engine outputs.
- AI insight endpoints must return structured placeholders derived from financial model outputs, not hardcoded prose.
- Data Room access rules must apply to Finance OS routes for founders, admins, and invited guests after authentication.

Recommended API surface:

- `GET /api/finance/state`
- `GET /api/finance/model?scenario=base`
- `PATCH /api/finance/assumptions/:id`
- `GET /api/finance/assumptions/:id/versions`
- `POST /api/finance/evidence`
- `POST /api/finance/evidence/:id/link`
- `GET /api/finance/events`
- `GET /api/finance/decisions`
- `POST /api/finance/decisions`
- `GET /api/finance/risks`
- `POST /api/finance/risks`
- `GET /api/finance/reports`
- `POST /api/finance/reports/generate`

Calculation rule:

The backend should call a reusable Financial Engine service after any input mutation, persist a model snapshot/version, and return the updated derived model to the frontend. Do not duplicate financial formulas in route handlers or report generators.

Security rule:

All routes must require an authenticated data-room session and must check role-level permission. Guests can read shared finance outputs and evidence metadata. Founders/admins can edit assumptions, upload evidence, create decisions, update risks, and generate reports.
