"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Stack,
  Alert,
  MenuItem,
  Grid2,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import {
  RegisterInput,
  registerSchema,
} from "@/validations/auth/register.schema";
import { RegisterUser } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError: setFormFieldError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { document: "DNI" },
  });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    setError(null);

    const res = await RegisterUser(data);

    if (res.serverErrors) {
      // Mapeo automático de errores de la API (DNI duplicado, etc) a los inputs
      Object.entries(res.serverErrors).forEach(([key, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages;
        setFormFieldError(key as keyof RegisterInput, {
          type: "server",
          message: String(message),
        });
      });
      setLoading(false);
    } else if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      // Redirigir después de 6 segundos o dejar que el usuario lea el mensaje
      setTimeout(() => router.push("/login"), 8000);
    }
  };

  if (success) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="success" variant="filled" sx={{ py: 3 }}>
          <Typography variant="h6" gutterBottom>
            ¡Registro exitoso!
          </Typography>
          Hemos enviado un enlace de activación a su correo electrónico. Por
          favor, verifique su bandeja de entrada para poder iniciar sesión.
        </Alert>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => router.push("/login")}
        >
          Ir al Inicio de Sesión
        </Button>
      </Box>
    );
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      noValidate
    >
      {error && <Alert severity="error">{error}</Alert>}

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Nombre"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Apellido"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Teléfono"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de Nacimiento"
            InputLabelProps={{ shrink: true }}
            {...register("birthdate")}
            error={!!errors.birthdate}
            helperText={errors.birthdate?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            label="Tipo de Doc."
            defaultValue="DNI"
            {...register("document")}
            error={!!errors.document}
            helperText={errors.document?.message}
          >
            <MenuItem value="DNI">DNI</MenuItem>
            <MenuItem value="CE">CE</MenuItem>
            <MenuItem value="PASAPORTE">Pasaporte</MenuItem>
            <MenuItem value="RUC">RUC</MenuItem>
          </TextField>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Número de Documento"
            {...register("documentNumber")}
            error={!!errors.documentNumber}
            helperText={errors.documentNumber?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="password"
            label="Contraseña"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="password"
            label="Confirmar Contraseña"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Grid2>
      </Grid2>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ height: 56, mt: 2 }}
      >
        {loading ? "Creando cuenta..." : "Registrarse"}
      </Button>
    </Stack>
  );
}
