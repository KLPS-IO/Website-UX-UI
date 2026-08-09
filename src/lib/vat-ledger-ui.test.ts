import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { formatDateOnlyUk } from "./safe-date.ts";
import { allowedVatReviewStatuses,authoritativeRowsAfterMutation,buildVatExpensePayload,calculatedGbpGross, filterVatLedgerRows, foreignCurrencyWarning, formatVatPeriodLabel, hasUnsavedVatEntry, resolveEffectiveTaxPointDate, vatPeriodDisplay, vatRateAmountMismatch, vatRatePercentToRatio, vatRateRatioToPercent, vatReviewNextAction, vatSaveErrorMessage, warningCopy, warningSeverityCopy } from "./vat-ledger-ui.ts";
import type { VatLedgerRow } from "../types/vat-ledger.ts";

const row=(overrides:Partial<VatLedgerRow>):VatLedgerRow=>({id:"1",name:"Expense",supplier_name:"Supplier",category:"Other",transaction_date:"2025-05-08",currency:"GBP",net_amount:null,vat_amount:null,gross_amount:"10.00",vat_rate:null,reimbursement_status:null,evidence_status:"To Evidence",evidence_files:[],warnings:[],notes:null,created_at:"",updated_at:"",...overrides});

test("UK VAT period labels preserve date-only calendar values",()=>{
  assert.equal(formatVatPeriodLabel({start_date:"2025-05-08",end_date:"2026-04-30"}),"8 May 2025 to 30 April 2026");
});
test("VAT rate UI uses percentages while the canonical API contract uses decimal fractions",()=>{
  assert.equal(vatRateRatioToPercent("0.20"),"20");
  assert.equal(vatRatePercentToRatio("20"),"0.2");
  assert.equal(vatRatePercentToRatio(""),null);
  assert.throws(()=>vatRatePercentToRatio("101"),/between 0 and 100%/);
});
test("VAT rate mismatch uses the backend monetary tolerance",()=>{
  assert.equal(vatRateAmountMismatch({gbp_net_amount:"4.63",gbp_vat_amount:"0.92",vat_rate:"20",vat_treatment:"standard_rated"}),false);
  assert.equal(vatRateAmountMismatch({gbp_net_amount:"4.63",gbp_vat_amount:"0.89",vat_rate:"20",vat_treatment:"standard_rated"}),true);
  assert.equal(vatRateAmountMismatch({gbp_net_amount:"4.63",gbp_vat_amount:"0.89",vat_rate:"20",vat_treatment:"zero_rated"}),false);
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
test("review-blocked API details are shown as actionable form messages",()=>{
  const error=Object.assign(new Error("Cannot mark VAT review complete"),{code:"vat_review_blocked",payload:{details:{issues:[{code:"vat_rate_missing",severity:"critical",message:"VAT rate is required for this VAT treatment."},{code:"vat_period_unconfirmed",severity:"critical",message:"VAT period must be explicitly confirmed."}]}}});
  assert.equal(vatSaveErrorMessage(error),"Cannot mark VAT review complete:\n- VAT rate is required for this VAT treatment.\n- VAT period must be explicitly confirmed.");
});
test("VAT review states expose only coherent next transitions",()=>{
  assert.deepEqual(allowedVatReviewStatuses("pending_review"),["pending_review","in_review","ready_for_review"]);
  assert.deepEqual(allowedVatReviewStatuses("in_review"),["pending_review","in_review","ready_for_review"]);
  assert.deepEqual(allowedVatReviewStatuses("ready_for_review"),["in_review","ready_for_review","review_complete"]);
  assert.deepEqual(allowedVatReviewStatuses("review_complete"),["in_review","ready_for_review","review_complete"]);
});

test("Review complete remains visible but locked until the saved record is ready",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  assert.match(page,/reviewStatuses\.map/);assert.match(page,/value === "review_complete" && !reviewCompleteAvailable/);
  assert.match(page,/formBaseline\.vat_review_status === "ready_for_review"/);assert.match(page,/formBaseline\.vat_review_status === "review_complete"/);
  assert.match(page,/Review complete becomes available after this record is saved as Ready for review\./);
  assert.match(page,/vatSaveErrorMessage\(e\)/);
});
test("VAT table explains severity and the exact next action",()=>{
  assert.equal(warningSeverityCopy("critical"),"Critical");assert.equal(warningSeverityCopy("review_required"),"Review required");assert.equal(warningSeverityCopy("advisory"),"Advisory");
  assert.equal(vatReviewNextAction({vat_review_status:"ready_for_review",warning_details:[{code:"vat_rate_missing",severity:"critical",message:"VAT rate is required for this VAT treatment."}]}),"VAT rate is required for this VAT treatment.");
  assert.match(vatReviewNextAction({vat_review_status:"ready_for_review",warning_details:[]}),/Mark review complete/);
});
test("derived-period rows are labelled without implying founder confirmation",()=>assert.deepEqual(vatPeriodDisplay({vat_period_start:"2025-05-08",vat_period_end:"2026-04-30",vat_period_source:"derived"}),{label:"8 May 2025 to 30 April 2026",detail:"Date-derived · not explicitly confirmed"}));
test("entry dirtiness ignores controlled defaults and detects any unsaved field or selected period",()=>{
  const empty={transaction_date:"",payment_date:"",invoice_date:"",supplier_name:"",gross_amount:"",description:"",category:"To Classify",payment_source:"",currency:"GBP",exchange_rate:"",gbp_net_amount:"",gbp_vat_amount:"",gbp_gross_amount:"",vat_rate:"",notes:"",vat_treatment:"pending_review",supplier_document_review_status:"pending_review",vat_review_status:"pending_review",vat_period_id:""};
  assert.equal(hasUnsavedVatEntry(empty),false);
  assert.equal(hasUnsavedVatEntry({...empty,supplier_name:"IONOS"}),true);
  assert.equal(hasUnsavedVatEntry({...empty,vat_period_id:"period-id"}),true);
  assert.equal(hasUnsavedVatEntry({...empty,currency:"EUR"}),true);
});

test("accounting classification uses canonical PATCH fields without changing VAT review state",()=>{
  const draft={transaction_date:"2025-10-05",payment_date:"2025-10-05",invoice_date:"2025-10-05",supplier_name:"eBay (UK) Limited",gross_amount:"5.55",description:"Prototype box",category:"To Classify",payment_source:"",currency:"GBP",exchange_rate:"1",gbp_net_amount:"4.63",gbp_vat_amount:"0.92",gbp_gross_amount:"5.55",vat_rate:"20",notes:"",vat_treatment:"standard_rated",supplier_document_review_status:"vat_invoice_confirmed",vat_review_status:"review_complete",vat_period_id:"period-id"};
  const unresolved=buildVatExpensePayload(draft,true);
  assert.equal(unresolved.category,"To Classify");assert.equal(unresolved.payment_source,null);assert.equal(unresolved.vat_rate,"0.2");
  assert.equal(unresolved.vat_treatment,"standard_rated");assert.equal(unresolved.supplier_document_review_status,"vat_invoice_confirmed");assert.equal(unresolved.change_reason,"Founder edited VAT ledger record");
  assert.ok(!("nominal_code" in unresolved));
  for(const source of ["founder_director_funded","paypal","personal_credit_card","company_credit_card","business_bank","other"]){
    assert.equal(buildVatExpensePayload({...draft,category:"Prototype materials/electronics",payment_source:source},true).payment_source,source);
  }
});

test("VAT Ledger exposes founder-editable canonical accounting classification fields",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  assert.match(page,/>Accounting classification/);assert.match(page,/>Purchase category/);assert.match(page,/>Payment source/);
  assert.match(page,/row\.category \?\? "To Classify"/);assert.match(page,/row\.payment_source \?\? ""/);
  assert.match(page,/value=\{form\.category\}[\s\S]{0,120}update\("category"/);assert.match(page,/value=\{form\.payment_source\}[\s\S]{0,120}update\("payment_source"/);
  assert.match(page,/viewer\?\.canWriteFinance && entryOpen/);assert.match(page,/disabled=\{!viewer\?\.canWriteFinance\}/);assert.match(page,/buildVatExpensePayload\(form,Boolean\(editingId\)\)/);
  assert.doesNotMatch(page,/nominal_code/);
});
test("inline editor closes saved records while new entries clear without persistence",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  assert.match(page,/dirty[\s\S]*Close this unsaved entry\? Nothing will be saved\./);
  assert.match(page,/dirty[\s\S]*Clear this unsaved entry\? Nothing will be saved\./);
  assert.match(page,/editingId \? closeForm : clearForm/);
  assert.match(page,/editingId \? "Close" : "Clear form"/);
  assert.match(page,/setFormBaseline\(saved\)/);
  assert.match(page,/setSuggestion\(null\)/);
  assert.doesNotMatch(page,/Close[\s\S]{0,120}(archive|update)\(/);
});

test("effective tax point follows canonical backend date precedence",()=>{
  assert.equal(resolveEffectiveTaxPointDate({invoice_date:"2026-01-03",transaction_date:"2026-01-02",payment_date:"2026-01-01"}),"2026-01-03");
  assert.equal(resolveEffectiveTaxPointDate({invoice_date:"",transaction_date:"2026-01-02",payment_date:"2026-01-01"}),"2026-01-02");
  assert.equal(resolveEffectiveTaxPointDate({invoice_date:"",transaction_date:"",payment_date:"2026-01-01"}),"2026-01-01");
  assert.equal(resolveEffectiveTaxPointDate({invoice_date:"",transaction_date:"",payment_date:""}),"");
});

test("VAT entry fields expose canonical date bindings and focused helper text",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  for(const label of ["Transaction date","Invoice date","Payment date","Effective tax point","Supplier","Gross amount","Transaction description","Currency","Exchange rate","GBP net","GBP VAT","GBP gross","VAT rate","VAT treatment","Review status","VAT period","Internal review notes"])assert.match(page,new RegExp(`>${label}`));
  assert.match(page,/value=\{form\.transaction_date\}[\s\S]{0,100}update\("transaction_date"/);assert.match(page,/value=\{form\.payment_date\}[\s\S]{0,100}update\("payment_date"/);
  assert.doesNotMatch(page,/transaction_date:\s*form\.payment_date|payment_date:\s*form\.transaction_date/);
  assert.match(page,/resolveEffectiveTaxPointDate\(form\)/);assert.match(page,/suggestPeriod\(effectiveTaxPointDate\)/);
  assert.match(page,/suggestion\?\.effective_tax_point_date \?\? effectiveTaxPointDate/);
  assert.match(page,/Calculated from invoice date, otherwise transaction date, otherwise payment date\./);assert.match(page,/Date shown on the supplier invoice\./);
  assert.match(page,/Short description shown in the VAT ledger and accounting export\./);assert.match(page,/Optional private note for accounting, evidence or manual review context\./);
  assert.match(page,/placeholder="Optional accounting or review note"/);assert.doesNotMatch(page,/Review note for manual conversion/);
});

test("supplier-document review is separate from VAT treatment and retains evidence access",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  assert.match(page,/>Supplier document review/);
  assert.match(page,/value=\{form\.supplier_document_review_status\}[\s\S]{0,140}update\("supplier_document_review_status"/);
  assert.match(page,/Supporting document accepted for bookkeeping — no VAT claimed/);
  assert.match(page,/not relying on the document to reclaim VAT/);
  assert.match(page,/does not approve a VAT reclaim/);assert.match(page,/specialist review and HMRC discretion/);
  assert.match(page,/remains in Financial OS but will not be included in the accounting export/);
  assert.match(page,/value=\{form\.vat_treatment\}[\s\S]{0,120}update\("vat_treatment"/);
  assert.doesNotMatch(page,/update\("supplier_document_review_status"[\s\S]{0,80}vat_treatment/);
  assert.match(page,/View evidence/);
});

test("VAT ledger exposes founder-only fixed expense and adjustment evidence targets",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  const dialog=readFileSync("src/components/finance/VatEvidenceUploadDialog.tsx","utf8");
  assert.match(page,/Upload evidence/);assert.match(page,/Upload refund evidence/);assert.match(page,/View evidence/);assert.match(page,/View refund evidence/);
  assert.match(page,/viewer\.isFounderAdmin/);assert.match(page,/entityType: "expense_adjustment"/);
  assert.match(dialog,/Choose an evidence purpose and file/);assert.match(dialog,/linked_entity_id: target\.id/);assert.doesNotMatch(dialog,/setTarget|Entity ID/);
  assert.match(dialog,/Existing canonical document details updated and linked/);assert.match(dialog,/document_category: "Finance"/);
  assert.match(dialog,/Upload and link/);assert.match(dialog,/!bg-\[#ef9f32\]/);assert.match(dialog,/disabled:!bg-slate-200/);
  assert.match(dialog,/Edit details/);assert.match(dialog,/Save details/);assert.match(dialog,/Evidence details saved\./);
  assert.match(dialog,/evidenceService\.update\(editingEvidenceId/);assert.match(dialog,/supplier_reference:supplierReference/);
  assert.match(dialog,/evidenceService\.unlink\(id,linkId\)/);assert.match(dialog,/If it is not linked anywhere else, the stored document will also be permanently deleted/);
  assert.doesNotMatch(dialog,/deleteEverywhere/);
  assert.match(dialog,/result\.evidence_reused[\s\S]*evidenceService\.update/);assert.match(dialog,/Completed metadata during VAT evidence reuse/);
  assert.match(dialog,/linkedDetails\[item\.id\]\.description/);assert.match(dialog,/Its evidence details were saved/);
  assert.match(dialog,/showEvidenceEditor/);assert.match(dialog,/Add another document/);assert.match(dialog,/Review the canonical documents linked to this transaction/);
});

test("VAT editing exposes period conflicts and percentage-entry mistakes",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  assert.match(page,/form\.vat_period_id !== suggestedPeriod\.id/);assert.match(page,/Replace selected period with suggestion/);
  assert.match(page,/explicitly selected VAT period does not match the effective tax point/);
  assert.match(page,/Entered rate is \{form\.vat_rate\}%/);assert.match(page,/Enter 20 for a 20% VAT rate/);
});
