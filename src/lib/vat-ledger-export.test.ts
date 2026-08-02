import assert from "node:assert/strict";
import test from "node:test";
import { buildVatCsv,buildVatWorkbook,VAT_WORKING_PAPER_LABEL,vatExportColumns,vatExportValues } from "../services/expenses/vat-ledger-export.ts";
import { filterVatLedgerRows } from "./vat-ledger-ui.ts";
import type { VatLedgerRow } from "../types/vat-ledger.ts";

test("VAT export preserves working-paper label and adds stored/effective period distinctions",()=>{
  assert.equal(VAT_WORKING_PAPER_LABEL,"VAT working paper – not an HMRC submission");
  for(const column of ["Stored VAT period","Effective VAT period","Period source","Effective tax-point date"])assert.ok(vatExportColumns.includes(column));
  const item={id:"expense",name:"Expense",supplier_name:"Supplier",category:"Other",transaction_date:"2025-05-08",currency:"GBP",net_amount:null,vat_amount:null,gross_amount:"10",vat_rate:null,reimbursement_status:null,evidence_status:"To Evidence",evidence_files:[],warnings:[],notes:null,created_at:"",updated_at:"",stored_vat_period_id:null,effective_vat_period_id:"period",vat_period_source:"derived",effective_tax_point_date:"2025-05-08",vat_period_start:"2025-05-08T00:00:00.000Z",vat_period_end:"2026-04-30T00:00:00.000Z"} satisfies VatLedgerRow;
  const values=vatExportValues(item);
  assert.equal(values[vatExportColumns.indexOf("VAT period")],"8 May 2025 to 30 April 2026");
  assert.equal(values[vatExportColumns.indexOf("Period source")],"derived");
});
test("CSV and XLSX builders export the same filtered ledger rows",async()=>{
  const base={name:"Expense",category:"Other",transaction_date:"2025-05-08",currency:"GBP",net_amount:null,vat_amount:null,gross_amount:"10",vat_rate:null,reimbursement_status:null,evidence_status:"To Evidence",evidence_files:[],warnings:[],notes:null,created_at:"",updated_at:"",vat_review_status:"pending_review",evidence_coverage:"no_evidence"} satisfies Partial<VatLedgerRow>;
  const rows=[{...base,id:"keep",supplier_name:"Acme"},{...base,id:"omit",supplier_name:"Other"}] as VatLedgerRow[];
  const filtered=filterVatLedgerRows(rows,{supplier:"acm",reviewStatus:"pending_review",evidenceStatus:"no_evidence"});
  const csv=buildVatCsv(filtered);
  assert.match(csv,/"keep"/);assert.doesNotMatch(csv,/"omit"/);
  const period={id:"period",start_date:"2025-05-08T00:00:00.000Z",end_date:"2026-04-30T00:00:00.000Z",filing_deadline:null,status:"open",overdue:true,review_status:"pending_review",locked_at:null};
  const workbook=await buildVatWorkbook(filtered,period);
  assert.equal(workbook.getWorksheet("Working ledger")?.rowCount,3);
  assert.equal(workbook.getWorksheet("Review summary")?.getRow(2).getCell(2).value,"8 May 2025 to 30 April 2026");
});
