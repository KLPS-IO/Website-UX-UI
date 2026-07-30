/// <reference types="node" />
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = (path: string) =>
  readFileSync(join(process.cwd(), path), "utf8");

test("R&D routes separate public, login and protected workspace entry points", () => {
  const app = source("src/App.tsx");
  assert.match(app, /path="\/rd-lab"/);
  assert.match(app, /path="\/rd-lab\/login"/);
  assert.match(app, /path="\/rd-lab\/work-packages\/wp1-textile-sensing"/);
});

test("founder login uses standard autocomplete and no browser token storage", () => {
  const login = source("src/components/auth/FounderPasswordLogin.tsx");
  const service = source("src/services/rd-lab/rd-lab.service.ts");
  assert.match(login, /autoComplete="email"/);
  assert.match(login, /autoComplete="current-password"/);
  assert.doesNotMatch(`${login}${service}`, /localStorage|sessionStorage/);
});

test("Growth OS uses the shared founder password login and protected session gate", () => {
  const app = source("src/App.tsx");
  const growth = source("src/pages/growth/GrowthApp.tsx");
  const login = source("src/pages/growth/GrowthLogin.tsx");
  assert.match(app, /path="\/innovation-lab\/growth\/login"/);
  assert.match(login, /FounderPasswordLogin/);
  assert.match(growth, /rdLabService\s*\.\s*session\(\)/);
  assert.match(growth, /\/innovation-lab\/growth\/login/);
});

test("Growth OS Mission Control and Strategy use persisted canonical endpoints", () => {
  const pages = source("src/pages/growth/GrowthPages.tsx");
  const service = source("src/services/growth/growth.service.ts");
  assert.match(service, /\/api\/growth\/mission-control/);
  assert.match(service, /\/api\/growth\/strategy/);
  assert.match(service, /\/api\/growth\/\$\{resource\}/);
  assert.match(pages, /Start mission/);
  assert.match(pages, /Mark complete/);
  assert.match(pages, /Skip/);
  assert.match(pages, /Reschedule/);
  assert.match(pages, /No current action is supported by saved Growth OS data/);
  assert.match(pages, /beforeunload/);
  assert.match(pages, /Strategy could not be saved/);
  assert.doesNotMatch(pages, /Question-based videos currently outperform/);
  assert.doesNotMatch(pages, /Phase 1 · Static coach/);
});

test("Growth OS Community reuses canonical waitlist data through founder APIs", () => {
  const service = source("src/services/growth/growth.service.ts");
  const community = source("src/components/growth/CommunityWorkspace.tsx");
  assert.match(service, /\/api\/growth\/community\/summary/);
  assert.match(service, /\/api\/growth\/community\/people/);
  assert.match(community, /Future waitlist sign-ups will appear automatically/);
  assert.match(community, /Archive Growth profile/);
  assert.match(community, /Nothing was sent/);
  assert.doesNotMatch(community, /fake|demo person/i);
});

test("Growth OS social connections use the authenticated backend and expose no secrets", () => {
  const service = source("src/services/growth/growth.service.ts");
  const connections = source("src/components/growth/SocialConnections.tsx");
  const pages = source("src/pages/growth/GrowthPages.tsx");
  assert.match(service,/\/api\/growth\/social\/providers/);
  assert.match(service,/\/api\/growth\/social\/oauth\/.*\/start/);
  assert.match(connections,/Official APIs only/);
  assert.match(connections,/Developer setup checklist/);
  assert.match(connections,/Setup required/);
  assert.match(pages,/<SocialConnections \/>/);
  assert.doesNotMatch(connections,/client_secret|access_token|refresh_token/i);
  assert.doesNotMatch(service,/localStorage.*social|sessionStorage.*social/i);
});

test("LinkedIn OAuth return refreshes identity connection and removes result parameters", () => {
  const oauth = source("src/lib/growth-social-oauth-return.ts");
  const connections = source("src/components/growth/SocialConnections.tsx");
  assert.match(oauth,/processLinkedInOAuthReturn/);
  assert.match(oauth,/await refreshConnections\(\)/);
  assert.match(oauth,/replaceHistory\(removeSocialOAuthResultParameters\(href\)\)/);
  assert.match(connections,/window\.history\.replaceState/);
  assert.match(connections,/Identity connected/);
  assert.match(connections,/LinkedIn member identity only\. Publishing is not enabled\./);
  assert.doesNotMatch(`${oauth}${connections}`,/localStorage|sessionStorage/);
});

