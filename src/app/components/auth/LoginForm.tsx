"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { loginSchema, LoginSchema } from "@/validations/auth/login.schema";
import { loginAction } from "@/actions/auth-actions";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setError(null);
    setLoading(true);

    const res = await loginAction(data);

    setLoading(false);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      // Si tuvo éxito, refrescamos y redirigimos
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Bienvenido 👋
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Ingresa tus credenciales para continuar
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Correo electrónico"
        type="email"
        fullWidth
        autoFocus
        autoComplete="email"
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        aria-invalid={!!errors.email}
      />

      <TextField
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        fullWidth
        autoComplete="current-password"
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        aria-invalid={!!errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 1,
        }}
      >
        <MuiLink href="/forgot-password" underline="hover" fontSize={14}>
          ¿Olvidaste tu contraseña?
        </MuiLink>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 3, py: 1.2 }}
      >
        {loading ? <CircularProgress size={22} /> : "Iniciar sesión"}
      </Button>

      <Typography
        variant="body2"
        textAlign="center"
        mt={3}
        color="text.secondary"
      >
        ¿No tienes cuenta?{" "}
        <MuiLink href="/register" underline="hover">
          Crear cuenta
        </MuiLink>
      </Typography>
    </Box>
  );
};
