"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Detectar si viene de un registro exitoso o si el token expiró
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setInfoMessage(
        "¡Cuenta creada! Por favor, verifica tu correo para poder ingresar."
      );
    }
    if (searchParams.get("verified") === "true") {
      setInfoMessage("Correo verificado con éxito. Ya puedes iniciar sesión.");
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setError(null);
    setInfoMessage(null);
    setLoading(true);

    const res = await loginAction(data);

    if (res?.error) {
      // UX: Si el error menciona "verificar", damos una instrucción clara
      if (
        res.error.toLowerCase().includes("active") ||
        res.error.toLowerCase().includes("verific")
      ) {
        setError(
          "Tu cuenta aún no ha sido activada. Revisa tu bandeja de entrada."
        );
      } else {
        setError(res.error);
      }
      setLoading(false);
    } else {
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

      {/* MENSAJE DE ÉXITO O INFO */}
      {infoMessage && (
        <Alert
          severity="info"
          sx={{
            mb: 2,
            bgcolor: "primary.light",
            color: "primary.contrastText",
          }}
        >
          {infoMessage}
        </Alert>
      )}

      {/* MENSAJE DE ERROR */}
      {error && (
        <Alert
          severity={error.includes("verifica") ? "warning" : "error"}
          variant="filled"
          sx={{ mb: 2, animate: "pulse" }}
        >
          {error}
        </Alert>
      )}

      <TextField
        label="Correo electrónico"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
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

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <MuiLink
          href="/forgot-password"
          underline="hover"
          fontSize={14}
          sx={{ fontWeight: 500 }}
        >
          ¿Olvidaste tu contraseña?
        </MuiLink>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 3, py: 1.5, textTransform: "none", fontSize: "1rem" }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Iniciar sesión"
        )}
      </Button>

      <Typography
        variant="body2"
        textAlign="center"
        mt={3}
        color="text.secondary"
      >
        ¿No tienes cuenta?{" "}
        <MuiLink href="/register" underline="hover" sx={{ fontWeight: "bold" }}>
          Crear cuenta
        </MuiLink>
      </Typography>
    </Box>
  );
};
