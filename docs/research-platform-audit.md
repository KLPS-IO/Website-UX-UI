# KLPS Research Platform Audit

Audit date: 2026-06-08

## Current Execution Path

```text
Vercel React app
  src/pages/BodyDiscoverySurvey.tsx
  -> src/config/api.ts
  -> POST https://klps-lema-production.up.railway.app/api/research
  -> Railway Express backend
  -> multipart/form-data parser
  -> payload JSON + voice_0..voice_n files
  -> Cloudflare R2 upload
  -> PostgreSQL inserts
  -> analytics/data-room endpoints
```

The local repository only contains the Vite/React frontend. The route handler, R2 upload service, database service, migrations, and Railway runtime environment are not present in this workspace.

## Verified From This Repo

- Frontend submit path is `POST ${API_BASE}/api/research`.
- `API_BASE` previously hardcoded Railway production. It is now environment-configurable via `VITE_API_BASE_URL`, with Railway as fallback.
- `GET https://klps-lema-production.up.railway.app/api/research` returns `{"success":true}`.
- `GET https://klps-lema-production.up.railway.app/api/research/metrics` returns `404 Cannot GET /api/research/metrics`.
- `README.md` still mentions Cloudflare Pages Functions/D1/KV/R2, while the active frontend posts to Railway. This is architecture drift.

## Data Flow Findings

| Question | Current Answer |
| --- | --- |
| Is `submitResearchResponse()` called? | Not verifiable in this repo. No backend source is present. |
| Which `DATABASE_URL` is used? | Not verifiable locally. Check Railway service variables for the backend handling `/api/research`. |
| Is there more than one database? | Strong possibility. R2 has recent files while queried PostgreSQL tables stop on June 5, which suggests inserts are going elsewhere, failing after upload, or the query points at a different database/schema. |
| Is the frontend calling a different backend? | Yes, compared with README. Frontend calls Railway, not Cloudflare Pages Functions. |
| Are uploads succeeding while DB inserts fail? | Plausible. Recent R2 objects exist but queried DB rows do not. Backend logs around `/api/research` are required to confirm. |
| Are inserts happening in another database? | Plausible. Compare Railway `DATABASE_URL` with the database used for manual SQL queries. |

## Questionnaire Field Audit

| Field | Frontend before | Fix applied |
| --- | --- | --- |
| `age_range` | Sent only as `ageRange` | Now sends `ageRange` and `age_range` |
| `employment_status` | Sent only as `employmentStatus` | Now sends `employmentStatus` and `employment_status` |
| `occupation` | Sent as `occupation` | Stored-name aligned already |
| `life_stage` | Sent only as `lifeStage` | Now sends `lifeStage` and `life_stage` |
| `income_band` | Sent only as `incomeBand` | Now sends `incomeBand` and `income_band` |
| `challenge_frequency` | Sent only as `challengeFrequency` | Now sends `challengeFrequency` and `challenge_frequency` |
| `confidence_level` | Sent only as `confidenceLevel` | Now sends `confidenceLevel` and `confidence_level` |
| `spent_money` | Sent only as `spentMoney` | Now sends `spentMoney` and `spent_money` |
| `spent_money_on` | Not collected | Added optional multi-select and payload fields |
| `would_use` | Sent only as `wouldUse` | Now sends `wouldUse` and `would_use` |
| `would_pay` | Sent only as `wouldPay` | Now sends `wouldPay` and `would_pay` |
| `monthly_price` | Sent only as `monthlyPrice` | Now sends `monthlyPrice` and `monthly_price` |
| `desired_insights` | Not collected | Added optional multi-select and payload fields |
| `other_insight` | Not collected | Added optional free-text field when `Other` is selected |

Low-risk reason: duplicate camelCase/snake_case keys preserve backwards compatibility while supporting DB-column-style parsers.

## Voice Recording Audit

Current frontend sends:

```text
payload.voiceRecordings[]
  questionKey
  questionText
  durationSeconds

multipart files:
  voice_0 = frustration.webm
  voice_1 = impact.webm
  voice_2 = current_solutions.webm
  voice_3 = ideal_solution.webm
```

