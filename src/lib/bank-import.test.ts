import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("bank import UI requires explicit provenance and keeps accounting promotion manual",()=>{
  const page=readFileSync("src/pages/Finance.bank-imports.tsx","utf8");
  assert.match(page,/Provider environment/);
  assert.match(page,/value="sandbox"/);assert.match(page,/value="production"/);
  assert.match(page,/Imports do not create expenses/);
  assert.match(page,/No automatic accounting writes/);
  assert.doesNotMatch(page,/createHistoricalExpense|vatLedgerRepository\.create/);
});

test("Monzo upload uses multipart FormData and never places a file in JSON",()=>{
  const repository=readFileSync("src/repositories/bankImportRepository.ts","utf8");
  assert.match(repository,/new FormData\(\)/);assert.match(repository,/body\.append\("file",file\)/);
  assert.doesNotMatch(repository,/JSON\.stringify\([^)]*file/);
});
