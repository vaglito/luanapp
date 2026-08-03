import { describe, it, expect } from "vitest";
import { getPrice } from "@/lib/getPrice";

describe("getPrice", () => {
  it("returns totalPrice for Computer items", () => {
    const computer = { totalPrice: 3499.9 };
    expect(getPrice(computer)).toBe(3499.9);
  });

  it("returns priceBulk when > 0 for Products items", () => {
    const product = {
      relay: { priceBulk: 120.5, priceSale: 150.0, totalStock: 10 },
    };
    expect(getPrice(product)).toBe(120.5);
  });

  it("falls back to priceSale when priceBulk is 0", () => {
    const product = {
      relay: { priceBulk: 0, priceSale: 150.0, totalStock: 10 },
    };
    expect(getPrice(product)).toBe(150.0);
  });

  it("returns 0 when relay is missing and no totalPrice", () => {
    expect(getPrice({})).toBe(0);
  });

  it("prioritizes totalPrice over relay when both exist", () => {
    const mixed = {
      totalPrice: 500,
      relay: { priceBulk: 300, priceSale: 400, totalStock: 5 },
    };
    expect(getPrice(mixed)).toBe(500);
  });
});
