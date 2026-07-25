import { authenticatedApi } from "@/lib/authenticated-api";
import type { ExpenseDto, ExpenseMetricsDto } from "@/types/expense";

type FinanceStateResponse = {
  status: "success";
  expenses: ExpenseDto[];
  expense_metrics: ExpenseMetricsDto;
};

export const expenseRepository = {
  list: () => authenticatedApi<FinanceStateResponse>("/api/finance/state"),
};
