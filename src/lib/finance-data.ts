import { buildFinancialEngine, currency, currencyShort, expenseCategories, MONTHS, pct, START } from "@/finance/financialEngine";
import { documents, decisions, risks, seedActivity } from "@/finance/evidence";
import { seedAssumptions } from "@/finance/assumptions";
import type { FinanceEvent, FinancialAssumption, Scenario } from "@/types/finance";

let singletonAssumptions: FinancialAssumption[] = seedAssumptions;
let singletonEvents: FinanceEvent[] = seedActivity;

const engine = () => buildFinancialEngine(singletonAssumptions);

export function replaceFinanceAssumptions(assumptions: FinancialAssumption[], events: FinanceEvent[] = singletonEvents) {
  singletonAssumptions = assumptions;
  singletonEvents = events;
}

export const assumptions = singletonAssumptions;
export const activity = singletonEvents;
export const getAssumption = (id: string) => engine().getAssumption(id);
export const A = (id: string) => engine().A(id);
export const products = engine().products;
export const productMargin = (product: (typeof products)[number]) => engine().productMargin(product);
export const hires = engine().hires;
export const funding = engine().funding;
export const evidence = engine().evidence;
export { documents, decisions, risks, currency, currencyShort, expenseCategories, MONTHS, pct, START };
export const monthLabels = () => engine().monthLabels();
export const monthlyPayroll = (monthIdx: number, startDate = START) => engine().monthlyPayroll(monthIdx, startDate);
export const monthlyRevenue = (monthIdx: number, scenario: Scenario = "base") => engine().monthlyRevenue(monthIdx, scenario);
export const monthlyExpenses = (monthIdx: number, scenario: Scenario = "base") => engine().monthlyExpenses(monthIdx, scenario);
export const cashFlowSeries = (scenario: Scenario = "base") => engine().cashFlowSeries(scenario);
export const currentKpis = (scenario: Scenario = "base") => engine().currentKpis(scenario);
export const aiInsights = engine().aiInsights();
export type {
  DocRow,
  EvidenceRecord as Evidence,
  ExpenseCategory,
  FinancialAssumption as Assumption,
  Funding,
  Hire,
  Product,
  Scenario,
} from "@/types/finance";
