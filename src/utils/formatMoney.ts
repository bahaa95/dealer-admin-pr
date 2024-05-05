/**
 * Format money
 * @example
 * ```
 * condole.log(formatMoney(1000000)); => 1,000,000
 * ```
 */
export function formatMoney(value: number | bigint): string {
  return new Intl.NumberFormat().format(value);
}
