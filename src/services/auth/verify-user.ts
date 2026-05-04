import apiClient from "../apiPublic";
import { isAxiosError } from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

export async function verifyUser({ email, password }: LoginCredentials) {
  try {
    const res = await apiClient.post(`/api/v2.0/auth/login/`, {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Credenciales incorrectas");
    }
    throw new Error("Error de conexión al verificar usuario");
  }
}
