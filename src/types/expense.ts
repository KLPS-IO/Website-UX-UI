export type MoneyDto = number | string | null;

export type FinancialTreatment =
  | "Operating Expense"
  | "R&D Materials"
  | "R&D Services"
  | "Professional Services"
  | "Business Development"
  | "Marketing"
  | "Premises"
  | "Capital Expenditure"
  | "Cost of Goods Sold"
  | "Tax and Statutory"
  | "Other"
  | "To Classify";

/** Network DTO. Field names and nullability match finance_os.expenses. */
export interface ExpenseDto {
  id: string;
  import_key: string;
  name: string;
  supplier_name: string | null;
  category: string;
  cost_type: string;
  frequency: string | null;
  transaction_date: string | null;
  service_period_start: string | null;
  service_period_end: string | null;
  currency: string;
  net_amount: MoneyDto;
  credit_adjustment: MoneyDto;
  vat_amount: MoneyDto;
  vat_rate: MoneyDto;
  gross_amount: MoneyDto;
  supplier_cost_amount: MoneyDto;
  supplier_cost_basis: string | null;
  recurring_run_rate_net: MoneyDto;
  recurring_run_rate_vat_rate: MoneyDto;
  klps_allocation_amount: MoneyDto;
  klps_allocation_percentage: MoneyDto;
  current_status: string;
  paid_by: string | null;
  payment_channel: string | null;
  reimbursement_status: string | null;
  company_cash_outflow: boolean | null;
  business_expense_status: string | null;
  financial_treatment: FinancialTreatment;
  evidence_status: string;
  evidence_reference: string | null;
  evidence_id: string | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  version: number;
  change_reason: string;
}

export interface Expense {
  id: string;
  importKey: string;
  name: string;
  supplierName: string | null;
  category: string;
  costType: string;
  frequency: string | null;
  transactionDate: string | null;
  servicePeriodStart: string | null;
  servicePeriodEnd: string | null;
  currency: string;
  netAmount: number | null;
  creditAdjustment: number | null;
  vatAmount: number | null;
  vatRate: number | null;
  grossAmount: number | null;
  supplierCostAmount: number | null;
  supplierCostBasis: string | null;
  recurringRunRateNet: number | null;
  recurringRunRateVatRate: number | null;
  klpsAllocationAmount: number | null;
  klpsAllocationPercentage: number | null;
  currentStatus: string;
  paidBy: string | null;
  paymentChannel: string | null;
  reimbursementStatus: string | null;
  companyCashOutflow: boolean | null;
  businessExpenseStatus: string | null;
  financialTreatment: FinancialTreatment;
  evidenceStatus: string;
  evidenceReference: string | null;
  evidenceId: string | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  updatedAt: string;
  version: number;
  changeReason: string;
}

export interface ExpenseMoneyMetricDto {
  amount: number | null;
  known_count: number;
  excluded_unknown_count: number;
}

export interface ExpenseMetricsDto {
  verified_actual_spend: ExpenseMoneyMetricDto;
  founder_funded_business_spend: ExpenseMoneyMetricDto;
  company_bank_cash_spend: ExpenseMoneyMetricDto;
  recurring_monthly_run_rate_net: ExpenseMoneyMetricDto;
  actual_net: ExpenseMoneyMetricDto;
  actual_vat: ExpenseMoneyMetricDto;
  actual_gross: ExpenseMoneyMetricDto;
  category_totals: Array<{ financial_treatment: FinancialTreatment; amount: number; known_count: number }>;
  awaiting_evidence_count: number;
  shared_allocation_pending_count: number;
}

export interface ExpenseMoneyMetric {
  amount: number | null;
  knownCount: number;
  excludedUnknownCount: number;
}

export interface ExpenseMetrics {
  verifiedActualSpend: ExpenseMoneyMetric;
  totalFounderFundedBusinessSpend: ExpenseMoneyMetric;
  companyBankCashSpend: ExpenseMoneyMetric;
  recurringMonthlyRunRateNet: ExpenseMoneyMetric;
  actualNet: ExpenseMoneyMetric;
  actualVat: ExpenseMoneyMetric;
  actualGross: ExpenseMoneyMetric;
  categoryTotals: Array<{ financialTreatment: FinancialTreatment; amount: number | null; knownCount: number }>;
  awaitingEvidenceCount: number;
  sharedAllocationPendingCount: number;
}
