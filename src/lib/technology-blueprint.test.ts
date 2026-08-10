import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

test("Technology Blueprint extends the authenticated Data Room category and route", () => {
  const room = readFileSync(path.resolve("src/pages/DataRoom.tsx"), "utf8"),
    app = readFileSync(path.resolve("src/App.tsx"), "utf8"),
    page = readFileSync(
      path.resolve("src/pages/DataRoomTechnologyBlueprint.tsx"),
      "utf8",
    );
  assert.match(room, /"Technology"/);
  assert.match(room, /View Blueprint/);
  assert.match(app, /data-room\/technology\/mvp1-blueprint/);
  assert.match(page, /authenticatedApi\("\/api\/data-room\/documents"\)/);
});
test("web and selectable-text PDF use one canonical structured publication", () => {
  const page = readFileSync(
      path.resolve("src/pages/DataRoomTechnologyBlueprint.tsx"),
      "utf8",
    ),
    exporter = readFileSync(
      path.resolve("src/features/technology-blueprint/exportBlueprintPdf.ts"),
      "utf8",
    );
  assert.match(page, /TechnicalPublication document=\{mvp1Blueprint\}/);
  assert.match(page, /exportBlueprintPdf\(mvp1Blueprint\)/);
  assert.match(exporter, /pdf\.text/);
  assert.match(exporter, /Confidential — Investor Data Room/);
});
test("publication keeps evidence states and rejects unsupported generated claims", () => {
  const content = readFileSync(
    path.resolve("src/features/technology-blueprint/mvp1Blueprint.ts"),
    "utf8",
  );
  for (const state of ["PROVEN", "OBSERVED", "IN DEVELOPMENT", "PLANNED"])
    assert.match(content, new RegExp(state));
  for (const claim of [
    ">20 dB",
    "<1% BLE",
    "95% connection",
    "R² 0.92",
    "R² 0.96",
    "SoftDevice S140",
    "Terraform",
    "GraphQL",
    "compression garment",
  ])
    assert.doesNotMatch(content, new RegExp(claim));
  assert.match(content, /Arduino Nano 33 BLE Sense Rev2/);
  assert.match(content, /doesNotEstablish|does not establish/i);
});
test("publication CSS includes mobile, A4 print and hidden navigation rules", () => {
  const css = readFileSync(
    path.resolve("src/features/technology-blueprint/blueprint.css"),
    "utf8",
  );
  assert.match(css, /@media\s*\(max-width:\s*700px\)/);
  assert.match(css, /@media print/);
  assert.match(css, /\.blueprint-nav\s*\{[\s\S]*?display:\s*none/);
  assert.match(css, /page-break-after:\s*always/);
});
test("every intended figure uses a statically verified repository asset with no failure placeholder", () => {
  const content = readFileSync(
      path.resolve("src/features/technology-blueprint/mvp1Blueprint.ts"),
      "utf8",
    ),
    renderer = readFileSync(
      path.resolve(
        "src/features/technology-blueprint/TechnicalPublication.tsx",
      ),
      "utf8",
    ),
    exporter = readFileSync(
      path.resolve("src/features/technology-blueprint/exportBlueprintPdf.ts"),
      "utf8",
    );
  assert.match(content, /@\/assets\/Tech Spech 2026\/publication/);
  assert.doesNotMatch(
    renderer,
    /image unavailable|Canonical evidence image available/i,
  );
  assert.doesNotMatch(exporter, /image unavailable during export/i);
  assert.match(renderer, /blueprint-lightbox/);
  assert.match(renderer, /section\.evolutionSteps/);
  assert.match(renderer, /SystemArchitecture/);
  assert.match(exporter, /section\.layoutVariant === "architecture"/);
  assert.match(exporter, /getImageProperties/);
  assert.match(exporter, /section\.evolutionSteps/);
});
test("second-pass Blueprint uses a varied editorial model without repeating evidence figures", () => {
  const content = readFileSync(
      path.resolve("src/features/technology-blueprint/mvp1Blueprint.ts"),
      "utf8",
    ),
    renderer = readFileSync(
      path.resolve("src/features/technology-blueprint/TechnicalPublication.tsx"),
      "utf8",
    );
  for (const title of [
    "The hardest sensor to build",
    "What if the garment was the interface?",
    "What is the signal today?",
    "What still needs proving?",
    "Where are we really?",
  ])
    assert.match(content, new RegExp(title.replace(/[?]/g, "\\?")));
  assert.doesNotMatch(content, /"Engineering Question"/);
  const defined = [...content.matchAll(/figureNumber: "([0-9.]+)"/g)].map(
    (match) => match[1],
  );
  const used = [
    ...[...content.matchAll(/figureIds: \[([\s\S]*?)\]/g)].flatMap((match) =>
      [...match[1].matchAll(/"([0-9.]+)"/g)].map((id) => id[1]),
    ),
    ...[...content.matchAll(/figureId: "([0-9.]+)"/g)].map(
      (match) => match[1],
    ),
  ];
  assert.equal(defined.length, 18);
  assert.equal(new Set(used).size, used.length);
  assert.deepEqual(new Set(used), new Set(defined));
  assert.match(renderer, /blueprint-layout-/);
  assert.match(renderer, /questionLabel/);
});
