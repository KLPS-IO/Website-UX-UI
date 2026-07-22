import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedAssumptions } from "@/finance/assumptions";
import { buildFinancialEngine } from "@/finance/financialEngine";
import { decisions, documents, risks, seedActivity } from "@/finance/evidence";
import type { FinanceEvent, FinancialAssumption, Scenario } from "@/types/finance";
import { replaceFinanceAssumptions } from "@/lib/finance-data";
import { companyService } from "@/services/company/company";
import type { CompanyHealth, CompanyRecord, CompanyVersion } from "@/types/company";
import type { EvidenceItem } from "@/types/evidence";

type FinanceContextValue = ReturnType<typeof buildFinancialEngine> & {
  model: ReturnType<ReturnType<typeof buildFinancialEngine>["buildModel"]>;
  getModel: (scenario: Scenario) => ReturnType<ReturnType<typeof buildFinancialEngine>["buildModel"]>;
  updateAssumption: (id: string, value: number, changeReason?: string) => void;
  scenario: Scenario;
  setScenario: (scenario: Scenario) => void;
  decisions: typeof decisions;
  documents: typeof documents;
  risks: typeof risks;
  company: CompanyRecord | null;
  companyHealth: CompanyHealth | null;
  companyVersions: CompanyVersion[];
  companyEvidence: EvidenceItem[];
  companyLoading: boolean;
  companyError: unknown;
  refreshCompany: () => Promise<void>;
};

const FinanceContext = createContext<FinanceContextValue | null>(null);

const cloneSeed = (): FinancialAssumption[] =>
  seedAssumptions.map((a) => ({
    ...a,
    evidenceIds: [...a.evidenceIds],
    linkedMetrics: [...a.linkedMetrics],
    history: [...a.history],
  }));

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [assumptions, setAssumptions] = useState<FinancialAssumption[]>(cloneSeed);
  const [events, setEvents] = useState<FinanceEvent[]>(seedActivity);
  const [scenario, setScenario] = useState<Scenario>("base");
  const [company, setCompany] = useState<CompanyRecord | null>(null);
  const [companyHealth, setCompanyHealth] = useState<CompanyHealth | null>(null);
  const [companyVersions, setCompanyVersions] = useState<CompanyVersion[]>([]);
  const [companyEvidence, setCompanyEvidence] = useState<EvidenceItem[]>([]);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [companyError, setCompanyError] = useState<unknown>(null);

  const refreshCompany = useCallback(async () => {
    setCompanyLoading(true);
    setCompanyError(null);
    try {
      const record = await companyService.getCompany();
      if (!record) {
        setCompany(null); setCompanyHealth(null); setCompanyVersions([]); setCompanyEvidence([]);
        return;
      }
      const [health, versions, evidence] = await Promise.all([
        companyService.getCompanyHealth(), companyService.getCompanyVersions(), companyService.getCompanyEvidence(),
      ]);
      setCompany(record); setCompanyHealth(health); setCompanyVersions(versions); setCompanyEvidence(evidence);
    } catch (error) {
      setCompany(null); setCompanyHealth(null); setCompanyVersions([]); setCompanyEvidence([]); setCompanyError(error);
    } finally { setCompanyLoading(false); }
  }, []);

  useEffect(() => { void refreshCompany(); }, [refreshCompany]);

  const engine = useMemo(() => {
    replaceFinanceAssumptions(assumptions, events);
    return buildFinancialEngine(assumptions);
  }, [assumptions, events]);

  const value = useMemo<FinanceContextValue>(
    () => ({
      ...engine,
      activity: events,
      model: { ...engine.buildModel("base"), recentActivity: events },
      getModel: (scenario) => ({ ...engine.buildModel(scenario), recentActivity: events }),
      scenario,
      setScenario,
      decisions,
      documents,
      risks,
      company,
      companyHealth,
      companyVersions,
      companyEvidence,
      companyLoading,
      companyError,
      refreshCompany,
      updateAssumption: (id, value, changeReason = "Manual assumption update") => {
        const now = new Date().toISOString();
        const date = now.slice(0, 10);
        setAssumptions((current) => {
          const next = current.map((assumption) => {
            if (assumption.id !== id) return assumption;
            return {
              ...assumption,
              value,
              updated_at: date,
              updatedAt: date,
              updated_by: "Emma / Founder",
              version: assumption.version + 1,
              change_reason: changeReason,
              history: [
                ...assumption.history,
                {
                  version: assumption.version,
                  value: assumption.value,
                  at: assumption.updated_at,
                  by: assumption.updated_by,
                  reason: assumption.change_reason,
                },
              ],
            };
          });
          return next;
        });
        setEvents((current) => [
          {
            id: crypto.randomUUID(),
            type: "assumption.updated",
            title: "Assumption Updated",
            what: `Updated assumption ${id} to ${value}`,
            who: "Emma",
            at: "just now",
            entityId: id,
          },
          {
            id: crypto.randomUUID(),
            type: "forecast.recalculated",
            title: "Revenue Forecast Recalculated",
            what: "Model input changed; verified evidence and status are required before forecast activation",
            who: "System",
            at: "just now",
            entityId: id,
          },
          ...current,
        ]);
      },
    }),
    [engine, events, scenario, company, companyHealth, companyVersions, companyEvidence, companyLoading, companyError, refreshCompany],
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used inside FinanceProvider");
  return context;
}
