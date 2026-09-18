import { authenticatedApi } from "@/lib/authenticated-api";
import type { BankImportRun,BankTransaction,MonzoCsvImportResult,ProviderEnvironment } from "@/types/banking";

export const bankImportRepository={
  accounts:async()=>(await authenticatedApi<{accounts:{id:string;display_name:string;provider:string;provider_environment:ProviderEnvironment}[]}>('/api/finance/bank-accounts')).accounts,
  matchTransfer:(first_id:string,second_id:string,reason:string)=>authenticatedApi('/api/finance/bank-reconciliation/transfer',{method:'POST',body:JSON.stringify({first_id,second_id,reason})}),
  imports:async(offset=0)=>(await authenticatedApi<{status:"success";imports:BankImportRun[]}>(`/api/finance/bank-imports?offset=${offset}`)).imports,
  transactions:async(offset=0)=>(await authenticatedApi<{status:"success";transactions:BankTransaction[]}>(`/api/finance/bank-transactions?offset=${offset}`)).transactions,
  importMonzoCsv:async(file:File,providerEnvironment:ProviderEnvironment,accountLabel:string,stableAccountKey:string,accountId?:string)=>{
    const body=new FormData();body.append("file",file);body.append("provider_environment",providerEnvironment);body.append("account_label",accountLabel);body.append("stable_account_key",stableAccountKey);if(accountId)body.append("account_id",accountId);
    return (await authenticatedApi<{status:"success";import:MonzoCsvImportResult}>("/api/finance/bank-imports/monzo-csv",{method:"POST",body})).import;
  },
};
