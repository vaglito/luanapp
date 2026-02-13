"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import apiClient from "@/services/apiClient";
import { LoginSchema, loginSchema } from "@/validations/auth/login.schema";
import {
  registerSchema,
  RegisterInput,
} from "@/validations/auth/register.schema";

export async function loginAction(data: LoginSchema) {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success)
    return { error: "Formato de correo o contraseña incorrecto" };

  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      // Auth.js a veces devuelve el error en la URL o en el objeto result
      return { error: decodeURIComponent(result.error) };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      // Personaliza los mensajes según el tipo de error de Auth.js / NextAuth
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "El correo o la contraseña no coinciden." };
        case "CallbackRouteError":
          // Aquí suele venir el error de "Cuenta no activa" desde Django
          return {
            error: "Credenciales invalidas",
          };
        default:
          return { error: "Hubo un problema técnico. Inténtalo más tarde." };
      }
    }
    // Error genérico de red
    return { error: "No pudimos conectar con el servidor." };
  }
}

import axios from "axios";

// ... previous code ...

export async function RegisterUser(data: RegisterInput) {
  // ... validation ...

  try {
    const response = await apiClient.post("/api/v2.0/auth/user/create/", data);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return {
          serverErrors: error.response.data,
          error: "Hay errores en los datos ingresados",
        };
      }
    }
    return { error: "Error de conexión con el servidor" };
  }
}

export async function VerifyEmailAction(tokenUUID: string) {
  try {
    const response = await apiClient.post("/api/v2.0/auth/verify-email/", {
      token: tokenUUID,
    });

    return { success: true, detail: response.data.detail };
  } catch (error: unknown) {
    let message = "Error al verificar el token.";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return { error: message };
  }
}

export async function ForgotPasswordAction(email: string) {
  try {
    const response = await apiClient.post("/api/v2.0/auth/password-reset/", {
      email,
    });
    return { success: true, detail: response.data.detail };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.detail) {
        return { error: error.response.data.detail };
      }
      if (error.response?.data?.email) {
        return { error: error.response.data.email[0] }
      }
    }
    return { error: "Ocurrió un error al procesar tu solicitud." };
  }
}

export async function ResetPasswordAction(uid: string, token: string, newPassword: string) {
  try {
    const response = await apiClient.post("/api/v2.0/auth/password-reset-confirm/", {
      uid,
      token,
      new_password: newPassword,
    });
    return { success: true, detail: response.data.detail };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;
      if (errorData.detail) return { error: errorData.detail };
      if (errorData.token) return { error: errorData.token[0] || "El enlace es inválido o ha expirado." };
      if (errorData.uid) return { error: "Enlace inválido." };
      if (errorData.new_password) return { error: errorData.new_password[0] };
    }
    return { error: "Ocurrió un error al procesar tu solicitud." };
  }
}
