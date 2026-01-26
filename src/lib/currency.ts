/**
 * Convert dollars to soles using a exchange rate.
 * @param usdAmount 
 * @param exchangeRate 
 * @returns 
 */

export function convertUsdToPen(
  usdAmount: number,
  exchangeRate: number
): number {
  return parseFloat((usdAmount * exchangeRate).toFixed(2));
}
