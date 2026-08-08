/// <reference types="node" />
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { blockingReasonCopy,canGenerateAccountingExport,cleanMappings,configStateCopy,manualAdjustmentParentReference,safeAccountingExportFilename,shortReference } from "./accounting-export.ts";
import type { AccountingExportConfig,AccountingExportValidation } from "../types/accounting-export.ts";

const config=(source:AccountingExportConfig["source"],confirmed:boolean,version=2):AccountingExportConfig=>({export_type:"mtd_accounting",profile:"quickfile_purchase_csv_v1",category_nominal_codes:{Software:"7001"},payment_account_nominal_codes:{paypal:"1201"},source,confirmed,confirmed_at:confirmed?"2026-08-04T12:00:00Z":null,updated_at:"2026-08-04T12:00:00Z",version});
const validation=(blocked=0):AccountingExportValidation=>({export_type:"mtd_accounting",profile:"quickfile_purchase_csv_v1",validation_mode:"dry_run",generated_at:"2026-08-04T12:00:00Z",vat_period:{},eligible_row_count:1,blocked_row_count:blocked,blocked_expense_ids:blocked?["expense-id"]:[],blocking_reasons:blocked?{"expense-id":["purchase_nominal_code_missing"]}:{},mapping_config_source:"database",mapping_config_confirmed:true,mapping_config_version:2,mapped_nominal_codes:{Software:"7001"},missing_nominal_mappings:[],payment_account_mappings:{paypal:"1201"},unmapped_payment_sources:[],adjustment_handling:{strategy:"manual",manual_adjustment_count:0,items:[]},expected_csv_headings:[],source_ledger_fingerprint:"a".repeat(64)});

test("configuration provenance copy covers confirmed, draft, environment and none",()=>{
  assert.equal(configStateCopy(config("database",true)),"Confirmed founder configuration");
  assert.match(configStateCopy(config("database",false)),/Draft founder configuration/);
  assert.equal(configStateCopy(config("environment",false)),"Legacy environment configuration");
  assert.equal(configStateCopy(config("none",false)),"No accounting mappings configured");
});

test("generation requires a usable configuration, current validation, zero blockers and fingerprint",()=>{
  assert.equal(canGenerateAccountingExport(config("database",true),validation(),false),true);
  assert.equal(canGenerateAccountingExport(config("database",false),validation(),false),false);
  assert.equal(canGenerateAccountingExport(config("environment",false),{...validation(),mapping_config_source:"environment",mapping_config_confirmed:false},false),true);
  assert.equal(canGenerateAccountingExport(config("database",true),validation(1),false),false);
  assert.equal(canGenerateAccountingExport(config("database",true),validation(),true),false);
  assert.equal(canGenerateAccountingExport(config("database",true),null,false),false);
  assert.equal(canGenerateAccountingExport(config("database",true,3),validation(),false),false);
});

test("mapping payloads trim entries and omit incomplete rows without inventing codes",()=>{
  assert.deepEqual(cleanMappings([{key:" Software ",value:" 7001 "},{key:"Empty",value:" "},{key:"",value:"9999"}]),{Software:"7001"});
});

test("blocked reasons are founder-readable and retain payment source detail",()=>{
  assert.equal(blockingReasonCopy("reviewed_gbp_vat_missing"),"VAT amount is missing");
  assert.equal(blockingReasonCopy("paid_account_nominal_code_missing:founder_director_funded"),"Payment account is not mapped: founder director funded");
  assert.equal(blockingReasonCopy("critical_warning:vat_conflict"),"Critical VAT warning: vat conflict");
});

test("download filename is deterministic and safe",()=>assert.equal(safeAccountingExportFilename({id:"p",start_date:"2025-05-08",end_date:"2026-04-30",filing_deadline:null,status:"open",overdue:false,review_status:"open",locked_at:null}),"KLPS-MTD-accounting-export-2025-05-08-to-2026-04-30-quickfile.csv"));

test("VAT ledger retains both working exports and adds a distinct founder-only modal action",()=>{
  const page=readFileSync("src/pages/Finance.vat-ledger.tsx","utf8");
  assert.match(page,/exportVatCsv\(filteredRows\)/);assert.match(page,/exportVatXlsx\(\s*filteredRows,\s*selected/);
  assert.match(page,/CSV\s*<\/button>/);assert.match(page,/XLSX\s*<\/button>/);assert.match(page,/MTD Accounting Export\s*<\/button>/);
  assert.match(page,/viewer\?\.isFounderAdmin/);assert.match(page,/setMtdExportOpen\(true\)/);
});
test("production-shaped manual adjustments use parent_expense_id without crashing",()=>{
  const item={adjustment_id:"047be47c-8f35-402a-b004-c90c3fb9b1e3",parent_expense_id:"84e3f40c-1d38-40d8-a496-643b6f4d7afe",reason:"Reviewed partial refund"};
  assert.equal(manualAdjustmentParentReference(item),item.parent_expense_id);
  assert.equal(shortReference(manualAdjustmentParentReference(item)),"84e3f40c…7afe");
  assert.equal(shortReference(undefined),"Not recorded");
});

test("modal uses all approved endpoints, expected version, fingerprint, conflict refetch and no browser mapping storage",()=>{
  const component=readFileSync("src/components/finance/MtdAccountingExportDialog.tsx","utf8");
  const repository=readFileSync("src/repositories/accountingExportRepository.ts","utf8");
  assert.match(repository,/accounting-exports/);assert.match(repository,/\/config/);assert.match(repository,/\/validate/);assert.match(repository,/\/generate/);
  assert.match(component,/expected_version:\s*config\.version/);assert.match(component,/accounting_export_config_version_conflict/);assert.match(component,/fetchConfig\(true\)/);
  assert.match(component,/validation\.source_ledger_fingerprint/);assert.match(component,/Revalidate transactions before generating the accounting CSV/);
  assert.match(component,/Manual adjustments required/);assert.match(component,/This has not been submitted to HMRC/);
  assert.doesNotMatch(component,/localStorage|sessionStorage/);assert.doesNotMatch(repository,/localStorage|sessionStorage/);
});

test("MTD dialog selects a period and permits draft validation while generation stays gated",()=>{
  const component=readFileSync("src/components/finance/MtdAccountingExportDialog.tsx","utf8");
  assert.match(component,/aria-label="MTD VAT period"/);assert.match(component,/setSelectedPeriodId\(period\?\.id \?\? ""\)/);
  assert.match(component,/Validate transactions/);assert.match(component,/Select a VAT period first\./);
  const validationGate=component.slice(component.indexOf("const validationDisabledReason"),component.indexOf("const generationReasons"));
  assert.doesNotMatch(validationGate,/confirmed/);
  assert.match(component,/canGenerateAccountingExport\(config, validation, stale\)/);
  assert.match(component,/Mapping configuration is still a draft\./);
  assert.match(component,/Save mapping draft/);assert.match(component,/Discard unsaved changes/);assert.match(component,/Confirm mappings/);
  assert.match(component,/Create the accounting CSV/);assert.match(component,/Complete these steps in order/);assert.match(component,/Still required/);
  assert.match(component,/!bg-\[#ef9f32\]/);assert.match(component,/disabled:!bg-slate-200/);
});
