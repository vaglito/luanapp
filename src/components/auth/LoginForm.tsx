"use client";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Box,
  TextField,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MyButton } from "../ui/Buttons/Buttons";
import { TypographyWrapper } from "../ui/Typography/Typography";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { loginSchema, LoginSchema } from "@/validations/auth/login.schema";
import { loginAction } from "@/actions/auth-actions";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  // Detectar si viene de un registro exitoso o si el token expiró.
  // Derived once via lazy initial state instead of setState-in-effect:
  // these query params only matter on first mount (post-redirect banners).
  const [infoMessage, setInfoMessage] = useState<string | null>(() => {
    if (searchParams.get("registered") === "true") {
      return "¡Cuenta creada! Por favor, verifica tu correo para poder ingresar.";
    }
    if (searchParams.get("verified") === "true") {
      return "Correo verificado con éxito. Ya puedes iniciar sesión.";
    }
    if (searchParams.get("passwordReset") === "true") {
      return "Tu contraseña ha sido restablecida con éxito. Inicia sesión con tu nueva contraseña.";
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
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
      // Preservar los campos del formulario en el error
      reset(data, { keepErrors: false });
      // UX: Si el error menciona "verificar", damos una instrucción clara
      if (
        res.error.toLowerCase().includes("active") ||
        res.error.toLowerCase().includes("verific")
      ) {
        setError(
          "Tu cuenta aún no ha sido activada. Revisa tu bandeja de entrada.",
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
      <TypographyWrapper customVariant="subtitle" variant="h5" mb={1}>
        Bienvenido 👋
      </TypographyWrapper>
      <TypographyWrapper color="text.secondary" mb={3}>
        Ingresa tus credenciales para continuar.
      </TypographyWrapper>

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
        autoComplete="email"
        disabled={loading}
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        autoComplete="current-password"
        disabled={loading}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Link
          href="/forgot-password"
          className="font-bold hover:underline text-[#5914A3]"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </Box>

      <MyButton
        type="submit"
        customVariant="submit"
        fullWidth
        disabled={loading}
        sx={{ mt: 3, py: 1.5, textTransform: "none", fontSize: "1rem" }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Iniciar sesión"
        )}
      </MyButton>

      <TypographyWrapper
        textAlign="center"
        mt={3}
        color="text.secondary"
      >
        ¿No tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-bold text-[#5914A3] hover:underline"
        >
          Crear cuenta
        </Link>
      </TypographyWrapper>
    </Box>
  );
};
