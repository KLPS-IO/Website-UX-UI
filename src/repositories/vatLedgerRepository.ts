import { authenticatedApi } from "@/lib/authenticated-api";
import type { HistoricalExpenseInput,VatLedgerRow,VatPeriod,VatPeriodSuggestion } from "@/types/vat-ledger";
export const vatLedgerRepository={
  periods:()=>authenticatedApi<{status:"success";vat_periods:VatPeriod[]}>("/api/finance/vat-periods"),
  ledger:(periodId="")=>authenticatedApi<{status:"success";label:string;transactions:VatLedgerRow[]}>(`/api/finance/vat-ledger${periodId?`?vat_period_id=${encodeURIComponent(periodId)}`:""}`),
  suggestPeriod:(taxPointDate:string)=>authenticatedApi<{status:"success";vat_period:VatPeriodSuggestion|null}>(`/api/finance/vat-periods/suggest?tax_point_date=${encodeURIComponent(taxPointDate)}`),
  create:(input:HistoricalExpenseInput)=>authenticatedApi<{status:"success";expense:VatLedgerRow}>("/api/finance/expenses",{method:"POST",body:JSON.stringify(input)}),
  update:(id:string,input:Record<string,unknown>)=>authenticatedApi<{status:"success";expense:VatLedgerRow}>(`/api/finance/expenses/${id}`,{method:"PATCH",body:JSON.stringify(input)}),
  archive:(id:string,reason:string)=>authenticatedApi(`/api/finance/expenses/${id}/archive`,{method:"POST",body:JSON.stringify({change_reason:reason})}),
};
