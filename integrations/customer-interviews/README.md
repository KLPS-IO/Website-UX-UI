# Private KLPS customer discovery

Page: `/founder/customer-interviews`. No public navigation link. Requires a server-verified `founder_admin` data-room session. Sign in at `/data-room`, then return to the page. No sensitive notes are saved in browser local storage; drafts remain in memory until an explicit save.

## Scope

A five-minute problem interview comes before any pitch. An optional 5–10 minute comparison covers clothing category, fabric feel, styling, pod/embedded preferences, current routine, insight utility, trust, proximity concerns and wear/maintenance burden. These are hypothetical concept reactions, not tested products. Garment-card order rotates by interview ID; the order is retained.

Private notes require affirmative adult and research consent; voice recordings require separate explicit audio consent; contact and anonymous quote permission are separate. Record no diagnoses, card details or unnecessary identifiers. Participants can withdraw using their interview ID; use the private delete control. Review retention regularly and remove contact details once follow-up is complete. JSON exports include private data and must be restricted.

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

## Recorded interviews (v3)

Core questions each have a microphone, stop, playback and re-record control (3-minute limit). The optional concept discussion has a continuous 10-minute recorder, and the offer discussion a 5-minute recorder. No typed response is required; tap recruitment source, confirm adult/research/audio consent, record answers and save. Narrative fields are optional, collapsed notes. Keep the phone awake and the tab open; unsaved audio is in memory and a navigation warning is shown. Only one recorder can run at a time, and save/tab changes are disabled while it is running.

The browser retains its actual supported audio format (WebM/Opus, MP4 on supported Safari, or Ogg). Uploads use authenticated multipart requests, up to 7 files at 10 MB each. The server validates consent, metadata and file signatures, writes audio to private R2 keys and stores metadata alongside the interview JSON. Playback fetches audio through the founder-authenticated API; public object URLs are not exposed. Deleting an interview also deletes its audio. Failed uploads keep the browser takes for retry. Existing saved audio is preserved when editing without replacement takes.

New records start as `needs review`. Audio is not automatically transcribed. Listen, code the relevant structured answers, and set `reviewed` before they enter the evidence statistics. JSON exports contain metadata and notes, with separate private audio downloads from each record. A synthetic microphone browser check verifies real MediaRecorder output, playback and multipart save without typed answers. API checks additionally cover audio consent, retry deduplication, private playback and audio deletion.

## Transcription and review

The official OpenAI Node SDK runs on the KLPS backend with `gpt-transcribe`. Configure `OPENAI_API_KEY` only in Railway KLPS-CORE variables; it is never sent to the browser. Install the new routes/service via `install.py` and run `transcripts.sql` before deploying. No transcription happens just because an interview is saved. The founder explicitly requests it in Evidence & decisions → interview → Open transcripts → Transcribe saved recordings.

Each recording has a persistent unique job tied to the interview ID, question and exact audio object. A database-backed queue claims work with row locks, stores draft text, and survives process restarts. A 10-minute interrupted-job lease becomes an explicit failure; SDK provider retries are disabled, and failed jobs require an explicit retry to avoid silently repeating a possibly billable request. Missing API keys are shown as a setup state. Existing drafts and approved text are not retranscribed on repeated clicks. Replaced recordings do not expose stale transcripts. Ogg inputs are preserved but currently require conversion before this provider can process them.

GET/POST `/api/research/interviews/:id/transcripts` and PATCH `/api/research/interviews/:id/transcripts/:transcriptId` require the same server-verified founder role as audio playback. Text includes immutable `original_text`, editable `edited_text`, draft/approved status, model, revision and timestamps. Edits use optimistic revision checks; an explicit audio-review checkbox is required by the UI before approval. Approval does not automatically set interview evidence coding to reviewed. User corrections preserve the machine original; edits to an approved transcript return it to draft unless explicitly approved again. Exports contain both versions and status.

Transcript rows reference interviews with ON DELETE CASCADE. Interview deletion removes the audio through the existing authenticated deletion route and removes linked transcripts/jobs when the interview row is deleted. Original source audio stays in R2 until that deletion. Only reviewed interview coding belongs in evidence counts; no automatic symptom, payment or demographic inference is introduced.

Verification: `check-transcription.cjs` uses synthetic providers/storage and covers SDK request shape, no implicit retries, role restrictions, configuration, job deduplication, immutable originals, approval/revision conflicts and stale audio. A PostgreSQL rollback-only check verifies actual queue, unique constraints, approval SQL and deletion cascades. A phone-sized browser check covers transcript editing, original text, approval, unsaved edits and setup states. Real transcription additionally requires a configured, funded API project and an end-to-end trial with consented audio.

## Audio beside transcripts and adapted interviews

Transcript cards display a numbered guide-order recording label, its original guide prompt, exact matching audio player, duration, rewind and speed controls beside the editable text (stacked on phones). They match by question key rather than transcript-generation order. Playback includes the immutable transcript ID; the server checks that the audio object currently served is the one that generated that transcript and rejects stale pairings with HTTP 409. Raw storage keys remain private. Exports are in guide order and include recording label, duration, source guide prompt and an authenticated playback reference.

A recorder-slot label describes where Record was pressed, not the question actually asked or the topic actually covered. Guidance permits neutral follow-ups and skipped/adapted prompts, with the spoken question captured in the clip. Optional notes no longer appear as unanswered when recorded audio exists. Friend practice sessions are pilot records and are excluded from main evidence counts.

Verification includes a three-clip browser fixture supplied in reverse order, matched-player requests with distinct transcript IDs, rewind/playback speed, source-linked exports, phone/desktop layouts and rejection of mismatched audio. API contract tests cover correct, stale and malformed transcript identifiers on audio requests.
