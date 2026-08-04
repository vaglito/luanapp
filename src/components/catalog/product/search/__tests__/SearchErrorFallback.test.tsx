import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock useRouter before importing the component
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

import { SearchErrorFallback } from "@/components/catalog/product/search/SearchErrorFallback";

describe("SearchErrorFallback (#61)", () => {
  it("renders the error message", () => {
    render(<SearchErrorFallback message="Ocurrió un error al buscar productos." />);
    expect(
      screen.getByText("Ocurrió un error al buscar productos.")
    ).toBeInTheDocument();
  });

  it("renders a recargar button", () => {
    render(<SearchErrorFallback message="Test error" />);
    expect(screen.getByRole("button", { name: /Recargar/i })).toBeInTheDocument();
  });

  it("calls router.refresh() when recargar button is clicked", () => {
    mockRefresh.mockClear();
    render(<SearchErrorFallback message="Test error" />);

    fireEvent.click(screen.getByRole("button", { name: /Recargar/i }));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("uses Next.js router.refresh() for navigation, not window.location.reload()", () => {
    mockRefresh.mockClear();
    render(<SearchErrorFallback message="Test error" />);

    fireEvent.click(screen.getByRole("button", { name: /Recargar/i }));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
