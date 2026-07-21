import type { FinancialAssumption, Funding, Hire, RiskRecord } from "@/types/finance";
import type { CompanyRecord } from "@/types/company";
import { jsPDF } from "jspdf";

type CashFlowRow = {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
  cash: number;
  funding: number;
};

type NamedValue = { name: string; value: number };
type CategoryValue = { category: string; value: number };

export type FinanceExportData = {
  generatedAt: Date;
  company: CompanyRecord;
  kpis: {
    cash: number;
    burn: number;
    runway: number;
    annualRev: number;
    grossMargin: number;
    netMargin: number;
    mrr: number;
    arr: number;
    cac: number;
    ltv: number;
    growth: number;
    forecastAccuracy: number;
    confidence: number;
    forecastReady: boolean;
    cashKnown: boolean;
    forecastAccuracyKnown: boolean;
  };
  series: CashFlowRow[];
  revenueMix: NamedValue[];
  expenseBreakdown: CategoryValue[];
  assumptions: FinancialAssumption[];
  funding: Funding[];
  hires: Hire[];
  risks: RiskRecord[];
};

const money = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);

const percent = (value: number) => `${(value * 100).toFixed(1)}%`;
const reportDate = (date: Date) =>
  date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
const fileDate = (date: Date) => date.toISOString().slice(0, 10);

const summaryRows = (data: FinanceExportData): [string, string][] => [
  ["Cash on hand", data.kpis.cashKnown ? money(data.kpis.cash) : "Not yet evidenced"],
  ["Monthly burn", data.kpis.forecastReady ? money(data.kpis.burn) : "Not calculated"],
  ["Runway", data.kpis.forecastReady ? `${data.kpis.runway.toFixed(1)} months` : "Not calculated"],
  ["Forecast revenue (12 months)", data.kpis.forecastReady ? money(data.kpis.annualRev) : "Not calculated"],
  ["MRR", data.kpis.forecastReady ? money(data.kpis.mrr) : "Not calculated"],
  ["ARR", data.kpis.forecastReady ? money(data.kpis.arr) : "Not calculated"],
  ["Gross margin", data.kpis.forecastReady ? percent(data.kpis.grossMargin) : "Not calculated"],
  ["Net margin", data.kpis.forecastReady ? percent(data.kpis.netMargin) : "Not calculated"],
  ["Revenue growth", data.kpis.forecastReady ? percent(data.kpis.growth) : "Not calculated"],
  ["CAC", "Not yet evidenced"],
  ["LTV", data.kpis.forecastReady ? money(data.kpis.ltv) : "Not calculated"],
  ["Forecast accuracy", data.kpis.forecastAccuracyKnown ? percent(data.kpis.forecastAccuracy) : "Not available"],
  ["Model confidence", data.kpis.confidence > 0 ? `${data.kpis.confidence.toFixed(0)} / 100` : "Not yet evidenced"],
];

const assumptionValue = (assumption: FinancialAssumption) =>
  assumption.confidenceLevel === "Unknown"
    ? "Not yet evidenced"
    : `${assumption.value} ${assumption.unit}`;

const unknown = (value: string | number | null | undefined, fallback = "Not confirmed") =>
  value === null || value === undefined || value === "" ? fallback : String(value);
const companyDate = (value: string | null) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "Not confirmed";

