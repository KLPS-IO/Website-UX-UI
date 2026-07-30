import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

test("Mission Control distinguishes calculated recommendations from saved missions", () => {
  const page = source("src/pages/growth/GrowthPages.tsx");
  assert.match(page, /recommended_candidate/);
  assert.match(page, /Recommended next action/);
  assert.match(page, /Today’s saved mission/);
  assert.match(page, /Use suggested mission/);
  assert.match(page, /acceptMissionCandidate/);
  assert.match(page, /Dismiss for now/);
  assert.match(page, /dismissMissionCandidate/);
});

test("Mission completion uses outcome-aware API and preserves founder controls", () => {
  const page = source("src/pages/growth/GrowthPages.tsx");
  assert.match(page, /growthService\.completeMission/);
  assert.match(page, /mission_completion_confirmation_required/);
  assert.match(page, /Confirm manual close/);
  assert.match(page, /manual_close_reason/);
  for (const control of ["Mark complete", "Skip", "Reschedule"]) assert.match(page, new RegExp(control));
});

test("growth service exposes candidate acceptance and outcome completion routes", () => {
  const service = source("src/services/growth/growth.service.ts");
  assert.match(service, /\/api\/growth\/mission-candidates\/accept/);
  assert.match(service, /\/api\/growth\/mission-candidates\/dismiss/);
  assert.match(service, /\/api\/growth\/missions\/\$\{id\}\/complete/);
});

test("generic expected-outcome placeholder is no longer created", () => {
  const page = source("src/pages/growth/GrowthPages.tsx");
  assert.doesNotMatch(page, /A recorded, reviewable growth action\./);
  assert.match(page, /A founder-defined growth priority completed with its outcome recorded\./);
});
