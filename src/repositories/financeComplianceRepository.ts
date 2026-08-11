import { authenticatedApi } from "@/lib/authenticated-api";
import type { FinanceAction,FinanceCompliance,VatFiling } from "@/types/finance-compliance";
export const financeComplianceRepository={
  overview:async()=>(await authenticatedApi<{compliance:FinanceCompliance}>("/api/finance/compliance")).compliance,
  actions:async()=>(await authenticatedApi<{actions:FinanceAction[]}>("/api/finance/actions")).actions,
  refresh:async()=>(await authenticatedApi<{summary:{created:number;updated:number;completed:number;unchanged:number}}>("/api/finance/actions/refresh",{method:"POST",body:"{}"})).summary,
  update:async(id:string,status:FinanceAction["status"])=>(await authenticatedApi<{action:FinanceAction}>(`/api/finance/actions/${id}`,{method:"PATCH",body:JSON.stringify({status,change_reason:"Founder updated Finance action"})})).action,
  filings:async()=>(await authenticatedApi<{filings:VatFiling[]}>("/api/finance/vat-filings")).filings,
};