const companyRows = (company: CompanyRecord): [string, string][] => [
  ["Company name", company.companyName],
  ["Legal name", company.legalName],
  ["Trading name", company.tradingName],
  ["Company number", company.companyNumber],
  ["Company type", company.companyType],
  ["Company status", company.companyStatus],
  ["Operating status", company.operatingStatus],
  ["Industry", company.industry.join(" / ")],
  ["Country", company.country],
  ["Incorporation date", company.incorporationDate],
  ["Registered office", Object.values(company.registeredOffice).filter(Boolean).join(", ")],
  ["Base currency", company.baseCurrency],
  ["Financial year end", company.financialYearEnd],
  ["First accounts period end", company.firstAccountsPeriodEnd],
  ["First accounts filing deadline", company.firstAccountsFilingDeadline],
  ["Founder", company.founder],
  ["SIC codes", company.sicCodes.join(", ")],
  ["VAT status", company.vatStatus],
  ["VAT registration number", unknown(company.vatRegistrationNumber, "Not yet evidenced")],
  ["VAT effective date", companyDate(company.vatEffectiveDate)],
  ["VAT scheme", unknown(company.vatScheme)],
  ["First VAT accounting period", company.vatAccountingPeriodStart && company.vatAccountingPeriodEnd ? `${companyDate(company.vatAccountingPeriodStart)} to ${companyDate(company.vatAccountingPeriodEnd)}` : "Not confirmed"],
  ["HMRC letter issue date", companyDate(company.vatLetterIssueDate)],
  ["VAT evidence source", company.vatEvidenceSource],
  ["External accountant", company.externalAccountantStatus],
  ["Accounting software", company.accountingSoftware],
  ["Accounting software status", company.accountingSoftwareStatus],
  ["Accounting method", unknown(company.accountingMethod)],
  ["Corporation Tax status", company.corporationTaxStatus],
  ["ICO status", company.icoStatus],
  ["ICO registration number", unknown(company.icoRegistrationNumber, "Not yet evidenced")],
  ["SEIS status", company.seisStatus],
  ["SEIS advance assurance", company.seisAdvanceAssuranceStatus === "Not Submitted" ? "Not submitted" : company.seisAdvanceAssuranceStatus],
  ["SEIS target submission period", unknown(company.seisTargetSubmissionPeriod)],
  ["SEIS decision date", unknown(company.seisDecisionDate)],
  ["SEIS reference number", unknown(company.seisReferenceNumber, "Not submitted")],
  ["SEIS evidence", company.seisEvidenceIds.length ? `${company.seisEvidenceIds.length} linked` : "Not yet evidenced"],
  ["Business bank status", company.bankStatus],
  ["Operating bank", company.operatingBankName],
  ["Business bank account", unknown(company.businessBankAccount)],
  ["Bank balance", company.bankBalance === null ? "Not yet evidenced" : money(company.bankBalance)],
  ["TRL", String(company.trl)],
  ["CRL", unknown(company.crl)],
  ["Current raise target", money(company.currentRaiseAmount)],
  ["Fundraising scheme", company.fundraisingScheme],
  ["Fundraising status", company.fundraisingStatus],
  ["Legal partner", company.legalPartner],
  ["Legal partner status", company.legalPartnerStatus],
  ["Current funding sources", company.currentFundingSources.join(", ")],
  ["Future revenue sources", company.futureRevenueSources.join(", ")],
  ["Company milestones", company.milestones.map((milestone) => `${milestone.title} (${milestone.status})`).join("; ")],
];

