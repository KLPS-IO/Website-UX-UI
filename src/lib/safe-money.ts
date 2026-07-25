export function toFiniteMoney(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  if (typeof value !== "number" && typeof value !== "string") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function sumKnownMoney(values: unknown[]): {
  amount: number | null;
  knownCount: number;
  excludedUnknownCount: number;
} {
  const known = values.map(toFiniteMoney).filter((value): value is number => value !== null);
  return {
    amount: known.length
      ? Math.round(known.reduce((total, value) => total + value, 0) * 100) / 100
      : null,
    knownCount: known.length,
    excludedUnknownCount: values.length - known.length,
  };
}

export function formatMoney(value: unknown, fallback = "Not confirmed"): string {
  const money = toFiniteMoney(value);
  return money === null
    ? fallback
    : new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(money);
}
