
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    IconButton,
    InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { confirmPasswordReset } from "@/services/passwordReset";

const resetPasswordSchema = z
    .object({
        password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

interface PageProps {
    params: {
        uid: string;
        token: string;
    };
}

export default function ResetPasswordPage({ params }: PageProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordSchema) => {
        setLoading(true);
        setError(null);
        try {
            const response = await confirmPasswordReset(
                params.uid,
                params.token,
                data.password
            );

            if (response.error) {
                setError(response.error);
            } else {
                router.push("/login?passwordReset=true");
            }
        } catch (err) {
            console.error(err)
            setError("Ocurrió un error al restablecer la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" fontWeight={600} mb={1} textAlign="center">
                    Restablecer Contraseña
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
                    Ingresa tu nueva contraseña a continuación.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Nueva contraseña"
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
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Confirmar contraseña"
                        type={showConfirmPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        {...register("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

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
                            "Restablecer contraseña"
                        )}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
