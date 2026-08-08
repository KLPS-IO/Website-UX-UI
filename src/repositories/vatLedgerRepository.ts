import { authenticatedApi } from "@/lib/authenticated-api";
import { normalizeVatLedgerRow, normalizeVatLedgerRows } from "@/lib/vat-ledger-contract";
import type { HistoricalExpenseInput,VatLedgerRow,VatPeriod,VatPeriodSuggestion } from "@/types/vat-ledger";
export const vatLedgerRepository={
  periods:()=>authenticatedApi<{status:"success";vat_periods:VatPeriod[]}>("/api/finance/vat-periods"),
  ledger:async(periodId="")=>{const response=await authenticatedApi<{status:"success";label:string;transactions:unknown}>(`/api/finance/vat-ledger${periodId?`?vat_period_id=${encodeURIComponent(periodId)}`:""}`);return{...response,transactions:normalizeVatLedgerRows(response.transactions)};},
  suggestPeriod:(taxPointDate:string)=>authenticatedApi<{status:"success";vat_period:VatPeriodSuggestion|null}>(`/api/finance/vat-periods/suggest?tax_point_date=${encodeURIComponent(taxPointDate)}`),
  create:async(input:HistoricalExpenseInput)=>{const response=await authenticatedApi<{status:"success";expense:unknown}>("/api/finance/expenses",{method:"POST",body:JSON.stringify(input)});return{...response,expense:normalizeVatLedgerRow(response.expense)};},
  update:async(id:string,input:Record<string,unknown>)=>{const response=await authenticatedApi<{status:"success";expense:unknown}>(`/api/finance/expenses/${id}`,{method:"PATCH",body:JSON.stringify(input)});return{...response,expense:normalizeVatLedgerRow(response.expense)};},
  archive:(id:string,reason:string)=>authenticatedApi(`/api/finance/expenses/${id}/archive`,{method:"POST",body:JSON.stringify({change_reason:reason})}),
};
