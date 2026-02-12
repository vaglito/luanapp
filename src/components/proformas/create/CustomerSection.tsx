import { Box, TextField, MenuItem } from "@mui/material";

import { UseFormRegister, FieldErrors } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>; // O el tipo específico de tu formulario si es global
  errors: FieldErrors;
}

export function CustomerSection({ register, errors }: Props) {
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <TextField
        label="Cliente"
        {...register("customer")}
        error={!!errors.customer}
        helperText={errors.customer?.message as string}
      />

      <TextField label="Documento" {...register("customerDocument")} />

      <TextField label="Email" type="email" {...register("customerEmail")} />

      <TextField select label="Modo" defaultValue="" {...register("mode")}>
        <MenuItem value="CONTADO">Contado</MenuItem>
        <MenuItem value="CREDITO">Crédito</MenuItem>
        <MenuItem value="CREDITO 7 DIAS">Crédito 7 días</MenuItem>
        <MenuItem value="CREDITO 15 DIAS">Crédito 15 días</MenuItem>
        <MenuItem value="CREDITO 30 DIAS">Crédito 30 días</MenuItem>
      </TextField>
    </Box>
  );
}