If historical DB records contain `recordings/temp/0.webm` while R2 contains generated filenames, the likely causes are:

- Old backend inserted placeholder object keys before upload finalisation.
- Upload service changed from temp keys to generated object keys, but DB insert still stores the pre-upload key.
- R2 upload succeeds and returns the real key, but the returned key is not passed into the `voice_recordings` insert.
- Insert failure occurs after upload, leaving R2 objects with no DB rows.

Recommended invariant:

```text
voice_recordings.object_key must equal the exact R2 key returned by uploadObject()
voice_recordings.storage_bucket must identify the bucket/environment
voice_recordings.duration_seconds must come from frontend metadata and be nullable
```

Recommended columns:

```sql
alter table voice_recordings add column if not exists storage_provider text default 'cloudflare_r2';
alter table voice_recordings add column if not exists storage_bucket text;
alter table voice_recordings add column if not exists object_key text;
alter table voice_recordings add column if not exists original_filename text;
alter table voice_recordings add column if not exists content_type text;
alter table voice_recordings add column if not exists duration_seconds numeric;
alter table voice_recordings add column if not exists upload_status text default 'uploaded';
```

## Analytics Foundation

Added SQL analytics definitions in `database/research_analytics.sql`:

- `research_top_body_areas`
- `research_top_concerns`
- `research_challenge_frequency`
- `research_confidence_levels`
- `research_willingness_to_pay`
- `research_money_spent`
- `research_money_spent_on`
- `research_employment_status`
- `research_income_bands`
- `research_life_stage`
- `research_desired_insights`
- `research_metrics_summary`

Example investor-safe outputs:

- `% reporting bloating`: query `research_top_concerns where concern = 'Bloating'`
- `% willing to pay`: `research_metrics_summary.would_pay_percent`
- `% who have spent money`: `research_metrics_summary.spent_money_percent`
- `average confidence level`: `research_metrics_summary.average_confidence_level`
- most requested insights: `research_desired_insights order by responses desc`

## Backend Endpoint Implementation

The production backend should add `GET /api/research/metrics`. It must return aggregate data only.

Reference Express service:

```ts
import { Router } from "express";
import { pool } from "../db/pool";

export const researchRouter = Router();

researchRouter.get("/metrics", async (_req, res, next) => {
  try {
    const summary = await pool.query("select * from research_metrics_summary");
    const topConcerns = await pool.query("select * from research_top_concerns limit 5");
    const topBodyAreas = await pool.query("select * from research_top_body_areas limit 5");
    const desiredInsights = await pool.query("select * from research_desired_insights limit 5");

    const row = summary.rows[0] || {};

    res.json({
      participants: Number(row.participants || 0),
      topConcern: row.top_concern || null,
      topConcernPercent: Number(row.top_concern_percent || 0),
      topBodyArea: row.top_body_area || null,
      topBodyAreaPercent: Number(row.top_body_area_percent || 0),
      spentMoneyPercent: Number(row.spent_money_percent || 0),
      wouldPayPercent: Number(row.would_pay_percent || 0),
      averageConfidenceLevel: row.average_confidence_level == null
        ? null
        : Number(row.average_confidence_level),
      topConcerns: topConcerns.rows,
      topBodyAreas: topBodyAreas.rows,
      desiredInsights: desiredInsights.rows,
    });
  } catch (error) {
    next(error);
  }
});
```

Mounting:

```ts
app.use("/api/research", researchRouter);
```

## Transcription Architecture

Recommended path:

```text
R2 audio object
  -> queued transcription job
  -> OpenAI audio transcription
  -> research_transcripts
  -> insight extraction job
  -> research_insights
  -> aggregate dashboard views
```

Use batch/background jobs rather than transcribing during survey submission. The submission endpoint should stay fast and reliable: validate payload, upload files, insert DB rows, enqueue jobs, return success.

Recommended tables:

