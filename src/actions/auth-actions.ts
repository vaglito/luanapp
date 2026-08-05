"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import axios from "axios";
import apiClient from "@/services/apiPublic";
import { LoginSchema, loginSchema } from "@/validations/auth/login.schema";
import {
  registerSchema,
  RegisterInput,
} from "@/validations/auth/register.schema";

export type LoginResult = {
  success?: boolean;
  error?: string;
};

export async function loginAction(data: LoginSchema): Promise<LoginResult> {
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

export type RegisterResult = {
  error?: string;
  fieldErrors?: unknown;
  id?: number;
  email?: string;
  serverErrors?: unknown;
};

export async function RegisterUser(data: RegisterInput): Promise<RegisterResult> {
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Hay errores en los datos ingresados",
      fieldErrors: validatedFields.error.flatten(),
    };
  }

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

export type VerifyResult = {
  success: boolean;
  detail?: string;
  error?: string;
};

export async function VerifyEmailAction(tokenUUID: string): Promise<VerifyResult> {
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
    return { success: false, error: message };
  }
}

export type PasswordResetResult = {
  success: boolean;
  detail?: string;
  error?: string;
};

export async function ForgotPasswordAction(email: string): Promise<PasswordResetResult> {
  try {
    const response = await apiClient.post("/api/v2.0/auth/password-reset/", {
      email,
    });
    return { success: true, detail: response.data.detail };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.detail) {
        return { success: false, error: error.response.data.detail };
      }
      if (error.response?.data?.email) {
        return { success: false, error: error.response.data.email[0] }
      }
    }
    return { success: false, error: "Ocurrió un error al procesar tu solicitud." };
  }
}

export async function ResetPasswordAction(uid: string, token: string, newPassword: string): Promise<PasswordResetResult> {
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
      if (errorData.detail) return { success: false, error: errorData.detail };
      if (errorData.token) return { success: false, error: errorData.token[0] || "El enlace es inválido o ha expirado." };
      if (errorData.uid) return { success: false, error: "Enlace inválido." };
      if (errorData.new_password) return { success: false, error: errorData.new_password[0] };
    }
    return { success: false, error: "Ocurrió un error al procesar tu solicitud." };
  }
}
