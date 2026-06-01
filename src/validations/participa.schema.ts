import { z } from "zod";

export const TIPOS_DOCUMENTO = [
  { value: "DNI", label: "DNI" },
  { value: "CE", label: "Carné de Extranjería (CE)" },
  { value: "PASAPORTE", label: "Pasaporte" },
];

export const SERIES_DISPONIBLES = [
  { value: "F001", label: "Factura (F001)" },
  { value: "B001", label: "Boleta (B001)" },
  { value: "F002", label: "Factura (F002)" },
  { value: "B002", label: "Boleta (B002)" },
];

export const ParticipacionSchema = z.object({
  client: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  doc_type: z.string().min(1, "Selecciona el tipo de documento"),
  document: z.string().min(8, "Ingresa un número de documento válido"),
  phone: z.string().min(9, "Ingresa un teléfono válido"),
  email: z.email("Ingresa un correo válido"),
  serie: z.string().min(3, "Selecciona una serie"),
  num_docu: z.string().min(1, "El número de documento es requerido"),
  date_register: z
    .string()
    .min(1, "Selecciona la fecha de compra")
    .refine(
      (date) => {
        // Comparamos alfabéticamente las fechas en formato ISO
        return date >= "2026-06-01" && date <= "2026-06-29";
      },
      {
        message: "El comprobante debe ser entre el 01 y el 29 de junio.",
      },
    ),
  terminos: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los Términos y Condiciones para participar.",
  }),
});

export type ParticipacionFormValues = z.infer<typeof ParticipacionSchema>;