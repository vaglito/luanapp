"use server";
import {
  ParticipacionSchema,
  ParticipacionFormValues,
} from "@/validations/participa.schema";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;


export async function registrarComprobante(data: ParticipacionFormValues) {
  const parsed = ParticipacionSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Datos del formulario inválidos." };
  }

  // 🔴 IMPORTANTE: Separamos "terminos" del resto de los datos
  // porque Django no tiene un campo "terminos" en el modelo LotteryTicket
  const { terminos, ...djangoPayload } = parsed.data;

  try {
    const res = await fetch(
      `${API_URL}/api/lottery/register/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY!,
        },
        body: JSON.stringify(djangoPayload),
      },
    );

    const backendResponse = await res.json();

    if (!res.ok) {
      const errorMessage = backendResponse.detail
        ? Array.isArray(backendResponse.detail)
          ? backendResponse.detail[0]
          : backendResponse.detail
        : "Ocurrió un error al registrar el comprobante. Revisa los datos.";

      return { success: false, error: errorMessage };
    }
    return {
      success: true,
      message: "¡Felicidades! Tu comprobante está participando.",
      body: djangoPayload,
    };
  } catch (error) {
    console.error("Error conectando con Django:", error);
    return {
      success: false,
      error: "Error de conexión con el servidor. Intenta más tarde.",
    };
  }
}
