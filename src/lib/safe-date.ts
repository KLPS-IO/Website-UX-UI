const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;

/**
 * Parses canonical ISO dates and timestamps without accepting ambiguous
 * locale strings such as 24/07/2026.
 */
export function parseSafeDate(value: unknown): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : new Date(value.getTime());
  }
  if (typeof value !== "string") return null;

  const input = value.trim();
  if (!input) return null;

  const dateOnly = ISO_DATE.exec(input);
  if (dateOnly) {
    const year = Number(dateOnly[1]);
    const month = Number(dateOnly[2]);
    const day = Number(dateOnly[3]);
    const parsed = new Date(year, month - 1, day);
    return parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
      ? parsed
      : null;
  }

  if (!ISO_TIMESTAMP.test(input)) return null;
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatSafeDate(
  value: unknown,
  fallback = "Not confirmed",
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
): string {
  const parsed = parseSafeDate(value);
  return parsed
    ? new Intl.DateTimeFormat("en-GB", options).format(parsed)
    : fallback;
}

/** A sortable value for valid dates; unknown and malformed values sort last. */
export function safeDateSortValue(value: unknown): number {
  return parseSafeDate(value)?.getTime() ?? Number.POSITIVE_INFINITY;
}

/** Canonical value for an HTML date input, or an empty value when unknown. */
export function safeDateInputValue(value: unknown): string {
  if (typeof value === "string" && ISO_DATE.test(value.trim()) && parseSafeDate(value)) {
    return value.trim();
  }
  const parsed = parseSafeDate(value);
  if (!parsed) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Canonical date value for API fields that require YYYY-MM-DD.
 * Timestamp strings preserve their leading calendar date without timezone conversion.
 */
export function safeApiDateValue(value: unknown): string {
  if (typeof value !== "string") return "";
  const input = value.trim();
  const timestamp = input.includes("T");
  if (timestamp && !ISO_TIMESTAMP.test(input)) return "";
  const candidate = timestamp ? input.slice(0, 10) : input;
  return ISO_DATE.test(candidate) && parseSafeDate(candidate) ? candidate : "";
}

/** Human-readable UK date that preserves the calendar portion supplied by the API. */
export function formatDateOnlyUk(value: unknown, fallback = "Not confirmed"): string {
  const candidate = safeApiDateValue(value);
  if (!candidate) return fallback;
  const [year, month, day] = candidate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
