import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock toast before store import
vi.mock("nextjs-toast-notify", () => ({
  showToast: {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
  },
}));

import { useCart } from "@/hooks/use-cart";
import type { Products } from "@/types/products.type";

function makeProduct(overrides: Partial<Products["relay"]> = {}): Products {
  return {
    id: Math.floor(Math.random() * 10000),
    isActive: true,
    slug: "smoke-test-product",
    relay: {
      productId: "SMOKE001",
      productName: "Smoke Test Product",
      classificationCode: {
        brandCode: "B1",
        brandName: "SmokeBrand",
        brands: "SmokeBrand",
      },
      categoryCode: {
        categoryCode: "SC1",
        categoryName: "SmokeCat",
        categoryWeb: "smoke",
      },
      subcategoryCode: {
        subcategoryCode: "SS1",
        subcategoryName: "SmokeSub",
        subcategoryweb: "smoke",
      },
      priceSale: 100,
      priceBulk: 80,
      totalStock: 5,
      ...overrides,
    },
    productsimages: [],
  };
}

describe("useCart smoke — realistic scenarios", () => {
  beforeEach(() => {
    useCart.setState({ items: [] });
  });

  it("prevents stock overflow in a realistic add-then-overflow flow", () => {
    const product = makeProduct({ totalStock: 3 });

    // Step 1: Add 2 units normally
    useCart.getState().addItem(product, 2);
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(2);

    // Step 2: Try to add 2 more (would reach 4, exceeding stock 3)
    useCart.getState().addItem(product, 2);
    expect(useCart.getState().items[0].quantity).toBe(2); // unchanged

    // Step 3: Add 1 more (would reach exactly 3, within stock)
    useCart.getState().addItem(product, 1);
    expect(useCart.getState().items[0].quantity).toBe(3);

    // Step 4: Try to add 1 more (would reach 4, exceeding stock)
    useCart.getState().addItem(product, 1);
    expect(useCart.getState().items[0].quantity).toBe(3); // blocked
  });

  it("handles multiple different products independently", () => {
    const cpu = makeProduct({ totalStock: 2, productName: "CPU" });
    const gpu = makeProduct({ totalStock: 10, productName: "GPU" });

    // Add within stock for both
    useCart.getState().addItem(cpu, 1);
    useCart.getState().addItem(gpu, 5);

    expect(useCart.getState().items).toHaveLength(2);
    expect(useCart.getState().items[0].quantity).toBe(1);
    expect(useCart.getState().items[1].quantity).toBe(5);

    // Try to overflow CPU
    useCart.getState().addItem(cpu, 5); // would reach 6, stock is 2
    expect(useCart.getState().items[0].quantity).toBe(1); // CPU unchanged

    // GPU still within stock
    useCart.getState().addItem(gpu, 5); // reaches exactly 10
    expect(useCart.getState().items[1].quantity).toBe(10);
  });

  it("updatedItemQuantity respects stock limits in quantity adjustment flow", () => {
    const product = makeProduct({ totalStock: 5 });
    useCart.getState().addItem(product, 2);
    const itemId = useCart.getState().items[0].id;

    // Valid: update to 5 (exact stock)
    useCart.getState().updatedItemQuantity(itemId, 5);
    expect(useCart.getState().items[0].quantity).toBe(5);

    // Invalid: update to 6 (over stock)
    useCart.getState().updatedItemQuantity(itemId, 6);
    expect(useCart.getState().items[0].quantity).toBe(5);

    // Invalid: update to 0 (below minimum)
    useCart.getState().updatedItemQuantity(itemId, 0);
    expect(useCart.getState().items[0].quantity).toBe(5);

    // Valid: update to 3
    useCart.getState().updatedItemQuantity(itemId, 3);
    expect(useCart.getState().items[0].quantity).toBe(3);
  });
});
