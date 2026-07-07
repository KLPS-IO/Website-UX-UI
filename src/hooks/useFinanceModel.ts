import { useFinance } from "@/contexts/FinanceContext";
import type { Scenario } from "@/finance/financialEngine";

export function useFinanceModel(scenario: Scenario = "base") {
  const finance = useFinance();
  return scenario === "base" ? finance.model : finance.getModel(scenario);
}
