import { authenticatedApi,authenticatedBlobRequest } from "@/lib/authenticated-api";
import { QUICKFILE_PURCHASE_PROFILE,type AccountingExportConfig,type AccountingExportConfigInput,type AccountingExportValidation } from "@/types/accounting-export";

const root="/api/finance/accounting-exports";
export const accountingExportRepository={
  config:()=>authenticatedApi<AccountingExportConfig>(`${root}/config?profile=${QUICKFILE_PURCHASE_PROFILE}`),
  saveConfig:(input:AccountingExportConfigInput)=>authenticatedApi<AccountingExportConfig>(`${root}/config`,{method:"PUT",body:JSON.stringify(input)}),
  validate:(vatPeriodId:string)=>authenticatedApi<{status:"success";validation:AccountingExportValidation}>(`${root}/validate`,{method:"POST",body:JSON.stringify({vat_period_id:vatPeriodId,profile:QUICKFILE_PURCHASE_PROFILE})}),
  generate:(vatPeriodId:string,fingerprint:string)=>authenticatedBlobRequest(`${root}/generate`,{method:"POST",body:JSON.stringify({vat_period_id:vatPeriodId,profile:QUICKFILE_PURCHASE_PROFILE,expected_source_fingerprint:fingerprint})}),
};
