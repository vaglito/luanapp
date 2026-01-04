"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import { loginSchema, LoginSchema } from "@/validations/auth/login.schema";

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setLoading(false);

    if (!res) {
      setError("Correo electrónico o contraseña no válidos");
      return;
    }

    if (res.error) {
      setError("Correo electrónico o contraseña no válidos");
      return;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
        Iniciar sesion
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 3, py: 1.2 }}
      >
        {loading ? <CircularProgress size={22} /> : "Iniciar sesion"}
      </Button>
    </Box>
  );
};
