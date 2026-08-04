import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock useRouter
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

import GlobalError from "@/app/error";
import ProductosError from "@/app/(site)/productos/error";
import MarcasError from "@/app/(site)/marcas/error";

describe("Global error boundary", () => {
  it("renders error message and retry buttons", () => {
    render(<GlobalError error={new Error("test")} reset={() => {}} />);

    expect(screen.getByText("Error inesperado")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ocurrió un error inesperado. Por favor, intenta de nuevo."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reintentar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Recargar/i })
    ).toBeInTheDocument();
  });

  it("Renders Alert with error severity", () => {
    render(<GlobalError error={new Error("test")} reset={() => {}} />);

    // MUI Alert with severity="error" renders with role="alert"
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("Reintentar button calls reset()", () => {
    const mockReset = vi.fn();
    render(<GlobalError error={new Error("test")} reset={mockReset} />);

    fireEvent.click(screen.getByRole("button", { name: /Reintentar/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("Recargar button calls router.refresh()", () => {
    mockRefresh.mockClear();
    render(<GlobalError error={new Error("test")} reset={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /Recargar/i }));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});

describe("Route error boundaries", () => {
  it("Productos error renders with correct messages and buttons", () => {
    render(<ProductosError error={new Error("test")} reset={() => {}} />);

    expect(screen.getByText("Error al cargar productos")).toBeInTheDocument();
    expect(
      screen.getByText(
        "No se pudieron cargar los productos. Por favor, intenta de nuevo."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reintentar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Recargar/i })
    ).toBeInTheDocument();
  });

  it("Marcas error renders with correct messages and buttons", () => {
    render(<MarcasError error={new Error("test")} reset={() => {}} />);

    expect(screen.getByText("Error al cargar marcas")).toBeInTheDocument();
    expect(
      screen.getByText(
        "No se pudieron cargar las marcas. Por favor, intenta de nuevo."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reintentar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Recargar/i })
    ).toBeInTheDocument();
  });
});
