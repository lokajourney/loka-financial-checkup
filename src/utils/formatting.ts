/**
 * Format a number as Indonesian Rupiah.
 * Example: 1500000 → "Rp 1.500.000"
 */
export function formatRp(value: number): string {
  if (value === 0) return 'Rp 0';
  return 'Rp ' + Math.round(value).toLocaleString('id-ID');
}

/**
 * Format a decimal as a percentage with one decimal.
 * Example: 15.3456 → "15,3%"
 */
export function formatPct(value: number): string {
  return (Math.round(value * 10) / 10).toLocaleString('id-ID') + '%';
}

/**
 * Format months with one decimal.
 * Example: 4.25 → "4,3"
 */
export function formatMonths(value: number): string {
  return (Math.round(value * 10) / 10).toLocaleString('id-ID');
}

/**
 * Parse a string or number input to a raw number, stripping
 * non-numeric characters (commas, dots used as thousand separators).
 */
export function parseAmount(value: string | number): number {
  if (typeof value === 'number') return value;
  const cleaned = String(value).replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}
