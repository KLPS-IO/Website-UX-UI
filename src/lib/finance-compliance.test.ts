import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

test("dashboard compliance reads and refresh remain separate contracts",()=>{
  const repository=readFileSync(path.resolve("src/repositories/financeComplianceRepository.ts"),"utf8");
  assert.match(repository,/overview:async\(\).*\/api\/finance\/compliance/);
  assert.match(repository,/refresh:async\(\).*\/api\/finance\/actions\/refresh.*method:"POST"/s);
});

test("dashboard shows readiness, remaining days, explicit refresh and all-actions navigation",()=>{
  const panel=readFileSync(path.resolve("src/components/finance/FinanceCompliancePanel.tsx"),"utf8");
  assert.match(panel,/readiness_state/);assert.match(panel,/days remaining/);assert.match(panel,/>Refresh</);assert.match(panel,/View all Finance Actions/);
});

test("VAT ledger accepts period and expense action deep links",()=>{
  const ledger=readFileSync(path.resolve("src/pages/Finance.vat-ledger.tsx"),"utf8");
  assert.match(ledger,/searchParams\.get\("period"\)/);assert.match(ledger,/searchParams\.get\("expense"\)/);assert.match(ledger,/edit\(row\)/);
});
