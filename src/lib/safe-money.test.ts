import assert from "node:assert/strict";
import test from "node:test";
import { formatMoney, sumKnownMoney, toFiniteMoney } from "./safe-money.ts";

test("toFiniteMoney accepts finite numbers and database numeric strings", () => {
  assert.equal(toFiniteMoney(18.67), 18.67);
  assert.equal(toFiniteMoney("18.67"), 18.67);
});

test("toFiniteMoney preserves unknown and rejects non-finite values", () => {
  for (const value of [null, undefined, "", "Not confirmed", Number.NaN, Number.POSITIVE_INFINITY, "Infinity"]) {
    assert.equal(toFiniteMoney(value), null);
  }
});

test("sumKnownMoney reports known and excluded values without NaN", () => {
  assert.deepEqual(sumKnownMoney(["10.00", 2, null, "", "unknown"]), {
    amount: 12,
    knownCount: 2,
    excludedUnknownCount: 3,
  });
  assert.deepEqual(sumKnownMoney([null, undefined]), {
    amount: null,
    knownCount: 0,
    excludedUnknownCount: 2,
  });
});

test("export-safe money formatting never renders NaN", () => {
  assert.equal(formatMoney("18.67"), "£18.67");
  assert.equal(formatMoney(0), "£0.00");
  assert.equal(formatMoney(null), "Not confirmed");
  assert.equal(formatMoney(Number.NaN), "Not confirmed");
  assert.equal(formatMoney("not confirmed"), "Not confirmed");
});
