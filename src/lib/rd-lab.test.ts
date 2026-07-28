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
