"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid2,
    Alert,
    Snackbar,
    CircularProgress,
    Divider,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import { updateProfile } from "../actions/profile-actions";
import { User } from "next-auth";

const profileSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
    phone: z.string().optional(),
    birthdate: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    user: User;
    backendProfile: {
        birthdate?: string;
        phone?: string;
        document?: string;
        document_number?: string;
    } | null;
}

export default function ProfileForm({ user, backendProfile }: ProfileFormProps) {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || "",
            lastName: user.lastName || "",
            phone: backendProfile?.phone || "",
            birthdate: backendProfile?.birthdate || "",
        },
    });

    const onSubmit = async (data: ProfileFormValues) => {
        setErrorMsg(null);
        setSuccessMsg(null);

        const result = await updateProfile(data);

        if (!result.success) {
            setErrorMsg(result.error || "Error desconocido");
        } else {
            setSuccessMsg(result.message || "Guardado exitosamente");
        }
    };

    // Helper para mostrar un rol amigable
    const getRoleLabel = () => {
        if (user.isAdmin) return "Administrador";
        if (user.isSuperuser) return "Superadmin";
        if (user.isSeller) return "Vendedor";
        if (user.isTechnician) return "Técnico";
        if (user.isEditor) return "Editor";
        if (user.isCustomer) return "Cliente";
        return "Invitado";
    };

    return (
        <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", mb: 4 }}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                    <PersonIcon sx={{ fontSize: 40, color: "primary.main" }} />
                    <Box>
                        <Typography variant="h5" fontWeight="800">
                            Información Personal
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Actualiza tus datos para mantener tu cuenta al día.
                        </Typography>
                    </Box>
                </Box>

                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {errorMsg}
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid2 container spacing={3}>
                        {/* Campos EDITABLES */}
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Nombres"
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                disabled={isSubmitting}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Apellidos"
                                {...register("lastName")}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                disabled={isSubmitting}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                {...register("phone")}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                disabled={isSubmitting}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Fecha de Nacimiento"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                {...register("birthdate")}
                                error={!!errors.birthdate}
                                helperText={errors.birthdate?.message}
                                disabled={isSubmitting}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12 }}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, fontWeight: "bold" }}>
                                DATOS DE CUENTA (NO EDITABLES)
                            </Typography>
                        </Grid2>

                        {/* Campos READ-ONLY */}
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Correo Electrónico"
                                value={user.email || ""}
                                disabled
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "grey.50" } }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Rol del Sistema"
                                value={getRoleLabel()}
                                disabled
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "grey.50" } }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Tipo de Documento"
                                value={backendProfile?.document || "DNI"}
                                disabled
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "grey.50" } }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Número de Documento"
                                value={backendProfile?.document_number || user.documentNumber || ""}
                                disabled
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "grey.50" } }}
                            />
                        </Grid2>

                        {/* Botón Guardar */}
                        <Grid2 size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={isSubmitting}
                                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold", px: 4 }}
                            >
                                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </CardContent>

            <Snackbar
                open={!!successMsg}
                autoHideDuration={4000}
                onClose={() => setSuccessMsg(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => setSuccessMsg(null)} severity="success" sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
                    {successMsg}
                </Alert>
            </Snackbar>
        </Card>
    );
}