test("workspace preserves honest empty, loading, unauthorised and unknown-money states", () => {
  const workspace = source("src/pages/rd-lab/RdLabWorkspace.tsx");
  assert.match(workspace, /Checking secure founder session/);
  assert.match(workspace, /\[401,\s*403\]/);
  assert.match(workspace, /No .* recorded/);
  assert.match(
    workspace,
    /formatMoney\(summary\?\.(minimum|likely|maximum)_amount\)/,
  );
  assert.match(workspace, /procurementProgress/);
});

test("Procurement Progress renders canonical stages responsively without percentages", () => {
  const component = source("src/components/rd-lab/ProcurementProgress.tsx");
  const workspace = source("src/pages/rd-lab/RdLabWorkspace.tsx");
  assert.match(component, /Loading procurement progress/);
  assert.match(component, /Procurement progress is not available/);
  assert.match(component, /progress\.current_stage/);
  assert.match(component, /progress\.next_action/);
  assert.match(component, /progress\.blocking_reason/);
  assert.match(component, /md:grid-cols-7/);
  assert.doesNotMatch(component, /overflow-x/);
  assert.doesNotMatch(
    component,
    /percentage|progress-bar|animate-\[|transition-all/,
  );
  assert.match(workspace, /<ProcurementProgress[\s\S]*compact/);
  assert.match(workspace, /<ProcurementProgress[\s\S]*progress=/);
});

test("WP1 supplier verification is limited to the approved four-organisation sprint", () => {
  const config = source("src/config/rdProcurement.ts");
  const workspace = source("src/pages/rd-lab/RdLabWorkspace.tsx");
  for (const supplier of [
    "University of Manchester / GEIC",
    "Henry Royce Institute",
    "Interactive Wear",
    "Ohmatex",
  ])
    assert.match(config, new RegExp(supplier.replace("/", "\\/")));
  assert.match(workspace, /Select a Sprint 1 organisation/);
  assert.doesNotMatch(workspace, /\["relevant_capability", "Relevant capability"\]/);
});

test("supplier workflow uses the approved sequential statuses and evidence-led notes", () => {
  const config = source("src/config/rdProcurement.ts");
  for (const status of [
    "Research",
    "Verified",
    "Contacted",
    "Discovery Meeting",
    "RFQ Sent",
    "Quote Received",
    "Comparison",
    "Selected",
    "Closed",
  ])
    assert.match(config, new RegExp(`"${status}"`));
  assert.match(config, /Verified:\n/);
  assert.match(config, /Supplier to Confirm:\n/);
  assert.match(config, /Unknown:/);
});

test("supplier interactions, findings and actions remain linked to canonical suppliers", () => {
  const workspace = source("src/pages/rd-lab/RdLabWorkspace.tsx");
  assert.match(workspace, /technical_learning/);
  assert.match(workspace, /commercial_learning/);
  assert.match(workspace, /\["supplier_id", "Supplier", "supplier"\]/);
  assert.match(workspace, /Verified Fact/);
  assert.match(workspace, /Supplier Confirmed/);
  assert.match(workspace, /Founder Assumption/);
  assert.match(workspace, /Reasonable Inference/);
  assert.match(workspace, /Upload linked evidence/);
  assert.match(workspace, /rd_supplier/);
  assert.match(workspace, /rd_rfq/);
  assert.match(workspace, /rd_quotation/);
});

test("linked evidence supports contextual ordering, unlinking and confirmed canonical deletion", () => {
  const workspace = source("src/pages/rd-lab/RdLabWorkspace.tsx");
  const repository = source("src/repositories/evidenceRepository.ts");
  assert.match(workspace, /Order uploaded evidence/);
  assert.match(workspace, /Evidence Date/);
  assert.match(workspace, /Upload Date/);
  assert.match(workspace, /Title \(A–Z\)/);
  assert.match(workspace, /draggable=\{order === "manual"/);
  assert.match(workspace, /Remove Link/);
  assert.match(workspace, /DELETE EVERYWHERE/);
  assert.match(workspace, /rd_work_package/);
  assert.match(workspace, /rd_supplier/);
  assert.match(repository, /evidence-links\/order/);
  assert.match(repository, /confirmation: "DELETE EVERYWHERE"/);
});
