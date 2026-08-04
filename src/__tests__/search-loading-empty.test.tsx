import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";

// ── Mock next/navigation —──────────────────────────────────────────
let searchParamsValue: URLSearchParams;

vi.mock("next/navigation", () => ({
  useSearchParams: () => searchParamsValue,
  usePathname: () => "/buscar",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

import { SearchLoadingProgress } from "@/components/catalog/product/search/search-loading-progress";

// ── Mock product services —─────────────────────────────────────────
const mockFetchProductSearchList = vi.fn();
const mockFetchExchangeRate = vi.fn();

vi.mock("@/services/catalog/products", () => ({
  fetchProductSearchList: (...args: any[]) => mockFetchProductSearchList(...args),
}));

vi.mock("@/services/catalog/exchangeRate", () => ({
  fetchExchangeRate: (...args: any[]) => mockFetchExchangeRate(...args),
}));

import { ProductResultList } from "@/components/catalog/product/search/product-result-list";

describe("SearchLoadingProgress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    searchParamsValue = new URLSearchParams();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not show LinearProgress before 300ms", () => {
    const { rerender } = render(<SearchLoadingProgress />);

    // Change search params (simulate user changing a filter)
    searchParamsValue = new URLSearchParams("query=test");
    rerender(<SearchLoadingProgress />);

    // Advance 200ms — still under the 300ms debounce threshold
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // LinearProgress should NOT be visible yet
    expect(
      document.querySelector(".MuiLinearProgress-root")
    ).toBeNull();
  });

  it("shows LinearProgress after 300ms debounce", () => {
    const { rerender } = render(<SearchLoadingProgress />);

    // Change search params
    searchParamsValue = new URLSearchParams("ordering=price_sale");
    rerender(<SearchLoadingProgress />);

    // Advance past the 300ms debounce threshold
    act(() => {
      vi.advanceTimersByTime(301);
    });

    // LinearProgress should now be visible
    expect(
      document.querySelector(".MuiLinearProgress-root")
    ).toBeInTheDocument();
  });

  it("hides the indicator when new params arrive before debounce fires", () => {
    const { rerender } = render(<SearchLoadingProgress />);

    // First param change
    searchParamsValue = new URLSearchParams("marca=nike");
    rerender(<SearchLoadingProgress />);

    // 200ms later, another param change (user clicks another filter)
    act(() => {
      vi.advanceTimersByTime(200);
    });
    searchParamsValue = new URLSearchParams("marca=nike,adidas");
    rerender(<SearchLoadingProgress />);

    // Advance past the 300ms window from the SECOND change
    act(() => {
      vi.advanceTimersByTime(301);
    });

    // Should show after the second change settles
    expect(
      document.querySelector(".MuiLinearProgress-root")
    ).toBeInTheDocument();
  });

  it("auto-hides after 5 seconds", () => {
    const { rerender } = render(<SearchLoadingProgress />);

    searchParamsValue = new URLSearchParams("query=x");
    rerender(<SearchLoadingProgress />);

    // Show the indicator
    act(() => {
      vi.advanceTimersByTime(301);
    });
    expect(
      document.querySelector(".MuiLinearProgress-root")
    ).toBeInTheDocument();

    // Advance past the 5s auto-hide
    act(() => {
      vi.advanceTimersByTime(5001);
    });

    expect(
      document.querySelector(".MuiLinearProgress-root")
    ).toBeNull();
  });
});

describe("ProductResultList — empty state", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders EmptyState when search returns zero results", async () => {
    mockFetchProductSearchList.mockResolvedValue({
      results: [],
      count: 0,
    });
    mockFetchExchangeRate.mockResolvedValue({
      exchange: 1.0,
    });

    // ProductResultList is an async server component
    const element = await ProductResultList({
      query: "nonexistent",
      page: 1,
    });

    render(element as React.ReactElement);

    // EmptyState title
    expect(
      screen.getByText('Sin resultados para "nonexistent"')
    ).toBeInTheDocument();

    // EmptyState description
    expect(
      screen.getByText(/No encontramos productos que coincidan con tu búsqueda/i)
    ).toBeInTheDocument();

    // Primary action — "Volver al catálogo"
    const primaryLink = screen.getByRole("link", {
      name: /Volver al catálogo/i,
    });
    expect(primaryLink).toHaveAttribute("href", "/productos");

    // Secondary action — "Limpiar filtros"
    const secondaryLink = screen.getByRole("link", {
      name: /Limpiar filtros/i,
    });
    expect(secondaryLink).toHaveAttribute("href", "/buscar");
  });

  it("both action buttons are present in the empty state", async () => {
    mockFetchProductSearchList.mockResolvedValue({
      results: [],
      count: 0,
    });
    mockFetchExchangeRate.mockResolvedValue({
      exchange: 1.0,
    });

    const element = await ProductResultList({
      query: "empty",
      page: 1,
    });

    render(element as React.ReactElement);

    // Both actions should be rendered
    expect(
      screen.getByRole("link", { name: /Volver al catálogo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Limpiar filtros/i })
    ).toBeInTheDocument();
  });
});
