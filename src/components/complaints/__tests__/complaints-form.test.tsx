import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ComplaintsForm } from "@/components/complaints/complaints-form";

// Mock the complaints service
const mockPostComplaint = vi.fn();
vi.mock("@/services/complaints/complaints", () => ({
  postComplaint: (...args: unknown[]) => mockPostComplaint(...args),
}));

function fillRequiredFields() {
  // Fill consumer identification
  fireEvent.change(screen.getByLabelText(/Nombre Completo/i), {
    target: { value: "Juan Pérez" },
  });
  fireEvent.change(screen.getByLabelText(/Número de Documento/i), {
    target: { value: "12345678" },
  });
  fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
    target: { value: "juan@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Teléfono/i), {
    target: { value: "999888777" },
  });
  fireEvent.change(screen.getByLabelText(/Domicilio Actual/i), {
    target: { value: "Av. Siempre Viva 742" },
  });
  fireEvent.change(screen.getByLabelText(/Monto Reclamado/i), {
    target: { value: "500" },
  });
  fireEvent.change(
    screen.getByLabelText(/Descripción del Producto o Servicio/i),
    { target: { value: "Laptop con pantalla defectuosa" } }
  );
  fireEvent.change(screen.getByLabelText(/Detalle del Reclamo o Queja/i), {
    target: {
      value:
        "La laptop que compré llegó con la pantalla completamente rota y no enciende.",
    },
  });
  fireEvent.change(screen.getByLabelText(/Pedido del Consumidor/i), {
    target: { value: "Solicito el cambio del producto por uno nuevo." },
  });

  // Accept terms
  fireEvent.click(
    screen.getByRole("checkbox", { name: /políticas de privacidad/i })
  );
}

describe("ComplaintsForm", () => {
  beforeEach(() => {
    mockPostComplaint.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while submitting", async () => {
    // Make the service hang to observe loading state
    mockPostComplaint.mockReturnValue(new Promise(() => {}));

    render(<ComplaintsForm />);

    const submitButton = screen.getByRole("button", { name: /Enviar Hoja de Reclamación/i });
    expect(submitButton).toBeDisabled(); // invalid form by default

    fillRequiredFields();

    // Wait for button to become enabled once form is valid
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    // Button should now show loading state
    await waitFor(() => {
      expect(screen.getByText("Enviando...")).toBeInTheDocument();
    });

    const loadingButton = screen.getByRole("button", { name: /Enviando/i });
    expect(loadingButton).toBeDisabled();
  });

  it("shows success with real tracking number from API", async () => {
    mockPostComplaint.mockResolvedValue({
      id: 1,
      tracking_number: "REC-2026-0042",
      status: "PENDING",
      created_at: "2026-08-03T12:00:00Z",
    });

    render(<ComplaintsForm />);

    fillRequiredFields();

    const submitButton = screen.getByRole("button", { name: /Enviar Hoja de Reclamación/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    // Wait for success view
    await waitFor(() => {
      expect(screen.getByText("¡Reclamo Registrado!")).toBeInTheDocument();
    });

    expect(screen.getByText("REC-2026-0042")).toBeInTheDocument();
  });

  it("shows error message when API fails", async () => {
    mockPostComplaint.mockRejectedValue(new Error("Servicio no disponible en este momento"));

    render(<ComplaintsForm />);

    fillRequiredFields();

    const submitButton = screen.getByRole("button", { name: /Enviar Hoja de Reclamación/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    // Wait for error alert
    await waitFor(() => {
      expect(screen.getByText("Servicio no disponible en este momento")).toBeInTheDocument();
    });
  });

  it("does NOT display any hardcoded complaint number", async () => {
    mockPostComplaint.mockResolvedValue({
      id: 2,
      tracking_number: "REC-2026-0099",
      status: "PENDING",
      created_at: "2026-08-03T12:00:00Z",
    });

    render(<ComplaintsForm />);

    fillRequiredFields();

    const submitButton = screen.getByRole("button", { name: /Enviar Hoja de Reclamación/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("¡Reclamo Registrado!")).toBeInTheDocument();
    });

    // The hardcoded value must NOT appear
    expect(screen.queryByText(/REC-202X-00123/)).not.toBeInTheDocument();
    expect(screen.queryByText(/00123/)).toBeNull();
  });
});
