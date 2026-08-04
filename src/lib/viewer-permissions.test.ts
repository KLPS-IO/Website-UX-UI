/// <reference types="node" />
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { normaliseViewerPermissions } from "./viewer-permissions.ts";

test("founder_admin role receives MTD export access",()=>assert.deepEqual(normaliseViewerPermissions({},"founder_admin"),{isFounderAdmin:true,canWriteFinance:true}));
test("backend is_admin authority receives MTD export access despite a non-matching role",()=>assert.deepEqual(normaliseViewerPermissions({is_admin:true},"authorised_viewer"),{isFounderAdmin:true,canWriteFinance:true}));
test("generic founder role does not receive MTD export access",()=>assert.deepEqual(normaliseViewerPermissions({},"founder"),{isFounderAdmin:false,canWriteFinance:true}));
test("generic admin role without explicit backend authority does not receive MTD export access",()=>assert.deepEqual(normaliseViewerPermissions({},"admin"),{isFounderAdmin:false,canWriteFinance:true}));
test("ordinary authorised finance viewer does not receive MTD export access",()=>assert.deepEqual(normaliseViewerPermissions({},"authorised_viewer"),{isFounderAdmin:false,canWriteFinance:false}));
test("missing viewer signals are safe and deny MTD export access",()=>assert.deepEqual(normaliseViewerPermissions({},null),{isFounderAdmin:false,canWriteFinance:false}));
test("existing camel-case admin signal retains finance write behaviour without broadening MTD access",()=>assert.deepEqual(normaliseViewerPermissions({isAdmin:true},null),{isFounderAdmin:false,canWriteFinance:true}));
test("MTD trigger and dialog use the same normalized founder-admin condition",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  assert.equal(page.match(/viewer\?\.isFounderAdmin/g)?.length,2);
  assert.doesNotMatch(page,/viewer\?\.role==="founder_admin"/);
});
