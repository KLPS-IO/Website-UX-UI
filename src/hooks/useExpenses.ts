import { useEffect, useState } from "react";
import { expenseService } from "@/services/expenses/expense.service";
import type { Expense, ExpenseMetrics } from "@/types/expense";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [metrics, setMetrics] = useState<ExpenseMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let active = true;
    expenseService.list()
      .then((result) => { if (active) { setExpenses(result.expenses); setMetrics(result.metrics); } })
      .catch((reason) => { if (active) setError(reason); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { expenses, metrics, loading, error };
}
