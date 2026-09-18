import { createInitialFinanceState, type FinanceState } from "@/finance/financialEngine";

export interface FinanceRepository {
  loadFinanceState(): Promise<FinanceState>;
  saveFinanceState(state: FinanceState): Promise<FinanceState>;
}

export class PlaceholderFinanceRepository implements FinanceRepository {
  async loadFinanceState() {
    return createInitialFinanceState();
  }

  async saveFinanceState(_state: FinanceState):Promise<FinanceState> {
    throw new Error("Use canonical assumption/scenario endpoints to save; client model replacement is not supported");
  }
}
