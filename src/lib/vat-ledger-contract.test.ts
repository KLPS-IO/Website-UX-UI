import assert from "node:assert/strict";
import test from "node:test";
import { normalizeVatLedgerRow, normalizeVatLedgerRows } from "./vat-ledger-contract.ts";

test("normalizes no VAT records", () => {
  assert.deepEqual(normalizeVatLedgerRows(undefined), []);
  assert.deepEqual(normalizeVatLedgerRows([]), []);
});

test("preserves a complete VAT record", () => {
  const conflict={stored_vat_period_id:"stored",effective_tax_point_date:"2026-07-20",date_derived_vat_period_id:"next",date_derived_vat_period_source:"derived",date_derived_matching_period_ids:["next"]};
  const row = normalizeVatLedgerRow({ id: "complete", name: "Purchase", supplier_name: "Supplier", category: "Other", currency: "GBP", warnings: ["review"], evidence_files: [{ id: "invoice", filename: "invoice.pdf", type: "full_vat_invoice" }], adjustments: [],vat_period_date_conflict:conflict });
  assert.equal(row.supplier_name, "Supplier");
  assert.deepEqual(row.warnings, ["review"]);
  assert.equal(row.evidence_files[0].filename, "invoice.pdf");
  assert.deepEqual(row.vat_period_date_conflict,conflict);
});

test("normalizes historical partial records, missing links, and optional arrays", () => {
  const row = normalizeVatLedgerRow({ id: "historical", gross_amount: "10", adjustments: [{ id: "refund", reason: null }] });
  assert.equal(row.name, null);
  assert.equal(row.supplier_name, null);
  assert.equal(row.notes, null);
  assert.deepEqual(row.warnings, []);
  assert.deepEqual(row.evidence_files, []);
  assert.deepEqual(row.adjustments?.[0].evidence_files, []);
});

test("keeps duplicate-compatible historical records as separate rows", () => {
  const rows = normalizeVatLedgerRows([
    { id: "first", supplier_name: "Same", transaction_date: "2025-05-08", gross_amount: "10" },
    { id: "second", supplier_name: "Same", transaction_date: "2025-05-08", gross_amount: "10" },
  ]);
  assert.deepEqual(rows.map((row) => row.id), ["first", "second"]);
  assert.ok(rows.every((row) => row.warnings.length === 0 && row.evidence_files.length === 0));
});
