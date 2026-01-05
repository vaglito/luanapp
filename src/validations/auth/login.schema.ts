import { z } from "zod";

/**
 *  Login form validation
 */
export const loginSchema = z.object({
  email: z
    .email("La direccion de correo electronico es invalido")
    .min(1, "El correo es requerido"),

  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
