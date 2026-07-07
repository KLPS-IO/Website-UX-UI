import { createInitialFinanceState, type FinanceState } from "@/finance/financialEngine";

export interface FinanceRepository {
  loadFinanceState(): Promise<FinanceState>;
  saveFinanceState(state: FinanceState): Promise<FinanceState>;
}

export class PlaceholderFinanceRepository implements FinanceRepository {
  async loadFinanceState() {
    return createInitialFinanceState();
  }

  async saveFinanceState(state: FinanceState) {
    return state;
  }
}
