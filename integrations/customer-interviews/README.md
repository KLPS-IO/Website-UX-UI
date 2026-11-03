# Private KLPS customer discovery

Page: `/founder/customer-interviews`. No public navigation link. Requires a server-verified `founder_admin` data-room session. Sign in at `/data-room`, then return to the page. No sensitive notes are saved in browser local storage; drafts remain in memory until an explicit save.

## Scope

A five-minute problem interview comes before any pitch. An optional 5–10 minute comparison covers clothing category, fabric feel, styling, pod/embedded preferences, current routine, insight utility, trust, proximity concerns and wear/maintenance burden. These are hypothetical concept reactions, not tested products. Garment-card order rotates by interview ID; the order is retained.

Anonymous notes require affirmative adult and research consent; contact and anonymous quote permission are separate. Record no diagnoses, card details or unnecessary identifiers. Participants can withdraw using their interview ID; use the private delete control. Review retention regularly and remove contact details once follow-up is complete. JSON exports include private data and must be restricted.

Do not ask all comparison questions in a five-minute street approach. Ask permission to extend or book a follow-up. Start with three conversations, label practice records as pilot, review at ten, and recruit across multiple channels. The 100+ target is learning coverage, not statistical market proof.

## Storage and release

`routes.ts` is copied to KLPS-Core `server/src/routes/customer-interviews.routes.ts`; `install.py` mounts it before the public research router and copies the additive SQL migration. Server endpoints: authenticated founder-only GET, POST, PUT `/api/research/interviews`; DELETE `/api/research/interviews/:id`. Migration: `migration.sql` creates `research_field_interviews`, separate from survey responses.

The frontend disables collection if authenticated storage cannot be loaded. Failed saves retain the in-memory draft and show an error. POST retries reuse the UUID to avoid duplicates; PUT supports review and segment assignment. Source question version and concept order are stored for audit. No real customer or test interview is inserted by the automated checks.

## Verification

- `node --test src/lib/customer-interviews.test.ts`: exclusions, evidence counts, empty state, neutral defaults and option rotation.
- `npx tsc --noEmit -p tsconfig.app.json` and `npm run build`.
- `node integrations/customer-interviews/check-api.cjs`: isolated API contracts with simulated auth/storage; no database.
- Mobile browser checks use mocked API data to exercise save payload, comparison, evidence, storage failure and signed-out gate.
- KLPS-Core targeted route typecheck passes. Full backend typecheck is currently blocked by missing local `sharp` and `@resvg/resvg-js` dependencies in unrelated growth code.

## Evidence interpretation

Completed records exclude pilots and partial interviews. Segment/source/relationship are retained; do not merge the original public survey into this sample. Stated price interest, bookings, deposits and actual paid pilot/product transactions are separate. Payment references are recorded claims until reconciled against payment records. Prices require a specific offer and explicit pricing basis; garment preference never implies a proven engineering or safety claim.

Read every ten interviews for repeated outcomes and named competitor gaps. Choose a narrow segment and a demonstrable outcome before deciding the garment or electronics. Suggested pilot decision thresholds on the page are founder planning rules, not statistical significance. Four-sentence output reports only recorded counts and caveats; it does not invent market size, efficacy, willingness to pay or investor traction.
