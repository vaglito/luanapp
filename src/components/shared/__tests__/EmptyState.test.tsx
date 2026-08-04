import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { EmptyState } from "@/components/shared/EmptyState";

describe("EmptyState", () => {
  it("renders the title (message)", () => {
    render(
      <EmptyState
        title="Sin resultados para test"
        description="No se encontraron productos."
      />
    );
    expect(
      screen.getByText("Sin resultados para test")
    ).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(
      <EmptyState
        title="Título"
        description="Descripción de prueba"
      />
    );
    expect(
      screen.getByText("Descripción de prueba")
    ).toBeInTheDocument();
  });

  it("renders the default primary action button", () => {
    render(
      <EmptyState
        title="Título"
        description="Descripción"
      />
    );
    expect(
      screen.getByRole("link", { name: /Volver al catálogo/i })
    ).toBeInTheDocument();
  });

  it("renders both primary and secondary actions when provided", () => {
    render(
      <EmptyState
        title="Título"
        description="Descripción"
        primaryAction={{ label: "Ir al inicio", href: "/" }}
        secondaryAction={{ label: "Limpiar filtros", onClick: () => {} }}
      />
    );
    expect(
      screen.getByRole("link", { name: /Ir al inicio/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Limpiar filtros/i })
    ).toBeInTheDocument();
  });

  it("primary action link has the correct href", () => {
    render(
      <EmptyState
        title="Título"
        description="Descripción"
        primaryAction={{ label: "Explorar Catálogo", href: "/productos" }}
      />
    );
    const link = screen.getByRole("link", { name: /Explorar Catálogo/i });
    expect(link).toHaveAttribute("href", "/productos");
  });

  it("secondary action fires onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="Título"
        description="Descripción"
        secondaryAction={{ label: "Limpiar", onClick: handleClick }}
      />
    );

    const button = screen.getByRole("button", { name: /Limpiar/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders a custom icon when provided", () => {
    render(
      <EmptyState
        title="Título"
        description="Descripción"
        icon={<span data-testid="custom-icon">🎨</span>}
      />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("does not render secondary action when not provided", () => {
    render(
      <EmptyState
        title="Título"
        description="Descripción"
      />
    );
    // Primary action with href renders inside a link (anchor tag wrapping a button)
    expect(
      screen.getByRole("link", { name: /Volver al catálogo/i })
    ).toBeInTheDocument();
    // Secondary action should NOT be present
    expect(
      screen.queryByRole("button", { name: /Limpiar filtros/i })
    ).not.toBeInTheDocument();
  });

  it("renders primary action as button when onClick is used instead of href", () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="Título"
        description="Descripción"
        primaryAction={{ label: "Hacer algo", onClick: handleClick }}
      />
    );
    const button = screen.getByRole("button", { name: /Hacer algo/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
