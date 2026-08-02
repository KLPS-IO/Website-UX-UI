import { safeApiDateValue } from "./safe-date.ts";
import type { HistoricalExpenseInput, VatLedgerRow } from "../types/vat-ledger.ts";

export function buildDuplicateExpensePayload(source: VatLedgerRow): HistoricalExpenseInput {
  return {
    payment_date: safeApiDateValue(source.payment_date ?? source.transaction_date),
    supplier_name: source.supplier_name ?? "Unknown supplier",
    gross_amount: String(source.gross_amount ?? source.gbp_gross_amount ?? "0"),
    description: `${source.description ?? source.name} (copy)`,
    change_reason: "Duplicated historical expense",
  };
}
