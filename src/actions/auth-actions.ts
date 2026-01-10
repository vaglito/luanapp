"use server"
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginSchema, loginSchema } from "@/validations/auth/login.schema";

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
