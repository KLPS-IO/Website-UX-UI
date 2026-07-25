import { ApiError } from "@/lib/authenticated-api";
import { expenseRepository } from "@/repositories/expenseRepository";
import { mapExpenseDto, mapExpenseMetricsDto } from "./expense.adapter";

export const expenseService = {
  async list() {
    const response = await expenseRepository.list();
    return {
      expenses: response.expenses.map(mapExpenseDto),
      metrics: mapExpenseMetricsDto(response.expense_metrics),
    };
  },
};

export const expenseErrorMessage = (error: unknown) => {
  if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
    return "You are not authorised to view Finance OS expense records.";
  }
  return "Canonical expense records could not be loaded. Please try again.";
};