export async function exportFinanceExcel(data: FinanceExportData) {
  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = data.company.legalName;
  workbook.title = "KLPS Financial Report";
  workbook.subject = "Investor financial model export";
  workbook.created = data.generatedAt;

  const addSheet = (name: string, rows: (string | number)[][], widths: number[], headerRow = 1) => {
    const sheet = workbook.addWorksheet(name, { views: [{ state: "frozen", ySplit: headerRow }] });
    rows.forEach((row) => sheet.addRow(row));
    sheet.columns = widths.map((width) => ({ width }));
    const header = sheet.getRow(headerRow);
    header.height = 24;
    header.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF222831" } };
      cell.alignment = { vertical: "middle" };
    });
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber <= headerRow) return;
      row.height = 20;
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", wrapText: true };
        cell.border = { bottom: { style: "hair", color: { argb: "FFDDE1E5" } } };
      });
      if ((rowNumber - headerRow) % 2 === 0) row.eachCell((cell) => { cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F6F7" } }; });
    });
    sheet.autoFilter = { from: { row: headerRow, column: 1 }, to: { row: headerRow, column: rows[headerRow - 1].length } };
    return sheet;
  };

  const summary = addSheet("Executive Summary", [["KLPS FINANCIAL REPORT", ""], ["Status", "Early-stage model — evidence collection in progress"], ["Generated", reportDate(data.generatedAt)], ["Model", "Base case · 18-month horizon"], [], ["Metric", "Value"], ...summaryRows(data)], [36, 54], 6);
  summary.mergeCells("A1:B1");
  summary.getCell("A1").font = { bold: true, size: 18, color: { argb: "FFEF9F32" } };
  summary.getRow(1).height = 30;
  addSheet("Company", [["Field", "Verified company information"], ...companyRows(data.company)], [30, 72]);
  const cashFlowRows: (string | number)[][] = data.kpis.forecastReady
    ? [["Month", "Revenue", "Expenses", "Net cash flow", "Funding", "Closing cash"], ...data.series.map((r) => [r.month, r.revenue, r.expenses, r.net, r.funding, r.cash])]
    : [["Status"], ["Not calculated — minimum verified inputs are not active."]];
  const cashFlow = addSheet("18 Month Cash Flow", cashFlowRows, data.kpis.forecastReady ? [14, 18, 18, 18, 18, 18] : [68]);
  [2, 3, 4, 5, 6].forEach((column) => { cashFlow.getColumn(column).numFmt = '£#,##0;[Red]-£#,##0'; });
  const revenue = addSheet("Revenue Mix", data.kpis.forecastReady ? [["Revenue stream", "12-month value", "Share"], ...data.revenueMix.map((r) => [r.name, r.value, r.value / Math.max(1, data.revenueMix.reduce((sum, item) => sum + item.value, 0))])] : [["Status"], ["Not calculated — minimum verified inputs are not active."]], data.kpis.forecastReady ? [24, 20, 14] : [68]);
  revenue.getColumn(2).numFmt = '£#,##0'; revenue.getColumn(3).numFmt = '0.0%';
  const expenses = addSheet("Expenses", data.kpis.forecastReady ? [["Category", "12-month forecast"], ...data.expenseBreakdown.map((r) => [r.category, r.value])] : [["Status"], ["Not calculated — minimum verified inputs are not active."]], data.kpis.forecastReady ? [24, 22] : [68]);
  expenses.getColumn(2).numFmt = '£#,##0';
  addSheet("Assumptions", [["Category", "Assumption", "Value", "Status", "Confidence", "Evidence level", "Source", "Owner", "Last updated", "Notes"], ...data.assumptions.map((a) => [a.category, a.name, assumptionValue(a), a.status, a.confidence ? `${a.confidence}/100` : "Not yet evidenced", a.confidenceLevel, a.source || "Not yet evidenced", a.owner, a.updated_at, a.notes])], [18, 30, 22, 16, 20, 20, 28, 20, 16, 42]);
  const funding = addSheet("Funding", [["Name", "Type", "Amount", "Date", "Status", "Dilution"], ...data.funding.map((f) => [f.name, f.type, f.amount, f.date, f.status, f.dilution ?? ""] )], [28, 16, 18, 16, 16, 14]);
  funding.getColumn(3).numFmt = '£#,##0'; funding.getColumn(6).numFmt = '0.0%';
  const hiring = addSheet("Hiring", [["Role", "Department", "Annual salary", "Start date", "Status"], ...data.hires.map((h) => [h.role, h.department, h.salary, h.startDate, h.status])], [30, 20, 18, 16, 16]);
  hiring.getColumn(3).numFmt = '£#,##0';
  addSheet("Key Risks", [["Risk", "Category", "Probability", "Impact", "Score", "Owner", "Status", "Review date", "Mitigation"], ...data.risks.map((r) => [r.risk, r.category, r.probability, r.impact, r.probability * r.impact, r.owner, r.status, r.reviewDate, r.mitigation])], [40, 18, 14, 12, 12, 20, 16, 16, 48]);

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `KLPS-Financial-Report-${fileDate(data.generatedAt)}.xlsx`;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export async function exportFinancePdf(data: FinanceExportData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  let y = 20;

  const footer = () => {
    doc.setDrawColor(225, 225, 225);
    doc.line(margin, pageHeight - 13, pageWidth - margin, pageHeight - 13);
    doc.setFontSize(8);
    doc.setTextColor(110, 110, 110);
    doc.text("KLPS Investor Financial Report", margin, pageHeight - 8);
    doc.text(`Page ${doc.getNumberOfPages()}`, pageWidth - margin, pageHeight - 8, { align: "right" });
  };
  const newPage = () => { footer(); doc.addPage(); y = 20; };
  const ensure = (height: number) => { if (y + height > pageHeight - 20) newPage(); };
  const heading = (title: string) => {
    ensure(14);
    doc.setFillColor(239, 159, 50);
    doc.rect(margin, y, 2, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(34, 40, 49);
    doc.text(title, margin + 5, y + 6);
    y += 13;
  };
  const table = (headers: string[], rows: string[][], widths: number[]) => {
    const rowHeight = 7;
    ensure(rowHeight * 2);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(34, 40, 49);
    doc.setTextColor(255, 255, 255);
    doc.rect(margin, y, widths.reduce((a, b) => a + b, 0), rowHeight, "F");
    let x = margin;
    headers.forEach((header, i) => { doc.text(header, x + 2, y + 4.7, { maxWidth: widths[i] - 4 }); x += widths[i]; });
    y += rowHeight;
    doc.setFont("helvetica", "normal");
    rows.forEach((row, rowIndex) => {
      ensure(rowHeight);
      doc.setFillColor(rowIndex % 2 ? 248 : 242, rowIndex % 2 ? 248 : 244, rowIndex % 2 ? 248 : 246);
      doc.rect(margin, y, widths.reduce((a, b) => a + b, 0), rowHeight, "F");
      doc.setTextColor(45, 50, 56);
      x = margin;
      row.forEach((cell, i) => { doc.text(String(cell), x + 2, y + 4.7, { maxWidth: widths[i] - 4 }); x += widths[i]; });
      y += rowHeight;
    });
    y += 5;
  };

  doc.setFillColor(34, 40, 49);
  doc.rect(0, 0, pageWidth, 55, "F");
  doc.setTextColor(239, 159, 50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(data.company.tradingName, margin, 19);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(25);
  doc.text("Financial Report", margin, 34);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(205, 210, 215);
  doc.text("Early-stage model — evidence collection in progress", margin, 43);
  doc.text(`Generated ${reportDate(data.generatedAt)}`, margin, 49);
  y = 67;

  heading("Executive Summary");
  table(["Metric", "Value"], summaryRows(data), [105, 72]);
  heading("Company");
  table(["Field", "Verified company information"], companyRows(data.company), [57, 120]);
  heading("18-Month Cash Flow Forecast");
  if (data.kpis.forecastReady) {
    table(["Month", "Revenue", "Expenses", "Net", "Funding", "Cash"], data.series.map((r) => [r.month, money(r.revenue), money(r.expenses), money(r.net), money(r.funding), money(r.cash)]), [24, 31, 31, 30, 30, 31]);
    heading("Revenue Mix — Next 12 Months");
    table(["Revenue stream", "Forecast value"], data.revenueMix.map((r) => [r.name, money(r.value)]), [105, 72]);
    heading("Expense Breakdown — Next 12 Months");
    table(["Category", "Forecast value"], data.expenseBreakdown.map((r) => [r.category, money(r.value)]), [105, 72]);
  } else {
    table(["Status"], [["Not calculated — minimum verified inputs are not active."]], [177]);
  }
  heading("Core Assumptions");
  table(["Assumption", "Value", "Status", "Confidence"], data.assumptions.map((a) => [a.name, assumptionValue(a), a.status, a.confidence ? `${a.confidence}/100` : "Not evidenced"]), [62, 45, 32, 38]);
  heading("Funding Schedule");
  table(["Funding", "Type", "Amount", "Date", "Status"], data.funding.map((f) => [f.name, f.type, money(f.amount), f.date, f.status]), [48, 29, 34, 34, 32]);
  heading("Hiring Plan");
  table(["Role", "Department", "Salary", "Start", "Status"], data.hires.map((h) => [h.role, h.department, money(h.salary), h.startDate, h.status]), [50, 35, 32, 32, 28]);
  heading("Key Risks");
  table(["Risk", "Probability", "Impact", "Status"], data.risks.map((r) => [r.risk, percent(r.probability), String(r.impact), r.status]), [95, 30, 22, 30]);
  footer();
  doc.save(`KLPS-Financial-Report-${fileDate(data.generatedAt)}.pdf`);
}

const escapeHtml = (value: unknown) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
const htmlTable = (headers: string[], rows: string[][]) => `<table><thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;

export function printFinanceReport(data: FinanceExportData) {
  const popup = window.open("", "_blank", "width=1000,height=800");
  if (!popup) throw new Error("Allow pop-ups to open the print report.");
  const forecastHtml = data.kpis.forecastReady
    ? `<h2>18-Month Cash Flow Forecast</h2>${htmlTable(["Month", "Revenue", "Expenses", "Net", "Funding", "Closing cash"], data.series.map((r) => [r.month, money(r.revenue), money(r.expenses), money(r.net), money(r.funding), money(r.cash)]))}<div class="two"><section><h2>Revenue Mix</h2>${htmlTable(["Stream", "12-month value"], data.revenueMix.map((r) => [r.name, money(r.value)]))}</section><section><h2>Expense Breakdown</h2>${htmlTable(["Category", "12-month value"], data.expenseBreakdown.map((r) => [r.category, money(r.value)]))}</section></div>`
    : `<h2>18-Month Cash Flow Forecast</h2><p>Not calculated — minimum verified inputs are not active.</p>`;
  popup.document.write(`<!doctype html><html><head><title>KLPS Financial Report</title><style>@page{size:A4;margin:14mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#222831;margin:0;font-size:10px}header{background:#222831;color:white;padding:24px 28px;border-bottom:5px solid #ef9f32}header small{color:#ef9f32;font-weight:bold;letter-spacing:.18em}h1{font-size:27px;margin:8px 0}h2{font-size:15px;margin:24px 0 8px;border-left:3px solid #ef9f32;padding-left:8px;break-after:avoid}p{color:#5f6872}table{width:100%;border-collapse:collapse;margin-bottom:14px;break-inside:auto}thead{display:table-header-group}tr{break-inside:avoid}th{background:#222831;color:white;text-align:left;padding:6px}td{padding:6px;border-bottom:1px solid #dfe3e6}tbody tr:nth-child(even){background:#f5f6f7}.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}.two section{break-inside:avoid}footer{margin-top:20px;border-top:1px solid #ddd;padding-top:8px;color:#777}@media print{button{display:none}}</style></head><body><header><small>${escapeHtml(data.company.legalName)} · FINANCE OS</small><h1>Financial Report</h1><p style="color:#ef9f32;font-weight:bold">Early-stage model — evidence collection in progress</p><p style="color:#dce0e3">Generated ${escapeHtml(reportDate(data.generatedAt))}</p></header><main><h2>Executive Summary</h2>${htmlTable(["Metric", "Value"], summaryRows(data))}<h2>Company</h2>${htmlTable(["Field", "Verified company information"], companyRows(data.company))}${forecastHtml}<h2>Core Assumptions</h2>${htmlTable(["Assumption", "Value", "Status", "Confidence", "Evidence level"], data.assumptions.map((a) => [a.name, assumptionValue(a), a.status, a.confidence ? `${a.confidence}/100` : "Not yet evidenced", a.confidenceLevel]))}<h2>Funding Schedule</h2>${htmlTable(["Funding", "Type", "Amount", "Date", "Status"], data.funding.map((f) => [f.name, f.type, money(f.amount), f.date, f.status]))}<h2>Hiring Plan</h2>${htmlTable(["Role", "Department", "Salary", "Start", "Status"], data.hires.map((h) => [h.role, h.department, money(h.salary), h.startDate, h.status]))}<h2>Key Risks</h2>${htmlTable(["Risk", "Probability", "Impact", "Status", "Mitigation"], data.risks.map((r) => [r.risk, percent(r.probability), String(r.impact), r.status, r.mitigation]))}</main><footer>KLPS Investor Financial Report · Generated from the live Finance OS model</footer></body></html>`);
  popup.document.close();
  popup.focus();
  popup.setTimeout(() => popup.print(), 250);
}
