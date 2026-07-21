import { seedAssumptions } from "./assumptions";
import { evidence, funding, hires, risks, seedActivity } from "./evidence";
import type {
  ExpenseCategory,
  FinancialAssumption,
  Product,
  Scenario,
} from "@/types/finance";
import {
  totalUnitCost,
  grossProfit,
  grossMargin,
} from "@/services/products/products.engine";
import { getProducts } from "@/services/products/products";

export type { Scenario } from "@/types/finance";

export interface FinanceState {
  assumptions: FinancialAssumption[];
}

export function createInitialFinanceState(): FinanceState {
  return {
    assumptions: seedAssumptions.map((a) => ({
      ...a,
      history: [...a.history],
      evidenceIds: [...a.evidenceIds],
      linkedMetrics: [...a.linkedMetrics],
    })),
  };
}

export const MONTHS = 18;
const now = new Date();
export const START = new Date(now.getFullYear(), now.getMonth(), 1);
export const expenseCategories: ExpenseCategory[] = [
  "Payroll",
  "Research",
  "Manufacturing",
  "Technology",
  "Marketing",
  "Legal",
  "Travel",
  "Operations",
];

const scenarioMult: Record<Scenario, number> = {
  conservative: 1,
  base: 1,
  best: 1,
};

export function buildFinancialEngine(
  source: FinancialAssumption[] = seedAssumptions,
) {
  const assumptions = source.map((assumption) => ({
    ...assumption,
    history: [...assumption.history],
    evidenceIds: [...assumption.evidenceIds],
    linkedMetrics: [...assumption.linkedMetrics],
  }));
  const getAssumption = (id: string) => {
    const assumption = assumptions.find((a) => a.id === id);
    if (!assumption) throw new Error(`Missing finance assumption: ${id}`);
    return assumption;
  };
  const A = (id: string) => getAssumption(id).value;
  const hasActiveEvidence = (id: string) => {
    const assumption = getAssumption(id);
    return (
      assumption.evidenceIds.length > 0 &&
      assumption.confidence > 0 &&
      ["Actual", "Verified"].includes(assumption.confidenceLevel) &&
      ["Actual", "Verified"].includes(assumption.status)
    );
  };
  const revenueInputsReady = [
    "asp",
    "sub_price",
    "sub_uptake",
    "waitlist",
    "conv",
    "growth_mom",
    "ent_rev",
    "ent_count",
  ].every(hasActiveEvidence);
  const costInputsReady = ["mfg_cost", "packaging", "shipping"].every(hasActiveEvidence);
  const cashInputReady = hasActiveEvidence("opening_cash");
  const forecastReady = revenueInputsReady && costInputsReady && cashInputReady;

  const monthLabels = () =>
    Array.from({ length: MONTHS }, (_, i) => {
      const d = new Date(START.getFullYear(), START.getMonth() + i, 1);
      return d.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
    });

  const products = getProducts();

  const productMargin = (product: Product) => ({
    cogs: totalUnitCost(product),

    gross: grossProfit(product),

    marginPct: grossMargin(product),
  });

  const monthlyPayroll = (monthIdx: number, startDate = START) => {
    const ramp = 1 + A("hire_ramp");
    return hires.reduce((sum, h) => {
      const [y, m] = h.startDate.split("-").map(Number);
      const hireMonth = new Date(y, m - 1, 1);
      const cur = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + monthIdx,
        1,
      );
      return cur >= hireMonth ? sum + (h.salary * ramp) / 12 : sum;
    }, 0);
  };

  const monthlyUnits = (monthIdx: number, scenario: Scenario = "base") => {
    if (!revenueInputsReady) return 0;
    const baseUnits = (A("waitlist") * A("conv")) / 12;
    return (
      baseUnits *
      Math.pow(1 + A("growth_mom") * scenarioMult[scenario], monthIdx)
    );
  };

  const monthlyRevenue = (monthIdx: number, scenario: Scenario = "base") => {
    if (!revenueInputsReady) {
      return { units: 0, hardware: 0, subs: 0, enterprise: 0, total: 0 };
    }
    const units = monthlyUnits(monthIdx, scenario);
    const hardware = units * A("asp");
    const subscribers = units * A("sub_uptake") * (monthIdx + 1);
    const subs = subscribers * A("sub_price");
    const enterprise = (A("ent_rev") * A("ent_count")) / 12;
    return {
      units,
      hardware,
      subs,
      enterprise,
      total: hardware + subs + enterprise,
    };
  };

  const primaryProduct = products[0];

  const monthlyCogs = (monthIdx: number, scenario: Scenario = "base") =>
    costInputsReady
      ? monthlyUnits(monthIdx, scenario) * totalUnitCost(primaryProduct)
      : 0;
  const monthlyExpenses = (
    monthIdx: number,
    scenario: Scenario = "base",
  ): Record<ExpenseCategory, number> => {
    return {
      Payroll: monthlyPayroll(monthIdx),
      Research: 0,
      Manufacturing: monthlyCogs(monthIdx, scenario),
      Technology: 0,
      Marketing: hasActiveEvidence("cac")
        ? monthlyUnits(monthIdx, scenario) * A("cac")
        : 0,
      Legal: 0,
      Travel: 0,
      Operations: 0,
    };
  };

  const monthlyExpenseTotal = (monthIdx: number, scenario: Scenario = "base") =>
    Object.values(monthlyExpenses(monthIdx, scenario)).reduce(
      (a, b) => a + b,
      0,
    );

  const cashFlowSeries = (scenario: Scenario = "base") => {
    let cash = cashInputReady ? A("opening_cash") : 0;
    const labels = monthLabels();
    return Array.from({ length: MONTHS }, (_, i) => {
      const rev = monthlyRevenue(i, scenario).total;
      const exp = monthlyExpenseTotal(i, scenario);
      const fundingIn = funding
        .filter((f) => {
          const d = new Date(f.date);
          const cur = new Date(START.getFullYear(), START.getMonth() + i, 1);
          return (
            d.getFullYear() === cur.getFullYear() &&
            d.getMonth() === cur.getMonth()
          );
        })
        .reduce(
          (s, f) =>
            s + (f.status !== "Planned" || scenario === "best" ? f.amount : 0),
          0,
        );
      const net = rev - exp + fundingIn;
      cash += net;
      return {
        month: labels[i],
        revenue: rev,
        expenses: exp,
        net,
        cash,
        funding: fundingIn,
      };
    });
  };

  const currentKpis = (scenario: Scenario = "base") => {
    const series = cashFlowSeries(scenario);
    const burn =
      series
        .slice(0, 3)
        .reduce((s, r) => s + Math.max(0, r.expenses - r.revenue), 0) / 3;
    const cash = cashInputReady ? A("opening_cash") : 0;
    const annualRev = series.slice(0, 12).reduce((s, r) => s + r.revenue, 0);
    const cogs = Array.from({ length: 12 }, (_, i) =>
      monthlyCogs(i, scenario),
    ).reduce((a, b) => a + b, 0);
    const grossMargin = annualRev ? (annualRev - cogs) / annualRev : 0;
    const netMargin = annualRev
      ? (annualRev - series.slice(0, 12).reduce((s, r) => s + r.expenses, 0)) /
        annualRev
      : 0;
    const growth = series[11].revenue / Math.max(1, series[0].revenue) - 1;
    return {
      cash,
      burn,
      runway: cashInputReady && burn > 0 ? cash / burn : 0,
      annualRev,
      grossMargin,
      netMargin,
      mrr: series[0].revenue,
      arr: series[0].revenue * 12,
      cac: A("cac"),
      ltv: 0,
      growth,
      forecastAccuracy: 0,
      confidence: assumptions.length
        ? assumptions.reduce((s, a) => s + a.confidence, 0) / assumptions.length
        : 0,
      forecastReady,
      cashKnown: cashInputReady,
      forecastAccuracyKnown: false,
    };
  };

  const aiInsights = (scenario: Scenario = "base") => {
    if (!forecastReady) {
      return [
        {
          id: "ai-evidence",
          severity: "info" as const,
          title: "Evidence collection in progress",
          body: "Forecast insights will become available after the minimum cash, pricing, demand and unit-cost assumptions are verified.",
        },
      ];
    }
    const k = currentKpis(scenario);
    return [
      {
        id: "ai-1",
        severity: "info" as const,
        title: "Model inputs verified",
        body: `The ${scenario} scenario is calculated only from active Actual or Verified assumptions. Current calculated runway is ${k.runway.toFixed(1)} months.`,
      },
    ];
  };

  const buildModel = (scenario: Scenario = "base") => {
    const series = cashFlowSeries(scenario);
    const revenueMix = (() => {
      const acc = { Hardware: 0, Subscriptions: 0, Enterprise: 0 };
      for (let i = 0; i < 12; i++) {
        const r = monthlyRevenue(i, scenario);
        acc.Hardware += r.hardware;
        acc.Subscriptions += r.subs;
        acc.Enterprise += r.enterprise;
      }
      return Object.entries(acc).map(([name, value]) => ({ name, value }));
    })();
    const expenseBreakdown = expenseCategories.map((category) => {
      let value = 0;
      for (let i = 0; i < 12; i++)
        value += monthlyExpenses(i, scenario)[category];
      return { category, value };
    });

    return {
      kpis: currentKpis(scenario),
      series,
      revenueMix,
      expenseBreakdown,
      recentActivity: seedActivity,
      aiInsights: aiInsights(scenario),
      topRisks: [...risks]
        .sort((a, b) => b.probability * b.impact - a.probability * a.impact)
        .slice(0, 3),
      reports: [],
      forecastReady,
      monthlyRevenue: (monthIdx: number) => monthlyRevenue(monthIdx, scenario),
      monthlyExpenses: (monthIdx: number) =>
        monthlyExpenses(monthIdx, scenario),
    };
  };

  return {
    assumptions,
    getAssumption,
    A,
    products,
    productMargin,
    hires,
    funding,
    evidence,
    activity: seedActivity,
    monthLabels,
    monthlyPayroll,
    monthlyUnits,
    monthlyRevenue,
    monthlyCogs,
    monthlyExpenses,
    monthlyExpenseTotal,
    cashFlowSeries,
    currentKpis,
    aiInsights,
    buildModel,
  };
}

export function calculateFinanceModel(
  state: FinanceState,
  scenario: Scenario = "base",
) {
  return buildFinancialEngine(state.assumptions).buildModel(scenario);
}

export const currency = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);

export const currencyShort = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1000000) return `GBP ${(n / 1000000).toFixed(2)}M`;
  if (abs >= 1000) return `GBP ${(n / 1000).toFixed(1)}K`;
  return `GBP ${n.toFixed(0)}`;
};

export const pct = (n: number, digits = 1) => `${(n * 100).toFixed(digits)}%`;
