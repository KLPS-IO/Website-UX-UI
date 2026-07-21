import type { Product } from "@/types/finance";

/*
 * Direct cost of producing one unit.
 */
export function totalUnitCost(product: Product): number {
  return (
    product.mfgCost +
    product.packaging +
    product.shipping
  );
}

/*
 * Gross profit per unit.
 */
export function grossProfit(product: Product): number {
  return (
    product.sellingPrice -
    totalUnitCost(product)
  );
}

/*
 * Gross margin (0–1)
 */
export function grossMargin(product: Product): number {
  if (product.sellingPrice <= 0) return 0;

  return grossProfit(product) / product.sellingPrice;
}

/*
 * Annual subscription revenue per customer.
 */
export function annualSubscriptionRevenue(
  product: Product,
): number {
  return product.subscriptionMonthly * 12;
}

/*
 * First year revenue per customer.
 */
export function firstYearRevenue(
  product: Product,
): number {
  return (
    product.sellingPrice +
    annualSubscriptionRevenue(product)
  );
}

/*
 * Lifetime subscription revenue.
 *
 * Default assumes a 24-month customer lifetime.
 */
export function lifetimeSubscriptionRevenue(
  product: Product,
  months = 24,
): number {
  return product.subscriptionMonthly * months;
}

/*
 * Total lifetime revenue.
 */
export function lifetimeRevenue(
  product: Product,
  months = 24,
): number {
  return (
    product.sellingPrice +
    lifetimeSubscriptionRevenue(product, months)
  );
}