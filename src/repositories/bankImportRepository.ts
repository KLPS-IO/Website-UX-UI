import { authenticatedApi } from "@/lib/authenticated-api";
import type { BankImportRun,BankTransaction,MonzoCsvImportResult,ProviderEnvironment } from "@/types/banking";

export const bankImportRepository={
  imports:async()=>(await authenticatedApi<{status:"success";imports:BankImportRun[]}>("/api/finance/bank-imports")).imports,
  transactions:async()=>(await authenticatedApi<{status:"success";transactions:BankTransaction[]}>("/api/finance/bank-transactions")).transactions,
  importMonzoCsv:async(file:File,providerEnvironment:ProviderEnvironment,accountLabel:string)=>{
    const body=new FormData();body.append("file",file);body.append("provider_environment",providerEnvironment);body.append("account_label",accountLabel);
    return (await authenticatedApi<{status:"success";import:MonzoCsvImportResult}>("/api/finance/bank-imports/monzo-csv",{method:"POST",body})).import;
  },
};
