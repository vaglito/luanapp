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
    id: 1,
    isActive: true,
    slug: "test-product",
    relay: {
      productId: "P001",
      productName: "Test Product",
      classificationCode: { brandCode: "B1", brandName: "TestBrand", brands: "TestBrand" },
      categoryCode: { categoryCode: "C1", categoryName: "TestCat", categoryWeb: "test" },
      subcategoryCode: { subcategoryCode: "S1", subcategoryName: "TestSub", subcategoryweb: "test" },
      priceSale: 100,
      priceBulk: 80,
      totalStock: 5,
      ...overrides,
    },
    productsimages: [],
  };
}

describe("useCart stock guard", () => {
  beforeEach(() => {
    // Reset store state between tests
    useCart.setState({ items: [] });
  });

  it("addItem succeeds when quantity is within stock", () => {
    const product = makeProduct({ totalStock: 10 });
    useCart.getState().addItem(product, 3);
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(3);
  });

  it("addItem blocks mutation when quantity exceeds stock (new item)", () => {
    const product = makeProduct({ totalStock: 3 });
    useCart.getState().addItem(product, 5);
    // Item should NOT be added — items array stays empty
    expect(useCart.getState().items).toHaveLength(0);
  });

  it("addItem blocks mutation when total quantity exceeds stock (existing item)", () => {
    const product = makeProduct({ totalStock: 5 });
    // First, add 3 units
    useCart.getState().addItem(product, 3);
    expect(useCart.getState().items[0].quantity).toBe(3);

    // Try to add 3 more (total would be 6, exceeding stock of 5)
    useCart.getState().addItem(product, 3);
    // Quantity should still be 3 — the overflow was blocked
    expect(useCart.getState().items[0].quantity).toBe(3);
  });

  it("updatedItemQuantity blocks setting quantity above stock", () => {
    const product = makeProduct({ totalStock: 4 });
    useCart.getState().addItem(product, 2);
    const itemId = useCart.getState().items[0].id;

    // Try to set quantity to 6 (> stock of 4)
    useCart.getState().updatedItemQuantity(itemId, 6);
    // Quantity should still be 2
    expect(useCart.getState().items[0].quantity).toBe(2);
  });

  it("updatedItemQuantity blocks setting quantity below 1", () => {
    const product = makeProduct({ totalStock: 10 });
    useCart.getState().addItem(product, 3);
    const itemId = useCart.getState().items[0].id;

    // Try to set quantity to 0
    useCart.getState().updatedItemQuantity(itemId, 0);
    // Quantity should still be 3
    expect(useCart.getState().items[0].quantity).toBe(3);
  });

  it("updatedItemQuantity allows valid quantity changes", () => {
    const product = makeProduct({ totalStock: 10 });
    useCart.getState().addItem(product, 1);
    const itemId = useCart.getState().items[0].id;

    useCart.getState().updatedItemQuantity(itemId, 5);
    expect(useCart.getState().items[0].quantity).toBe(5);
  });
});
