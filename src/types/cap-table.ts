export type ShareClass = "Ordinary";

export interface CapTableHolding {
  shareholder: string;
  shareClass: ShareClass;
  sharesHeld: number;
  nominalValuePerShare: number;
  amountPaid: number;
  amountUnpaid: number;
  dateIssued: string;
  notes: string;
}

export interface EquityInstrumentStatus {
  optionPool: "Not established";
  employeeOptions: "None issued";
  convertibleNotes: "None";
  safes: "None";
  warrants: "None";
  preferenceShares: "None";
  externalInvestors: "None";
}

export interface CapTableSnapshot {
  company: {
    legalName: string;
    tradingName: string;
    companyNumber: string;
    incorporationDate: string;
  };
  version: string;
  effectiveDate: string;
  currency: "GBP";
  status: "Current";
  holdings: CapTableHolding[];
  equityInstruments: EquityInstrumentStatus;
  rights: {
    voting: string;
    dividends: string;
    distributions: string;
  };
  evidence: {
    title: string;
    includes: string[];
    sourceOrganisation: string;
    status: string;
  };
  audit: {
    preparedFor: string;
    documentOwner: string;
    changeReason: string;
    nextReview: string;
  };
}

export interface CalculatedHolding extends CapTableHolding {
  votingOwnership: number;
  fullyDilutedOwnership: number;
}

export interface CalculatedCapTable extends CapTableSnapshot {
  calculatedHoldings: CalculatedHolding[];
  totals: {
    shareholders: number;
    sharesIssued: number;
    nominalShareCapital: number;
    amountPaid: number;
    amountUnpaid: number;
    fullyDilutedShares: number;
  };
}
