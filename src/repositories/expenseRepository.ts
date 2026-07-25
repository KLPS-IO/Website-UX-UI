import { authenticatedApi } from "@/lib/authenticated-api";
import type { ExpenseDto } from "@/types/expense";

type FinanceStateResponse = {
  status: "success";
  expenses: ExpenseDto[];
};

export const expenseRepository = {
  list: () => authenticatedApi<FinanceStateResponse>("/api/finance/state"),
};
