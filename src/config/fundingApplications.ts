export type FundingApplicationStatus = "Submitted / Historical" | "Empty application workspace" | "In development" | "Submitted";
export type FundingApplicationVisibility = "investor_nda" | "founder_admin";

export type FundingDocumentReference = {
  role: "final_submitted_version" | "supporting_document" | "working_draft";
  filename: string;
  label: string;
  sha256?: string;
};

export type FundingApplication = {
  id: string;
  programme: string;
  applicationName: string;
  status: FundingApplicationStatus;
  visibility: FundingApplicationVisibility;
  submissionDate: string | null;
  fundingAmount: number | null;
  version: string;
  sections: readonly [];
  supportingDocuments: readonly FundingDocumentReference[];
  workingDrafts: readonly FundingDocumentReference[];
  finalSubmittedVersion: FundingDocumentReference | null;
};

const innovateUkSubmission: FundingDocumentReference = {
  role: "final_submitted_version",
  filename: "Innovation Funding Application.pdf",
  label: "Original submitted application",
  sha256: "7a4944981518b0eadf97965b60f2cda561a0f60dc0f727761cc686de895e0dd3",
};

export const fundingApplications: readonly FundingApplication[] = [
  {
    id: "innovate-uk-historical",
    programme: "Innovate UK",
    applicationName: "Innovation Funding Application",
    status: "Submitted / Historical",
    visibility: "investor_nda",
    submissionDate: null,
    fundingAmount: null,
    version: "Original submission",
    sections: [],
    supportingDocuments: [],
    workingDrafts: [],
    finalSubmittedVersion: innovateUkSubmission,
  },
  {
    id: "eu-women-tech-eu",
    programme: "Women TechEU",
    applicationName: "EU Women",
    status: "Empty application workspace",
    visibility: "founder_admin",
    submissionDate: null,
    fundingAmount: null,
    version: "Not started",
    sections: [],
    supportingDocuments: [],
    workingDrafts: [],
    finalSubmittedVersion: null,
  },
] as const;

export const visibleFundingApplications = (isFounderAdmin: boolean) =>
  fundingApplications.filter((application) => application.visibility === "investor_nda" || isFounderAdmin);
