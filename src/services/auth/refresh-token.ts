import apiClient from "../apiPublic";
import { isAxiosError } from "axios";

export async function refreshAccessToken(refreshToken: string) {
  try {
    // Ajusta la ruta '/api/v2.0/auth/refresh/' a la que use tu backend
    const res = await apiClient.post(`/api/v2.0/auth/login/refresh/`, {
      refresh: refreshToken,
    });

    return res.data;
  } catch (error) {
/*     if (isAxiosError(error)) {
      console.warn("Aviso: El refresh token es inválido o ha expirado.");
    } */
    // En lugar de hacer "throw" (lo cual Next.js intercepta en dev mostrando un error molesto),
    // devolvemos "null" para indicar que falló de manera silenciosa.
    return null;
  }
}