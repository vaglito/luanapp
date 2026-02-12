import axios from "axios";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "x-api-key": `${API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

import { showToast } from "nextjs-toast-notify";

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Error de conexión";

    // Solo mostrar alerta si estamos en el cliente (Navegador)
    if (typeof window !== "undefined") {
      if (error.response?.status === 401) {
        showToast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
      } else if (error.response?.status === 403) {
        showToast.error("No tienes permisos para realizar esta acción.");
      } else if (error.response?.status >= 500) {
        showToast.error("Error del servidor. Intenta más tarde.");
      }
    }

    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
