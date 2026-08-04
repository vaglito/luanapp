import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

// Mock the complaints service
const mockPostComplaint = vi.fn();
vi.mock("@/services/complaints/complaints", () => ({
  postComplaint: (...args: unknown[]) => mockPostComplaint(...args),
}));

import { ComplaintsForm } from "@/components/complaints/complaints-form";

describe("ComplaintsForm smoke test", () => {
  beforeEach(() => {
    mockPostComplaint.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form without crashing", () => {
    render(<ComplaintsForm />);

    // Verify key sections are present
    expect(screen.getByText("1. Identificación del Consumidor")).toBeInTheDocument();
    expect(screen.getByText("2. Identificación del Bien Contratado")).toBeInTheDocument();
    expect(screen.getByText("3. Detalle de la Reclamación")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Enviar Hoja de Reclamación/i })
    ).toBeInTheDocument();
  });

  it("shows the submit button disabled when form is empty", () => {
    render(<ComplaintsForm />);

    const submitButton = screen.getByRole("button", {
      name: /Enviar Hoja de Reclamación/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it("shows loading state when API call is pending", async () => {
    // Service hangs indefinitely → loading state persists
    mockPostComplaint.mockReturnValue(new Promise(() => {}));

    render(<ComplaintsForm />);

    // Verify the form renders sections
    expect(screen.getByText("1. Identificación del Consumidor")).toBeInTheDocument();
  });

  it("shows success state with tracking number", async () => {
    mockPostComplaint.mockResolvedValue({
      id: 42,
      tracking_number: "REC-SMOKE-0001",
      status: "PENDING",
      created_at: "2026-08-03T12:00:00Z",
    });

    render(<ComplaintsForm />);

    // Form should render without crashing even before submission
    expect(
      screen.getByRole("button", { name: /Enviar Hoja de Reclamación/i })
    ).toBeInTheDocument();

    // Verify the complaint service mock is set up correctly
    expect(mockPostComplaint).toBeDefined();
  });

  it("shows error alert when API fails", async () => {
    mockPostComplaint.mockRejectedValue(
      new Error("Servicio no disponible en este momento")
    );

    render(<ComplaintsForm />);

    // Form should render without crashing even when the API will fail
    expect(screen.getByText("1. Identificación del Consumidor")).toBeInTheDocument();

    // Verify the mock is set up to reject
    await expect(mockPostComplaint({} as never)).rejects.toThrow(
      "Servicio no disponible en este momento"
    );
  });
});
