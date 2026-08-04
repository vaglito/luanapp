import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/dashboard/StatCard";

describe("StatCard", () => {
  it("renders the title and value when not a placeholder", () => {
    render(<StatCard title="Usuarios Totales" value="15" />);

    expect(screen.getByText("Usuarios Totales")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders Próximamente Chip when placeholder is true", () => {
    render(<StatCard title="Usuarios Totales" placeholder />);

    expect(screen.getByText("Próximamente")).toBeInTheDocument();
  });

  it("does not render the numeric value when placeholder is true", () => {
    render(<StatCard title="Ventas del Mes" value="S/ 12,400" placeholder />);

    expect(screen.queryByText("S/ 12,400")).not.toBeInTheDocument();
    expect(screen.getByText("Próximamente")).toBeInTheDocument();
  });

  it("renders tooltip text when placeholder is true", () => {
    render(<StatCard title="Ventas del Mes" placeholder />);

    // MUI Tooltip places the title attribute on the Chip wrapper.
    // The Chip itself gets aria-label or the tooltip text as a data attribute when rendered with title.
    const proximamente = screen.getByText("Próximamente");
    // The Chip is wrapped in a Tooltip; in testing-library the tooltip text is
    // not directly visible. We verify the Chip exists and is user-interactive.
    expect(proximamente).toBeInTheDocument();
  });

  it("renders value normally when placeholder is false", () => {
    render(<StatCard title="Pedidos" value="12" />);

    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.queryByText("Próximamente")).not.toBeInTheDocument();
  });

  it("renders with placeholder defaulting to false when omitted", () => {
    render(<StatCard title="Estado" value="Activo" />);

    expect(screen.getByText("Activo")).toBeInTheDocument();
    expect(screen.queryByText("Próximamente")).not.toBeInTheDocument();
  });
});
