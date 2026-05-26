"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MyButton } from "../ui/Buttons/Buttons";
import { TypographyWrapper } from "../ui/Typography/Typography";
import {
  TextField,
  Stack,
  Alert,
  MenuItem,
  Grid2,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
  const [showPassword, setShowPassword] = useState(false);
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
      setTimeout(() => router.push("/login"), 8000);
    }
  };

  if (success) {
    return (
      <Box sx={{ mt: 2, width: "100%" }}>
        <Alert
          severity="success"
          variant="outlined"
          sx={{ py: 3, borderRadius: 3, border: "2px solid" }}
        >
          <TypographyWrapper variant="h6" gutterBottom>
            ¡Registro exitoso!
          </TypographyWrapper>
          Hemos enviado un enlace de activación a su correo electrónico. Por
          favor, verifique su bandeja de entrada para poder iniciar sesión.
        </Alert>
        <MyButton
          fullWidth
          customVariant="submit"
          onClick={() => router.push("/login")}
          sx={{ mt: 3 }}
        >
          Ir al Inicio de Sesión
        </MyButton>
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
            autoComplete="given-name"
            disabled={loading}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Apellido"
            autoComplete="family-name"
            disabled={loading}
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            autoComplete="email"
            disabled={loading}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Teléfono"
            autoComplete="tel"
            disabled={loading}
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
            slotProps={{
              inputLabel: { shrink: true },
            }}
            autoComplete="bday"
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
            {...register("documentNumber")}
            error={!!errors.documentNumber}
            helperText={errors.documentNumber?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            autoComplete="new-password"
            disabled={loading}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Confirmar Contraseña"
            autoComplete="new-password"
            disabled={loading}
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Grid2>
      </Grid2>

      <MyButton
        type="submit"
        customVariant="submit"
        size="large"
        disabled={loading}
        sx={{ height: 56, mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Registrarse"
        )}
      </MyButton>
    </Stack>
  );
}
