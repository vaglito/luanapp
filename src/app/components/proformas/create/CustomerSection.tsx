import { Box, TextField, MenuItem } from "@mui/material";

interface Props {
  register: any;
  errors: any;
}

export function CustomerSection({ register, errors }: Props) {
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <TextField
        label="Cliente"
        {...register("customer")}
        error={!!errors.customer}
        helperText={errors.customer?.message}
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