```sql
create table if not exists research_transcripts (
  id uuid primary key default gen_random_uuid(),
  voice_recording_id uuid not null references voice_recordings(id) on delete cascade,
  provider text not null default 'openai',
  model text not null,
  transcript_text text not null,
  language text,
  confidence numeric,
  status text not null default 'completed',
  created_at timestamptz not null default now()
);

create table if not exists research_insights (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id) on delete set null,
  survey_response_id uuid references survey_responses(id) on delete cascade,
  voice_recording_id uuid references voice_recordings(id) on delete set null,
  insight_type text not null,
  theme text not null,
  quote text,
  sentiment text,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

Practical model recommendation:

- Use OpenAI transcription for WebM audio.
- Store transcript text and model metadata.
- Extract themes/quotes in a second pass with a strict JSON schema.
- Queue jobs with BullMQ/Redis, Cloudflare Queues, or a simple PostgreSQL `research_jobs` table if volume is still low.

Cost control:

- Transcribe only completed survey submissions.
- Batch during off-peak if realtime insight is not needed.
- Limit insight extraction to one structured call per participant after all four recordings are transcribed.
- Keep raw audio in R2, but never expose signed URLs to investor dashboards.

## Investor Insight Engine

Convert responses into four investor evidence types:

- Statistics: SQL views over structured survey fields.
- Quotes: transcript snippets approved for anonymised investor use.
- Themes: extracted categories such as bloating, confidence, cycle unpredictability, clothing fit, money spent.
- Value proposition evidence: generated summary claims with source counts and sample quotes.

Suggested pipeline:

```text
survey_responses + research_transcripts
  -> structured insight extraction
  -> research_insights
  -> aggregate views
  -> /api/research/metrics
  -> Data Room / Investor dashboard
```

## Problems Discovered

1. Active frontend/backend architecture differs from README.
2. `API_BASE` was hardcoded, making accidental backend/database mismatch more likely.
3. Questionnaire payload used camelCase while requested DB fields are snake_case.
4. `spent_money_on`, `desired_insights`, and `other_insight` were not collected.
5. `/api/research/metrics` does not exist on the current Railway backend.
6. Backend source is not present in this workspace, so DB insert behavior and `DATABASE_URL` cannot be verified locally.

## Fixes Applied

1. Restored Vercel SPA rewrite in `vercel.json` in the previous pass.
2. Made `API_BASE` configurable with `VITE_API_BASE_URL`.
3. Added the missing optional questionnaire fields.
4. Added snake_case payload aliases for backend compatibility.
5. Added production SQL analytics views in `database/research_analytics.sql`.
6. Documented a safe `/api/research/metrics` backend implementation.

## Remaining Risks

- Railway may be connected to a different PostgreSQL database than the one being queried manually.
- The backend may upload to R2 before opening a DB transaction, creating orphaned audio on DB failure.
- The backend may store placeholder object keys instead of actual R2 keys.
- If Vercel does not define `VITE_API_BASE_URL`, it will still use the Railway fallback.
- SQL views assume the named columns exist and JSON fields are `jsonb`.

## Next 30 Days

1. Open Railway variables and compare `DATABASE_URL` against the database used for manual SQL queries.
2. Pull the backend repo into the workspace and audit `/api/research` line by line.
3. Add structured logs: `request_id`, `participant_id`, `survey_response_id`, `r2_object_key`, `db_insert_status`.
4. Run `database/research_analytics.sql` against staging, then production.
5. Implement `GET /api/research/metrics`.
6. Add a reconciliation job: R2 objects without DB rows, DB rows without R2 objects.

## Next 100 Participants

1. Require successful DB insert before returning survey success.
2. Track consent and anonymisation status explicitly.
3. Add transcription jobs for every completed recording.
4. Add founder-only QA view for submission health: submissions per day, upload failures, insert failures, transcription status.
5. Review top themes weekly and update investor evidence manually before automating claims.

## Next 1,000 Participants

1. Move analytics into materialized views refreshed on schedule.
2. Add cohort segmentation by age range, life stage, employment status, income band, and paid intent.
3. Add quote approval workflow before investor display.
4. Add data retention and deletion workflows.
5. Add automated insight generation with human review for investor-facing claims.
