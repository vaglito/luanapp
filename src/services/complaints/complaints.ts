import apiClient from "../apiPublic";
import { ComplaintPayload, ComplaintResponse } from "../../types/complaints.type";
import axios from "axios";

/**
 * Submit a complaint/reclamation to the Django backend.
 *
 * **API contract**:
 * - Endpoint: `POST /api/complaints/`
 * - Request body: {@link ComplaintPayload} (JSON)
 * - Success (201): {@link ComplaintResponse} with `tracking_number`
 * - Error (4xx): validation failure — throws with field-level messages
 * - Error (5xx): server error — throws with generic message
 * - Network error: connection refused / timeout — throws "Servicio no disponible en este momento"
 *
 * @param payload - The validated complaint form data
 * @returns The API response containing the assigned tracking number
 * @throws Error with a user-facing Spanish message on failure
 */
export async function postComplaint(
  payload: ComplaintPayload
): Promise<ComplaintResponse> {
  try {
    const response = await apiClient.post<ComplaintResponse>(
      "/api/complaints/",
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Network-level error (no response received)
      if (!error.response) {
        throw new Error("Servicio no disponible en este momento");
      }

      const status = error.response.status;

      switch (status) {
        case 400:
          throw new Error(
            "Datos inválidos. Revisa los campos e intenta nuevamente."
          );
        case 404:
          throw new Error("Servicio no disponible en este momento");
        case 429:
          throw new Error(
            "Demasiadas solicitudes. Espera un momento antes de reintentar."
          );
        case 500:
        case 502:
        case 503:
        case 504:
          throw new Error(
            "Error interno del servidor. Intenta nuevamente más tarde."
          );
        default:
          throw new Error(
            `Error inesperado al enviar el reclamo (${status}). Intenta nuevamente.`
          );
      }
    }

    // Non-Axios error (e.g., network timeout, DNS failure)
    throw new Error("Servicio no disponible en este momento");
  }
}
