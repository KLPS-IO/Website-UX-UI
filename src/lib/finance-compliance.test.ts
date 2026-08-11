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

test("VAT filing evidence uses a fixed canonical filing target and controlled completeness",()=>{
  const page=readFileSync("src/pages/Finance.vat-filings.tsx","utf8");
  const types=readFileSync("src/types/evidence.ts","utf8");
  const documents=readFileSync("src/pages/FInance.documents.tsx","utf8");
  assert.match(types,/"vat_filing"/);assert.match(types,/hmrc_submitted_vat_return/);assert.match(types,/vat_return_submission_confirmation/);assert.match(types,/vat_return_calculation_export/);
  assert.match(page,/linked_entity_type:"vat_filing"/);assert.match(page,/linked_entity_id:filing\.id/);assert.match(page,/Evidence pack: \{complete\?"COMPLETE":"INCOMPLETE"\}/);
  assert.match(page,/filed VAT return summary/i);assert.match(page,/window\.confirm/);assert.match(page,/immutable filing will not be changed/);
  assert.match(documents,/Finance → VAT Filings →/);assert.match(documents,/filingEvidenceIds/);
});
