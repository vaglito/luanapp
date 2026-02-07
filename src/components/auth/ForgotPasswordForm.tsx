"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { ForgotPasswordAction } from "@/actions/auth-actions";

const forgotPasswordSchema = z.object({
    email: z.string().email("Ingresa un correo válido"),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordSchema) => {
        setLoading(true);
        setMessage(null);
        try {
            const response = await ForgotPasswordAction(data.email);
            if (response.error) {
                setMessage({ type: "error", text: response.error });
            } else {
                setMessage({
                    type: "success",
                    text: "Si el correo existe, recibirás instrucciones para restablecer tu contraseña.",
                });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Ocurrió un error inesperado." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" fontWeight={600} mb={1} textAlign="center">
                Recuperar contraseña
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </Typography>

            {message && (
                <Alert severity={message.type} sx={{ mb: 2 }}>
                    {message.text}
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

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ mt: 3, py: 1.5, textTransform: "none", fontSize: "1rem" }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Enviar enlace"}
            </Button>

            <Box sx={{ mt: 2, textAlign: "center" }}>
                <Link href="/login" className="text-sm text-[#5914A3] hover:underline">
                    Volver al inicio de sesión
                </Link>
            </Box>
        </Box>
    );
};
