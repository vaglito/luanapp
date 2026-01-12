import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre es requerido"),
    lastName: z.string().min(2, "El apellido es requerido"),
    email: z.email("Correo inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string(),
    phone: z.string().min(7, "Teléfono inválido"),
    birthdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Fecha de nacimiento inválida",
    }),
    document: z.enum(["DNI", "CE", "RUC", "PASAPORTE"]),
    documentNumber: z.string().min(8, "Número de documento incompleto"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
