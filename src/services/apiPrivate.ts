import axios, { AxiosError } from "axios";
import { auth } from "@/auth";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const apiPrivate = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Interceptor de Solicitud (Request)
apiPrivate.interceptors.request.use(
  async (config) => {
    // 1. Obtenemos la sesión del lado del servidor usando auth()
    const session = await auth();
    const token = session?.user?.accessToken;

    // 2. Si hay token, lo agregamos al header de autorización
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3. Agregamos la API Key si es necesaria para todos los endpoints
    if (API_KEY) {
      config.headers["x-api-key"] = API_KEY;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Respuesta (Response) para un manejo de errores consistente
apiPrivate.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("Private API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiPrivate;
