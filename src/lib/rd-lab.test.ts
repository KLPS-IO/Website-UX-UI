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
