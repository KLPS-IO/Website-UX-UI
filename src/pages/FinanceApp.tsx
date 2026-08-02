import { Navigate, Route, Routes } from "react-router-dom";
import { FinanceLayout } from "@/components/finance/Layout";
import DashboardPage from "@/pages/Finance.dashboard";
import AssumptionsPage from "@/pages/Finance.assumptions";
import ProductsPage from "@/pages/Finance.products";
import RevenuePage from "@/pages/Finance.revenue";
import ExpensesPage from "@/pages/Finance.expenses";
import HiringPage from "@/pages/Finance.hiring";
import FundingPage from "@/pages/Finance.funding";
import CashFlowPage from "@/pages/Finance.cash-flow";
import ForecastsPage from "@/pages/Finance.forecasts";
import ScenariosPage from "@/pages/Finance.scenarios";
import KPIsPage from "@/pages/Finance.kpis";
import ReportsPage from "@/pages/Finance.reports";
import EvidencePage from "@/pages/Finance.evidence";
import DocumentsPage from "@/pages/FInance.documents";
import AIInsightsPage from "@/pages/Finance.ai-insights";
import DecisionLogPage from "@/pages/Finance.decision-log";
import RiskRegisterPage from "@/pages/Finance.risk-register";
import CompanyPage from "@/pages/Finance.company";
import CapTablePage from "@/pages/Finance.cap-table";
import VatLedgerPage from "@/pages/Finance.vat-ledger";

export default function FinanceApp() {
  return (
    <FinanceLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="company" element={<CompanyPage />} />
        <Route path="cap-table" element={<CapTablePage />} />
        <Route path="assumptions" element={<AssumptionsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="revenue" element={<RevenuePage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="vat-ledger" element={<VatLedgerPage />} />
        <Route path="hiring" element={<HiringPage />} />
        <Route path="funding" element={<FundingPage />} />
        <Route path="cash-flow" element={<CashFlowPage />} />
        <Route path="forecasts" element={<ForecastsPage />} />
        <Route path="scenarios" element={<ScenariosPage />} />
        <Route path="kpis" element={<KPIsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="evidence" element={<EvidencePage />} />
        <Route path="decision-log" element={<DecisionLogPage />} />
        <Route path="risk-register" element={<RiskRegisterPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="ai-insights" element={<AIInsightsPage />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </FinanceLayout>
  );
}
