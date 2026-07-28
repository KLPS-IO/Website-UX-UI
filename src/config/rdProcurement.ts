export const PROCUREMENT_STATUSES = [
  "Research",
  "Verified",
  "Contacted",
  "Discovery Meeting",
  "RFQ Sent",
  "Quote Received",
  "Comparison",
  "Selected",
  "Closed",
] as const;

export type ProcurementStatus = (typeof PROCUREMENT_STATUSES)[number];

export const SUPPLIER_CATEGORIES = [
  "Academic & Research Organisation",
  "Commercial Smart Textile Developer",
  "Conductive Textile & Fibre Supplier",
  "Graphene Material Specialist",
  "Printed Electronics Specialist",
  "Textile Testing Laboratory",
  "Prototype Integration Partner",
] as const;

export const WP1_SUPPLIER_VERIFICATION_SPRINT = [
  {
    canonicalName: "The University of Manchester",
    displayName: "University of Manchester / GEIC",
  },
  {
    canonicalName: "Henry Royce Institute",
    displayName: "Henry Royce Institute",
  },
  {
    canonicalName: "Interactive Wear AG",
    displayName: "Interactive Wear",
  },
  {
    canonicalName: "Ohmatex A/S",
    displayName: "Ohmatex",
  },
] as const;

export const EVIDENCE_LED_RESEARCH_NOTE_TEMPLATE = `Verified:

Supplier to Confirm:

Unknown:`;

export const procurementStatusRank = (value: unknown) => {
  const index = PROCUREMENT_STATUSES.indexOf(value as ProcurementStatus);
  return index === -1 ? 0 : index;
};
