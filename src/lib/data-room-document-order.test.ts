import assert from "node:assert/strict";
import test from "node:test";
import { newestVersionFirst } from "./data-room-document-order.ts";

test("data-room technical documents are ordered by newest semantic version", () => {
  const ordered = newestVersionFirst([
    { filename: "KLPS Technology Blueprint v1.0.pdf" },
    { filename: "KLPS Technology Blueprint v2.0.pdf" },
    { filename: "KLPS Technology Blueprint v1.1.pdf" },
  ]);

  assert.deepEqual(
    ordered.map((document) => document.filename),
    [
      "KLPS Technology Blueprint v2.0.pdf",
      "KLPS Technology Blueprint v1.1.pdf",
      "KLPS Technology Blueprint v1.0.pdf",
    ],
  );
});

test("explicit versions win and equal versions use the latest update date", () => {
  const ordered = newestVersionFirst([
    { filename: "Earlier.pdf", version: "1.0", updatedAt: "2026-08-10" },
    { filename: "Later.pdf", version: "1.0", updated_at: "2026-09-30" },
    { filename: "Next.pdf", version: "2.0", updatedAt: "2026-09-01" },
  ]);

  assert.deepEqual(ordered.map((document) => document.filename), [
    "Next.pdf",
    "Later.pdf",
    "Earlier.pdf",
  ]);
});
