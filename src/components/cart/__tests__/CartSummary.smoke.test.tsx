import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock useCart with controllable items
const mockItems = vi.fn();
const mockRemoveAll = vi.fn();
vi.mock("@/hooks/use-cart", () => ({
  useCart: () => ({
    items: mockItems(),
    removeAll: mockRemoveAll,
  }),
}));

// Mock currency converter
vi.mock("@/lib/currency", () => ({
  convertUsdToPen: (usd: number, exchange: number) => usd * exchange,
}));

// Mock PDF generation util
vi.mock("@/utils/pdf-proforma", () => ({
  generateProformaPDF: vi.fn(),
}));

import { CartSummary } from "@/components/cart/CartSummary";

describe("CartSummary smoke test", () => {
  beforeEach(() => {
    mockItems.mockReset();
  });

  it("renders Computer and Product items without crashing", () => {
    const computerItem = {
      id: 100,
      totalPrice: 3499.9,
      quantity: 1,
      relay: undefined,
    };

    const productItem = {
      id: 200,
      quantity: 2,
      relay: { priceBulk: 80, priceSale: 100 },
    };

    mockItems.mockReturnValue([computerItem, productItem]);

    render(<CartSummary exchange={3.7} />);

    // Computer: 3499.90 * 1 = 3499.90, Product: 80 * 2 = 160 → totalUSD = 3659.90
    expect(screen.getByText("$3659.90")).toBeInTheDocument();

    // PEN: 3659.90 * 3.7 = 13541.63
    expect(screen.getByText("S/. 13541.63")).toBeInTheDocument();
  });

  it("renders correct prices for Product-only cart", () => {
    const productItem = {
      id: 300,
      quantity: 3,
      relay: { priceBulk: 0, priceSale: 50 },
    };

    mockItems.mockReturnValue([productItem]);

    render(<CartSummary exchange={3.7} />);

    // 50 * 3 = 150
    expect(screen.getByText("$150.00")).toBeInTheDocument();
    expect(screen.getByText("S/. 555.00")).toBeInTheDocument();
  });

  it("renders correct prices for Computer-only cart", () => {
    const computerItem = {
      id: 400,
      totalPrice: 1200,
      quantity: 2,
      relay: undefined,
    };

    mockItems.mockReturnValue([computerItem]);

    render(<CartSummary exchange={3.7} />);

    // 1200 * 2 = 2400
    expect(screen.getByText("$2400.00")).toBeInTheDocument();
    expect(screen.getByText("S/. 8880.00")).toBeInTheDocument();
  });

  it("displays the action buttons", () => {
    mockItems.mockReturnValue([]);

    render(<CartSummary exchange={3.7} />);

    // Verify both action buttons render
    expect(screen.getByText("Descargar Proforma")).toBeInTheDocument();
    expect(screen.getByText("Vaciar carrito")).toBeInTheDocument();
  });

  it("shows zero totals for empty cart", () => {
    mockItems.mockReturnValue([]);

    render(<CartSummary exchange={3.7} />);

    expect(screen.getByText("$0.00")).toBeInTheDocument();
    expect(screen.getByText("S/. 0.00")).toBeInTheDocument();
  });
});
