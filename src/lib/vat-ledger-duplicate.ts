import { safeApiDateValue } from "./safe-date.ts";
import type { HistoricalExpenseInput, VatLedgerRow } from "../types/vat-ledger.ts";

export function buildDuplicateExpensePayload(source: VatLedgerRow): HistoricalExpenseInput {
  const paymentDate=safeApiDateValue(source.payment_date);
  return {
    transaction_date: safeApiDateValue(source.transaction_date),
    ...(paymentDate?{payment_date:paymentDate}:{}),
    supplier_name: source.supplier_name ?? "Unknown supplier",
    gross_amount: String(source.gross_amount ?? source.gbp_gross_amount ?? "0"),
    description: `${source.description ?? source.name} (copy)`,
    change_reason: "Duplicated historical expense",
  };
}
