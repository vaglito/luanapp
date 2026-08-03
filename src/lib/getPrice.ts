/**
 * Unified price accessor for cart items.
 * Handles both Computer (totalPrice) and Products (relay.priceBulk/priceSale) shapes.
 */
export function getPrice(
  item: { totalPrice?: number; relay?: { priceBulk: number; priceSale: number } }
): number {
  if ("totalPrice" in item && typeof item.totalPrice === "number") {
    return item.totalPrice;
  }
  const relay = item.relay;
  if (!relay) return 0;
  return relay.priceBulk > 0 ? relay.priceBulk : relay.priceSale;
}
