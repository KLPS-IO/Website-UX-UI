import type { FinancialAssumption } from "@/types/finance";

export function validateAssumption(assumption: FinancialAssumption) {
  return {
    valid:
      assumption.name.trim().length > 0 &&
      Number.isFinite(assumption.value) &&
      assumption.confidence >= 0 &&
      assumption.confidence <= 100,
    warnings: [
      ...(assumption.evidenceIds.length === 0 ? ["No linked evidence"] : []),
      ...(assumption.confidence < 60 ? ["Low confidence"] : []),
    ],
  };
}
