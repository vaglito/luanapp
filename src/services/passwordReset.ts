
import { axiosAuth } from "@/lib/axios";
import { AxiosError } from "axios";

export const requestPasswordReset = async (email: string) => {
  try {
    const { data } = await axiosAuth.post("/sauth/password-reset/", { email });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.detail || "Error al enviar la solicitud." };
    }
    return { error: "Ocurrió un error inesperado." };
  }
};

export const confirmPasswordReset = async (
  uid: string,
  token: string,
  newPassword: string
) => {
  try {
    const { data } = await axiosAuth.post("/sauth/password-reset-confirm/", {
      uid,
      token,
      new_password: newPassword,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // The backend might return errors in different formats, handling common DRF error structures
      const errorData = error.response?.data;
      if (errorData?.detail) return { error: errorData.detail };
      if (errorData?.token) return { error: "El enlace es inválido o ha expirado." };
      if (errorData?.uid) return { error: "Enlace inválido." };
      if (errorData?.new_password) return { error: errorData.new_password[0] };
      
      return { error: "Error al restablecer la contraseña." };
    }
    return { error: "Ocurrió un error inesperado." };
  }
};
