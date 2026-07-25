import { useEffect, useState } from "react";
import { expenseService } from "@/services/expenses/expense.service";
import type { Expense } from "@/types/expense";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let active = true;
    expenseService.list()
      .then((items) => { if (active) setExpenses(items); })
      .catch((reason) => { if (active) setError(reason); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { expenses, loading, error };
}
