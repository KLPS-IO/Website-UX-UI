import assert from "node:assert/strict";
import test from "node:test";
import { buildDuplicateExpensePayload } from "./vat-ledger-duplicate.ts";
import type { VatLedgerRow } from "../types/vat-ledger.ts";

const sourceExpense = (transactionDate: string): VatLedgerRow => ({
  id: "expense-1",
  name: "Prototype materials",
  supplier_name: "Example supplier",
  description: "Prototype materials",
  category: "R&D Materials",
  transaction_date: transactionDate,
  payment_date: null,
  currency: "GBP",
  net_amount: "10.00",
  vat_amount: "2.00",
  gross_amount: "12.00",
  vat_rate: "0.20",
  reimbursement_status: "not reimbursed",
  evidence_status: "Under Review",
  evidence_files: [],
  warnings: ["review required"],
  notes: "Keep unchanged",
  created_at: "2099-02-16T10:00:00.000Z",
  updated_at: "2099-02-16T10:00:00.000Z",
});

test("duplicate payload normalises an API timestamp without timezone conversion", () => {
  const source = sourceExpense("2099-02-15T00:00:00.000Z");
  const before = structuredClone(source);

  const payload = buildDuplicateExpensePayload(source);

  assert.equal(payload.transaction_date, "2099-02-15");
  assert.equal(payload.payment_date, undefined);
  assert.deepEqual(source, before);
});

test("duplicate payload preserves the timestamp's leading date across an offset", () => {
  const source = sourceExpense("2099-02-15T23:30:00-05:00");

  assert.equal(buildDuplicateExpensePayload(source).transaction_date, "2099-02-15");
});

test("duplicate payload preserves an already-normalised date and expected fields only", () => {
  const source = sourceExpense("2099-02-15");

  const payload = buildDuplicateExpensePayload(source);

  assert.deepEqual(payload, {
    transaction_date: "2099-02-15",
    supplier_name: "Example supplier",
    gross_amount: "12.00",
    description: "Prototype materials (copy)",
    change_reason: "Duplicated historical expense",
  });
  assert.equal("notes" in payload, false);
  assert.equal("warnings" in payload, false);
  assert.equal("vat_amount" in payload, false);
});

test("duplicate payload handles a missing source date according to the required API field", () => {
  const source = sourceExpense("2099-02-15");
  source.transaction_date = null;

  assert.equal(buildDuplicateExpensePayload(source).transaction_date, "");
});

test("duplicate payload preserves a distinct payment date without copying either date",()=>{
  const source=sourceExpense("2099-02-15");
  source.payment_date="2099-02-20";
  const payload=buildDuplicateExpensePayload(source);
  assert.equal(payload.transaction_date,"2099-02-15");
  assert.equal(payload.payment_date,"2099-02-20");
});
