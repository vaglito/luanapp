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

beforeEach(() => {
  useCart.setState({ items: [] });
});

// ============================================================
// addItem
// ============================================================

describe("addItem", () => {
  it("succeeds when quantity is within stock", () => {
    const product = makeProduct({ totalStock: 10 });
    useCart.getState().addItem(product, 3);
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(3);
  });

  it("blocks mutation when quantity exceeds stock (new item)", () => {
    const product = makeProduct({ totalStock: 3 });
    useCart.getState().addItem(product, 5);
    expect(useCart.getState().items).toHaveLength(0);
  });

  it("blocks mutation when total quantity exceeds stock (existing item)", () => {
    const product = makeProduct({ totalStock: 5 });
    useCart.getState().addItem(product, 3);
    expect(useCart.getState().items[0].quantity).toBe(3);

    useCart.getState().addItem(product, 3);
    expect(useCart.getState().items[0].quantity).toBe(3);
  });

  it("defaults quantity to 1 when not provided", () => {
    const product = makeProduct({ totalStock: 10 });
    useCart.getState().addItem(product);
    expect(useCart.getState().items[0].quantity).toBe(1);
  });

  it("stacks multiple distinct products", () => {
    const p1 = makeProduct({ totalStock: 10 });
    const p2 = makeProduct({ totalStock: 10, productId: "P002" });
    (p2 as { id: number }).id = 2;

    useCart.getState().addItem(p1, 2);
    useCart.getState().addItem(p2, 1);

    expect(useCart.getState().items).toHaveLength(2);
    expect(useCart.getState().items[0].quantity).toBe(2);
    expect(useCart.getState().items[1].quantity).toBe(1);
  });

  it("updates quantity when adding to an existing item within stock", () => {
    const product = makeProduct({ totalStock: 10 });
    useCart.getState().addItem(product, 3);
    useCart.getState().addItem(product, 2); // total 5, within stock 10

    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(5);
  });
});

// ============================================================
// removeItem
// ============================================================

describe("removeItem", () => {
  it("removes an existing item by id", () => {
    const product = makeProduct();
    useCart.getState().addItem(product, 1);
    const id = useCart.getState().items[0].id;

    useCart.getState().removeItem(id);
    expect(useCart.getState().items).toHaveLength(0);
  });

  it("removes only the targeted item, leaves others intact", () => {
    const p1 = makeProduct();
    const p2 = makeProduct({ productId: "P002" });
    (p2 as { id: number }).id = 2;

    useCart.getState().addItem(p1, 1);
    useCart.getState().addItem(p2, 2);
    const id1 = useCart.getState().items[0].id;

    useCart.getState().removeItem(id1);

    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(2);
  });
});

// ============================================================
// updatedItemQuantity
// ============================================================

describe("updatedItemQuantity", () => {
  it("blocks setting quantity above stock", () => {
    const product = makeProduct({ totalStock: 4 });
    useCart.getState().addItem(product, 2);
    const itemId = useCart.getState().items[0].id;

    useCart.getState().updatedItemQuantity(itemId, 6);
    expect(useCart.getState().items[0].quantity).toBe(2);
  });

  it("blocks setting quantity below 1", () => {
    const product = makeProduct({ totalStock: 10 });
    useCart.getState().addItem(product, 3);
    const itemId = useCart.getState().items[0].id;

    useCart.getState().updatedItemQuantity(itemId, 0);
    expect(useCart.getState().items[0].quantity).toBe(3);
  });

  it("allows valid quantity changes", () => {
    const product = makeProduct({ totalStock: 10 });
    useCart.getState().addItem(product, 1);
    const itemId = useCart.getState().items[0].id;

    useCart.getState().updatedItemQuantity(itemId, 5);
    expect(useCart.getState().items[0].quantity).toBe(5);
  });

  it("is a no-op for a non-existent id", () => {
    useCart.getState().updatedItemQuantity(999, 5);
    expect(useCart.getState().items).toHaveLength(0);
  });
});

// ============================================================
// removeAll
// ============================================================

describe("removeAll", () => {
  it("clears all items from the cart", () => {
    const p1 = makeProduct();
    const p2 = makeProduct({ productId: "P002" });
    (p2 as { id: number }).id = 2;

    useCart.getState().addItem(p1, 1);
    useCart.getState().addItem(p2, 2);
    expect(useCart.getState().items).toHaveLength(2);

    useCart.getState().removeAll();
    expect(useCart.getState().items).toHaveLength(0);
  });
});

// ============================================================
// Store action shape
// ============================================================

describe("useCart store actions", () => {
  it("exposes addItem, removeItem, updatedItemQuantity, and removeAll", () => {
    const state = useCart.getState();

    expect(state).toHaveProperty("addItem");
    expect(state).toHaveProperty("removeItem");
    expect(state).toHaveProperty("updatedItemQuantity");
    expect(state).toHaveProperty("removeAll");
    expect(typeof state.addItem).toBe("function");
    expect(typeof state.removeItem).toBe("function");
    expect(typeof state.updatedItemQuantity).toBe("function");
    expect(typeof state.removeAll).toBe("function");
  });
});
