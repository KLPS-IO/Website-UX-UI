import type { CalculatedCapTable, CapTableSnapshot } from "@/types/cap-table";

export const verifiedCapTableSnapshot: CapTableSnapshot = {
  company: {
    legalName: "KIDS, LADIES & PARENTS, SPECIALISTS LTD",
    tradingName: "KLPS",
    companyNumber: "16436591",
    incorporationDate: "2025-05-08",
  },
  version: "1.0",
  effectiveDate: "2025-05-08",
  currency: "GBP",
  status: "Current",
  holdings: [{
    shareholder: "Emma Mendez",
    shareClass: "Ordinary",
    sharesHeld: 1,
    nominalValuePerShare: 1,
    amountPaid: 1,
    amountUnpaid: 0,
    dateIssued: "2025-05-08",
    notes: "Issued on incorporation",
  }],
  equityInstruments: {
    optionPool: "Not established",
    employeeOptions: "None issued",
    convertibleNotes: "None",
    safes: "None",
    warrants: "None",
    preferenceShares: "None",
    externalInvestors: "None",
  },
  rights: {
    voting: "Full voting rights",
    dividends: "Full rights to dividends",
    distributions: "Full rights to distributions",
  },
  evidence: {
    title: "Application to Register a Company (IN01)",
    includes: ["Statement of Capital", "Initial Shareholdings", "Person with Significant Control information"],
    sourceOrganisation: "Companies House",
    status: "Verified source document",
  },
  audit: {
    preparedFor: "KLPS Ltd",
    documentOwner: "Emma Mendez",
    changeReason: "Initial canonical cap table based on Companies House incorporation filings",
    nextReview: "After any share issue, transfer, investment, option grant or capital restructuring",
  },
};

export function calculateCapTable(snapshot: CapTableSnapshot): CalculatedCapTable {
  const sharesIssued = snapshot.holdings.reduce((sum, holding) => sum + holding.sharesHeld, 0);
  const optionShares = 0;
  const fullyDilutedShares = sharesIssued + optionShares;
  const calculatedHoldings = snapshot.holdings.map((holding) => ({
    ...holding,
    votingOwnership: sharesIssued ? holding.sharesHeld / sharesIssued : 0,
    fullyDilutedOwnership: fullyDilutedShares ? holding.sharesHeld / fullyDilutedShares : 0,
  }));
  return {
    ...snapshot,
    calculatedHoldings,
    totals: {
      shareholders: new Set(snapshot.holdings.map((holding) => holding.shareholder)).size,
      sharesIssued,
      nominalShareCapital: snapshot.holdings.reduce((sum, holding) => sum + holding.sharesHeld * holding.nominalValuePerShare, 0),
      amountPaid: snapshot.holdings.reduce((sum, holding) => sum + holding.amountPaid, 0),
      amountUnpaid: snapshot.holdings.reduce((sum, holding) => sum + holding.amountUnpaid, 0),
      fullyDilutedShares,
    },
  };
}

export const capTable = calculateCapTable(verifiedCapTableSnapshot);

const fileDate = () => new Date().toISOString().slice(0, 10);

export async function exportCapTableExcel(model: CalculatedCapTable) {
  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = model.audit.documentOwner;
  workbook.title = "KLPS Capitalisation Table";
  workbook.subject = "Verified incorporation ownership snapshot";
  workbook.created = new Date();

  const styleSheet = (sheet: import("exceljs").Worksheet, widths: number[]) => {
    sheet.columns = widths.map((width) => ({ width }));
    sheet.views = [{ state: "frozen", ySplit: 1 }];
    const header = sheet.getRow(1);
    header.height = 25;
    header.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF222831" } };
      cell.alignment = { vertical: "middle", wrapText: true };
    });
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      row.height = 22;
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", wrapText: true };
        cell.border = { bottom: { style: "hair", color: { argb: "FFDDE1E5" } } };
      });
      if (rowNumber % 2 === 1) row.eachCell((cell) => { cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F6F7" } }; });
    });
  };

  const current = workbook.addWorksheet("Current Cap Table");
  current.addRow(["Shareholder", "Share Class", "Shares Held", "Nominal Value Per Share", "Amount Paid", "Amount Unpaid", "Voting Ownership %", "Fully Diluted Ownership %"]);
  model.holdings.forEach((holding) => current.addRow([holding.shareholder, holding.shareClass, holding.sharesHeld, holding.nominalValuePerShare, holding.amountPaid, holding.amountUnpaid]));
  const totalRow = model.holdings.length + 2;
  current.addRow(["Total", "", { formula: `SUM(C2:C${totalRow - 1})` }, { formula: `SUMPRODUCT(C2:C${totalRow - 1},D2:D${totalRow - 1})` }, { formula: `SUM(E2:E${totalRow - 1})` }, { formula: `SUM(F2:F${totalRow - 1})` }, { formula: `SUM(G2:G${totalRow - 1})` }, { formula: `SUM(H2:H${totalRow - 1})` }]);
  for (let row = 2; row < totalRow; row += 1) {
    current.getCell(`G${row}`).value = { formula: `C${row}/$C$${totalRow}` };
    current.getCell(`H${row}`).value = { formula: `C${row}/$C$${totalRow}` };
  }
  [4, 5, 6].forEach((column) => { current.getColumn(column).numFmt = '£0.00'; });
  [7, 8].forEach((column) => { current.getColumn(column).numFmt = '0.00%'; });
  current.getRow(totalRow).font = { bold: true };
  styleSheet(current, [24, 16, 14, 24, 16, 16, 20, 24]);

  const capital = workbook.addWorksheet("Share Capital");
  capital.addRow(["Field", "Value"]);
  [["Total Shares Issued", model.totals.sharesIssued], ["Share Class", "Ordinary"], ["Currency", model.currency], ["Nominal Value Per Share", 1], ["Total Nominal Share Capital", { formula: "'Current Cap Table'!D3" }], ["Total Paid", model.totals.amountPaid], ["Total Unpaid", model.totals.amountUnpaid]].forEach((row) => capital.addRow(row));
  [5, 6, 7, 8].forEach((row) => { capital.getCell(`B${row}`).numFmt = '£0.00'; });
  styleSheet(capital, [34, 28]);

  const instruments = workbook.addWorksheet("Equity Instruments");
  instruments.addRow(["Instrument", "Status"]);
  [["Option Pool", model.equityInstruments.optionPool], ["Employee Options", model.equityInstruments.employeeOptions], ["Convertible Notes", model.equityInstruments.convertibleNotes], ["SAFEs", model.equityInstruments.safes], ["Warrants", model.equityInstruments.warrants], ["Preference Shares", model.equityInstruments.preferenceShares], ["External Investors", model.equityInstruments.externalInvestors]].forEach((row) => instruments.addRow(row));
  styleSheet(instruments, [28, 28]);

  const changes = workbook.addWorksheet("Change Log");
  changes.addRow(["Version", "Effective Date", "Change Reason", "Updated By"]);
  changes.addRow([model.version, new Date(`${model.effectiveDate}T00:00:00`), model.audit.changeReason, model.audit.documentOwner]);
  changes.getColumn(2).numFmt = "d mmmm yyyy";
  styleSheet(changes, [14, 20, 68, 24]);

  const buffer = await workbook.xlsx.writeBuffer();
  const url = URL.createObjectURL(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `KLPS-Capitalisation-Table-v${model.version}-${fileDate()}.xlsx`;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
