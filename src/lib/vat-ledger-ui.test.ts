import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { formatDateOnlyUk } from "./safe-date.ts";
import { authoritativeRowsAfterMutation,calculatedGbpGross, filterVatLedgerRows, foreignCurrencyWarning, formatVatPeriodLabel, hasUnsavedVatEntry, vatPeriodDisplay, warningCopy } from "./vat-ledger-ui.ts";
import type { VatLedgerRow } from "../types/vat-ledger.ts";

const row=(overrides:Partial<VatLedgerRow>):VatLedgerRow=>({id:"1",name:"Expense",supplier_name:"Supplier",category:"Other",transaction_date:"2025-05-08",currency:"GBP",net_amount:null,vat_amount:null,gross_amount:"10.00",vat_rate:null,reimbursement_status:null,evidence_status:"To Evidence",evidence_files:[],warnings:[],notes:null,created_at:"",updated_at:"",...overrides});

test("UK VAT period labels preserve date-only calendar values",()=>{
  assert.equal(formatVatPeriodLabel({start_date:"2025-05-08",end_date:"2026-04-30"}),"8 May 2025 to 30 April 2026");
});
test("UK VAT period labels preserve midnight UTC and offset timestamp dates",()=>{
  assert.equal(formatDateOnlyUk("2026-05-01T00:00:00.000Z"),"1 May 2026");
  assert.equal(formatDateOnlyUk("2026-07-31T23:30:00-08:00"),"31 July 2026");
  assert.equal(formatVatPeriodLabel({start_date:"2026-05-01T00:00:00.000Z",end_date:"2026-07-31T00:00:00.000Z"}),"1 May 2026 to 31 July 2026");
});
test("missing and invalid VAT period dates use a safe fallback",()=>{
  assert.equal(formatDateOnlyUk(undefined),"Not confirmed");
  assert.equal(formatDateOnlyUk("31/07/2026"),"Not confirmed");
  assert.equal(formatVatPeriodLabel({start_date:"bad",end_date:"2026-07-31"}),"Not confirmed");
});
test("supplier, review and evidence filters combine and supplier matching is partial and case-insensitive",()=>{
  const rows=[row({id:"a",supplier_name:"Acme Limited",vat_review_status:"pending_review",evidence_coverage:"no_evidence"}),row({id:"b",supplier_name:"Other",vat_review_status:"review_complete",evidence_coverage:"vat_invoice_present"})];
  assert.deepEqual(filterVatLedgerRows(rows,{supplier:"CME",reviewStatus:"pending_review",evidenceStatus:"no_evidence"}).map(item=>item.id),["a"]);
  assert.deepEqual(filterVatLedgerRows(rows,{supplier:"",reviewStatus:"review_complete",evidenceStatus:"vat_invoice_present"}).map(item=>item.id),["b"]);
});
test("foreign currency validation accepts a rate path or complete manual GBP path",()=>{
  assert.equal(foreignCurrencyWarning({currency:"GBP"}),null);
  assert.match(foreignCurrencyWarning({currency:"EUR",gross_amount:"10",exchange_rate:"0.85"})??"",/exchange rate/);
  assert.equal(foreignCurrencyWarning({currency:"EUR",gross_amount:"10",exchange_rate:"0.85",gbp_net_amount:"7",gbp_vat_amount:"1.50",gbp_gross_amount:"8.50"}),null);
  assert.equal(calculatedGbpGross("10","0.85"),"8.50");
  assert.equal(foreignCurrencyWarning({currency:"EUR",gbp_net_amount:"7",gbp_vat_amount:"1.50",gbp_gross_amount:"8.50",notes:"Manual conversion reviewed"}),null);
  assert.match(foreignCurrencyWarning({currency:"EUR",gbp_net_amount:"7",gbp_vat_amount:"1.50",gbp_gross_amount:"8.50"})??"",/review note/);
  assert.match(foreignCurrencyWarning({currency:"EUR",gbp_net_amount:"7",gbp_gross_amount:"8.50",notes:"Incomplete"})??"",/all GBP values/);
  assert.match(foreignCurrencyWarning({currency:"EUR",gbp_net_amount:"7",gbp_vat_amount:"2",gbp_gross_amount:"8.50",notes:"Mismatched"})??"",/review note/);
  assert.match(foreignCurrencyWarning({currency:"EUR",gross_amount:"10"})??"",/exchange rate/);
});
test("successful mutation waits for authoritative ledger rows before replacing stale warnings",async()=>{
  const stale=row({id:"edited",warnings:["foreign_currency_without_conversion"],currency:"EUR"});
  const refreshed=row({id:"edited",warnings:["pending_vat_treatment"],currency:"EUR",gbp_net_amount:"8.00",gbp_vat_amount:"2.00",gbp_gross_amount:"10.00",notes:"Manual conversion reviewed"});
  const order:string[]=[];
  const rows=await authoritativeRowsAfterMutation(async()=>{order.push("patch");},async()=>{order.push("refetch");return{transactions:[refreshed]};});
  assert.deepEqual(order,["patch","refetch"]);
  assert.deepEqual(rows,[refreshed]);
  assert.ok(!rows[0].warnings.includes("foreign_currency_without_conversion"));
  assert.deepEqual(filterVatLedgerRows(rows,{supplier:"supplier",reviewStatus:"",evidenceStatus:""}),[refreshed]);
  assert.equal(rows.reduce((total,item)=>total+Number(item.gbp_gross_amount??0),0),10);
  assert.ok(stale.warnings.includes("foreign_currency_without_conversion"));
});
test("pending VAT warning has clear controlled copy",()=>assert.equal(warningCopy("pending_vat_treatment"),"VAT treatment has not been reviewed."));
test("derived-period rows are labelled without implying founder confirmation",()=>assert.deepEqual(vatPeriodDisplay({vat_period_start:"2025-05-08",vat_period_end:"2026-04-30",vat_period_source:"derived"}),{label:"8 May 2025 to 30 April 2026",detail:"Date-derived · not explicitly confirmed"}));
test("entry dirtiness ignores controlled defaults and detects any unsaved field or selected period",()=>{
  const empty={payment_date:"",invoice_date:"",supplier_name:"",gross_amount:"",description:"",currency:"GBP",exchange_rate:"",gbp_net_amount:"",gbp_vat_amount:"",gbp_gross_amount:"",notes:"",vat_treatment:"pending_review",vat_review_status:"pending_review",vat_period_id:""};
  assert.equal(hasUnsavedVatEntry(empty),false);
  assert.equal(hasUnsavedVatEntry({...empty,supplier_name:"IONOS"}),true);
  assert.equal(hasUnsavedVatEntry({...empty,vat_period_id:"period-id"}),true);
  assert.equal(hasUnsavedVatEntry({...empty,currency:"EUR"}),true);
});
test("inline entry card opens on demand and closes without persistence",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  assert.match(page,/if\(hasUnsavedVatEntry\(form\)&&!window\.confirm\("Close this unsaved entry\? Nothing will be saved\."\)\)return;resetForm\(\);setEntryOpen\(false\)/);
  assert.match(page,/>Close<\/button><button className="rounded-lg bg-brand-orange/);
  assert.match(page,/>New entry<\/button>/);
  assert.match(page,/setEditingId\(row\.id\);setFormError\(""\);setEntryOpen\(true\)/);
  assert.match(page,/setForm\(emptyForm\);setEditingId\(null\);setSuggestion\(null\);setFormError\(""\)/);
  assert.doesNotMatch(page,/Close[\s\S]{0,120}(archive|update)\(/);
});
