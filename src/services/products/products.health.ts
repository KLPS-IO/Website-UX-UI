import type { Product } from "@/types/finance";

export function productHealth(product: Product): string[] {
  const warnings: string[] = [];

  /*
   * Commercial
   */

  if (product.sellingPrice <= 0)
    warnings.push("Selling price not set");

  if (product.subscriptionMonthly < 0)
    warnings.push("Subscription price is invalid");

  /*
   * Manufacturing
   */

  if (product.mfgCost <= 0)
    warnings.push("Manufacturing cost missing");

  if (product.packaging <= 0)
    warnings.push("Packaging cost missing");

  if (product.shipping <= 0)
    warnings.push("Shipping estimate required");

  if (!product.supplier.trim())
    warnings.push("Supplier not assigned");

  if (!product.manufacturingMethod.trim())
    warnings.push("Manufacturing method missing");

  if (product.minimumOrderQuantity <= 0)
    warnings.push("MOQ not defined");

  if (product.leadTimeWeeks <= 0)
    warnings.push("Lead time not defined");

  /*
   * Evidence
   */

  if (product.confidence < 70)
    warnings.push("Confidence below target");

  if (product.evidenceIds.length === 0)
    warnings.push("No supporting evidence");

  /*
   * Ownership
   */

  if (!product.owner.trim())
    warnings.push("Owner not assigned");

  if (!product.lastReviewed.trim())
    warnings.push("Review date missing");

  return warnings;
}