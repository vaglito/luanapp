import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock useRouter
const mockRefresh = vi.fn();
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
    push: mockPush,
  }),
}));

import ProformasLoading from "@/app/(private)/dashboard/proformas/loading";
import ProformasError from "@/app/(private)/dashboard/proformas/error";

describe("Proformas loading.tsx (#66)", () => {
  it("renders a loading indicator", () => {
    render(<ProformasLoading />);
    expect(screen.getByText("Cargando proformas...")).toBeInTheDocument();
  });

  it("renders skeleton placeholders", () => {
    const { container } = render(<ProformasLoading />);
    // MUI Skeleton renders <span class="MuiSkeleton-root">
    const skeletons = container.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});

describe("Proformas error.tsx (#66)", () => {
  it("renders an error message", () => {
    const testError = new Error("Test fetch error") as Error & { digest?: string };
    testError.digest = "abc123";
    const mockReset = vi.fn();

    render(<ProformasError error={testError} reset={mockReset} />);
    expect(
      screen.getByText("Error al cargar proformas")
    ).toBeInTheDocument();
  });

  it("renders a Reintentar button that calls reset()", () => {
    const testError = new Error("Test fetch error") as Error & { digest?: string };
    testError.digest = "abc123";
    const mockReset = vi.fn();

    render(<ProformasError error={testError} reset={mockReset} />);
    const retryBtn = screen.getByRole("button", { name: /Reintentar/i });
    fireEvent.click(retryBtn);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("renders a Recargar button that calls router.refresh()", () => {
    mockRefresh.mockClear();
    const testError = new Error("Test fetch error") as Error & { digest?: string };
    testError.digest = "abc123";
    const mockReset = vi.fn();

    render(<ProformasError error={testError} reset={mockReset} />);
    const reloadBtn = screen.getByRole("button", { name: /Recargar/i });
    fireEvent.click(reloadBtn);
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
