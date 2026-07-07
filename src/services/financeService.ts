import { calculateFinanceModel, type FinanceState, type Scenario } from "@/finance/financialEngine";
import { PlaceholderFinanceRepository, type FinanceRepository } from "@/repositories/financeRepository";

export class FinanceService {
  constructor(private readonly repository: FinanceRepository = new PlaceholderFinanceRepository()) {}

  async load() {
    return this.repository.loadFinanceState();
  }

  calculate(state: FinanceState, scenario: Scenario = "base") {
    return calculateFinanceModel(state, scenario);
  }

  async save(state: FinanceState) {
    return this.repository.saveFinanceState(state);
  }
}
