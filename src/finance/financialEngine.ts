import { seedAssumptions } from "./assumptions";
import { evidence, funding, hires, risks, seedActivity } from "./evidence";
import type { ExpenseCategory, FinancialAssumption, Product, Scenario } from "@/types/finance";

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
export const START = new Date(2026, 6, 1);
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

const scenarioMult: Record<Scenario, number> = { conservative: 0.75, base: 1, best: 1.25 };

export function buildFinancialEngine(source: FinancialAssumption[] = seedAssumptions) {
  const assumptions = source.map((assumption) => ({ ...assumption, history: [...assumption.history], evidenceIds: [...assumption.evidenceIds], linkedMetrics: [...assumption.linkedMetrics] }));
  const getAssumption = (id: string) => {
    const assumption = assumptions.find((a) => a.id === id);
    if (!assumption) throw new Error(`Missing finance assumption: ${id}`);
    return assumption;
  };
  const A = (id: string) => getAssumption(id).value;

  const monthLabels = () =>
    Array.from({ length: MONTHS }, (_, i) => {
      const d = new Date(START.getFullYear(), START.getMonth() + i, 1);
      return d.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
    });

  const products: Product[] = [
    { id: "klps-core", name: "KLPS Core", status: "Live", launchDate: "2026-03-01", sellingPrice: A("asp"), mfgCost: A("mfg_cost"), packaging: A("packaging"), shipping: A("shipping"), subscriptionMonthly: A("sub_price") },
    { id: "klps-pro", name: "KLPS Pro", status: "Beta", launchDate: "2026-09-15", sellingPrice: 349, mfgCost: 92, packaging: 7.5, shipping: 11, subscriptionMonthly: 18 },
    { id: "klps-lite", name: "KLPS Lite", status: "Planned", launchDate: "2027-02-01", sellingPrice: 149, mfgCost: 42, packaging: 5, shipping: 7.5, subscriptionMonthly: 8 },
    { id: "klps-ent", name: "KLPS Enterprise", status: "Beta", launchDate: "2026-11-01", sellingPrice: 0, mfgCost: 0, packaging: 0, shipping: 0, subscriptionMonthly: 0 },
  ];

  const productMargin = (p: Product) => {
    const cogs = p.mfgCost + p.packaging + p.shipping;
    const gross = p.sellingPrice - cogs;
    return { cogs, gross, marginPct: p.sellingPrice ? gross / p.sellingPrice : 0 };
  };

  const monthlyPayroll = (monthIdx: number, startDate = START) => {
    const ramp = 1 + A("hire_ramp");
    return hires.reduce((sum, h) => {
      const [y, m] = h.startDate.split("-").map(Number);
      const hireMonth = new Date(y, m - 1, 1);
      const cur = new Date(startDate.getFullYear(), startDate.getMonth() + monthIdx, 1);
      return cur >= hireMonth ? sum + (h.salary * ramp) / 12 : sum;
    }, 0);
  };

  const monthlyUnits = (monthIdx: number, scenario: Scenario = "base") => {
    const baseUnits = (A("waitlist") * A("conv")) / 12;
    return baseUnits * Math.pow(1 + A("growth_mom") * scenarioMult[scenario], monthIdx);
  };

  const monthlyRevenue = (monthIdx: number, scenario: Scenario = "base") => {
    const units = monthlyUnits(monthIdx, scenario);
    const hardware = units * A("asp");
    const subscribers = units * A("sub_uptake") * (monthIdx + 1);
    const subs = subscribers * A("sub_price");
    const enterprise = (A("ent_rev") * A("ent_count")) / 12;
    return { units, hardware, subs, enterprise, total: hardware + subs + enterprise };
  };

  const monthlyCogs = (monthIdx: number, scenario: Scenario = "base") =>
    monthlyUnits(monthIdx, scenario) * (A("mfg_cost") + A("packaging") + A("shipping"));

  const monthlyExpenses = (monthIdx: number, scenario: Scenario = "base"): Record<ExpenseCategory, number> => {
    const rev = monthlyRevenue(monthIdx, scenario).total;
    return {
      Payroll: monthlyPayroll(monthIdx),
      Research: 8500 + monthIdx * 200,
      Manufacturing: monthlyCogs(monthIdx, scenario),
      Technology: 4200 + monthIdx * 120,
      Marketing: Math.max(12000, rev * 0.14) + monthlyUnits(monthIdx, scenario) * A("cac") * 0.3,
      Legal: 2500,
      Travel: 1800 + (monthIdx % 3 === 0 ? 3500 : 0),
      Operations: 6200 + monthIdx * 90,
    };
  };

  const monthlyExpenseTotal = (monthIdx: number, scenario: Scenario = "base") =>
    Object.values(monthlyExpenses(monthIdx, scenario)).reduce((a, b) => a + b, 0);

  const cashFlowSeries = (scenario: Scenario = "base") => {
    let cash = A("opening_cash");
    const labels = monthLabels();
    return Array.from({ length: MONTHS }, (_, i) => {
      const rev = monthlyRevenue(i, scenario).total;
      const exp = monthlyExpenseTotal(i, scenario);
      const fundingIn = funding
        .filter((f) => {
          const d = new Date(f.date);
          const cur = new Date(START.getFullYear(), START.getMonth() + i, 1);
          return d.getFullYear() === cur.getFullYear() && d.getMonth() === cur.getMonth();
        })
        .reduce((s, f) => s + (f.status !== "Planned" || scenario === "best" ? f.amount : 0), 0);
      const net = rev - exp + fundingIn;
      cash += net;
      return { month: labels[i], revenue: rev, expenses: exp, net, cash, funding: fundingIn };
    });
  };

  const currentKpis = (scenario: Scenario = "base") => {
    const series = cashFlowSeries(scenario);
    const burn = series.slice(0, 3).reduce((s, r) => s + Math.max(0, r.expenses - r.revenue), 0) / 3;
    const cash = A("opening_cash");
    const annualRev = series.slice(0, 12).reduce((s, r) => s + r.revenue, 0);
    const cogs = Array.from({ length: 12 }, (_, i) => monthlyCogs(i, scenario)).reduce((a, b) => a + b, 0);
    const grossMargin = annualRev ? (annualRev - cogs) / annualRev : 0;
    const netMargin = annualRev ? (annualRev - series.slice(0, 12).reduce((s, r) => s + r.expenses, 0)) / annualRev : 0;
    const growth = series[11].revenue / Math.max(1, series[0].revenue) - 1;
    return {
      cash,
      burn,
      runway: burn > 0 ? cash / burn : 99,
      annualRev,
      grossMargin,
      netMargin,
      mrr: series[0].revenue,
      arr: series[0].revenue * 12,
      cac: A("cac"),
      ltv: A("sub_price") * 18 + A("asp") * (1 - grossMargin),
      growth,
      forecastAccuracy: 0.87,
      confidence: assumptions.reduce((s, a) => s + a.confidence, 0) / assumptions.length,
    };
  };

  const aiInsights = (scenario: Scenario = "base") => {
    const k = currentKpis(scenario);
    const enterprise = A("ent_rev") * A("ent_count");
    const weak = [...assumptions].sort((a, b) => a.confidence - b.confidence)[0];
    return [
      {
        id: "ai-1",
        severity: "opportunity" as const,
        title: `Raise ASP by GBP 15`,
        body: `Pricing evidence at ${getAssumption("asp").confidence}/100 confidence suggests a GBP ${A("asp") + 15} ASP could add ${currencyShort(monthlyUnits(0) * 15 * 12)} to annual revenue.`,
      },
      {
        id: "ai-2",
        severity: "risk" as const,
        title: "Enterprise revenue needs stronger evidence",
        body: `${currencyShort(enterprise)} of annual enterprise revenue is backed by ${getAssumption("ent_rev").confidence}/100 confidence. Link signed contracts before treating this as verified ARR.`,
      },
      {
        id: "ai-3",
        severity: "info" as const,
        title: `Runway is ${k.runway.toFixed(1)} months`,
        body: `Current cash and burn create a ${k.runway.toFixed(1)} month runway in the ${scenario} scenario.`,
      },
      {
        id: "ai-4",
        severity: "risk" as const,
        title: `${weak.name} is the weakest assumption`,
        body: `Confidence is ${weak.confidence}/100. Add evidence or downgrade linked outputs: ${weak.linkedMetrics.join(", ")}.`,
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
      for (let i = 0; i < 12; i++) value += monthlyExpenses(i, scenario)[category];
      return { category, value };
    });

    return {
      kpis: currentKpis(scenario),
      series,
      revenueMix,
      expenseBreakdown,
      recentActivity: seedActivity,
      aiInsights: aiInsights(scenario),
      topRisks: [...risks].sort((a, b) => b.probability * b.impact - a.probability * a.impact).slice(0, 3),
      reports: [
        { id: "r1", title: "Investor Update - July 2026", period: "Monthly", status: "Ready" },
        { id: "r2", title: "Board Pack - Q2 2026", period: "Quarterly", status: "Ready" },
        { id: "r3", title: "SEIS Compliance Report", period: "Annual", status: "Draft" },
        { id: "r4", title: "Seed Round Data Room Summary", period: "One-off", status: "Ready" },
      ],
      monthlyRevenue: (monthIdx: number) => monthlyRevenue(monthIdx, scenario),
      monthlyExpenses: (monthIdx: number) => monthlyExpenses(monthIdx, scenario),
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

export function calculateFinanceModel(state: FinanceState, scenario: Scenario = "base") {
  return buildFinancialEngine(state.assumptions).buildModel(scenario);
}

export const currency = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

export const currencyShort = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1000000) return `GBP ${(n / 1000000).toFixed(2)}M`;
  if (abs >= 1000) return `GBP ${(n / 1000).toFixed(1)}K`;
  return `GBP ${n.toFixed(0)}`;
};

export const pct = (n: number, digits = 1) => `${(n * 100).toFixed(digits)}%`;
