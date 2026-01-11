"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import apiClient from "@/app/services/apiClient";
import { LoginSchema, loginSchema } from "@/validations/auth/login.schema";
import {
  registerSchema,
  RegisterInput,
} from "@/validations/auth/register.schema";

export async function loginAction(data: LoginSchema) {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Datos invalidos" };
  }

  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales invalidas" };
        default:
          return { error: "Algo salio mal en el servidor" };
      }
    }
    throw error;
  }
}

export async function RegisterUser(data: RegisterInput) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return { error: "Datos del formulario invalidos" };
  }

  try {
    const response = await apiClient.post("/api/v2.0/auth/user/create/", data);

    return response.data;
  } catch (error: any) {
    // Si es un 400, devolvemos el objeto de errores de la API
    if (error.response?.status === 400) {
      return {
        serverErrors: error.response.data, // Ej: { documentNumber: ["Ya existe"], phone: ["Ya existe"] }
        error: "Hay errores en los datos ingresados",
      };
    }
    return { error: "Error de conexión con el servidor" };
  }
}

export async function VerifyEmailAction(tokenUUID: string) {
  try {
    // El token se envía en el body: { "token": "uuid-aqui" }
    const response = await apiClient.post("/api/v2.0/auth/verify-email/", {
      token: tokenUUID,
    });

    return { success: true, detail: response.data.detail };
  } catch (error: any) {
    const message =
      error.response?.data?.detail || "Error al verificar el token.";
    return { error: message };
  }
}
