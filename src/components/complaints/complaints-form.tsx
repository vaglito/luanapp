"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Box,
    TextField,
    Button,
    Grid2,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    FormHelperText,
    Checkbox,
    Paper,
    Divider,
} from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

// Schema de validación
const complaintSchema = z.object({
    // Datos del Consumidor
    fullName: z.string().min(2, "El nombre completo es obligatorio"),
    documentType: z.enum(["DNI", "CE", "RUC"]),
    documentNumber: z.string().min(8, "Número de documento inválido"),
    email: z.string().email("Correo electrónico inválido"),
    phone: z.string().min(9, "El teléfono es obligatorio"),
    address: z.string().min(5, "La dirección es obligatoria"),

    // Identificación del Bien
    goodType: z.enum(["PRODUCTO", "SERVICIO"]),
    amount: z.string().min(1, "El monto es obligatorio"),
    goodDescription: z.string().min(5, "Descripción del bien obligatoria"),

    // Detalle de Reclamación
    claimType: z.enum(["RECLAMO", "QUEJA"]),
    detail: z.string().min(20, "El detalle debe tener al menos 20 caracteres"),
    request: z.string().min(10, "El pedido debe tener al menos 10 caracteres"),

    // Términos
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "Debes aceptar las políticas de privacidad",
    }),
});

type ComplaintFormData = z.infer<typeof complaintSchema>;

export function ComplaintsForm() {
    const [submitted, setSubmitted] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<ComplaintFormData>({
        resolver: zodResolver(complaintSchema),
        defaultValues: {
            documentType: "DNI",
            goodType: "PRODUCTO",
            claimType: "RECLAMO",
            acceptTerms: false
        },
        mode: "onChange"
    });

    const onSubmit = (data: ComplaintFormData) => {
        console.log("Form Data:", data);
        // Aquí iría la lógica para enviar al API
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (submitted) {
        return (
            <Paper elevation={3} sx={{ p: 5, textAlign: "center", borderRadius: 4 }}>
                <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: "bold" }}>
                    ¡Reclamo Registrado!
                </Typography>
                <Typography paragraph color="text.secondary">
                    Hemos recibido tu solicitud correctamente. Se ha enviado una copia de tu hoja de reclamación a tu correo electrónico.
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Número de Reclamo: <span style={{ color: "#A3147F" }}>REC-{new Date().getFullYear()}-00123</span>
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 4, color: "grey.600" }}>
                    Recuerda que tenemos un plazo máximo de 15 días hábiles para dar respuesta a tu solicitud.
                </Typography>
                <Button variant="outlined" onClick={() => { setSubmitted(false); reset(); }}>
                    Enviar otro reclamo
                </Button>
            </Paper>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: "1px solid #e0e0e0", borderRadius: 3 }}>

                {/* 1. Identificación del Consumidor */}
                <Box mb={4}>
                    <Typography variant="h6" sx={{ color: "#A3147F", fontWeight: "bold", mb: 2, borderBottom: "1px solid #eee", pb: 1 }}>
                        1. Identificación del Consumidor
                    </Typography>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12 }}>
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Nombre Completo / Razón Social"
                                        fullWidth
                                        error={!!errors.fullName}
                                        helperText={errors.fullName?.message}
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="documentType"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Tipo Doc."
                                        SelectProps={{ native: true }}
                                        fullWidth
                                    >
                                        <option value="DNI">DNI</option>
                                        <option value="CE">C.E.</option>
                                        <option value="RUC">RUC</option>
                                    </TextField>
                                )}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 8 }}>
                            <Controller
                                name="documentNumber"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Número de Documento"
                                        fullWidth
                                        error={!!errors.documentNumber}
                                        helperText={errors.documentNumber?.message}
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Correo Electrónico"
                                        type="email"
                                        fullWidth
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Teléfono / Celular"
                                        fullWidth
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Domicilio Actual"
                                        fullWidth
                                        error={!!errors.address}
                                        helperText={errors.address?.message}
                                    />
                                )}
                            />
                        </Grid2>
                    </Grid2>
                </Box>

                {/* 2. Identificación del Bien Contratado */}
                <Box mb={4}>
                    <Typography variant="h6" sx={{ color: "#A3147F", fontWeight: "bold", mb: 2, borderBottom: "1px solid #eee", pb: 1 }}>
                        2. Identificación del Bien Contratado
                    </Typography>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <FormControl component="fieldset" error={!!errors.goodType}>
                                <FormLabel component="legend">Tipo de Bien</FormLabel>
                                <Controller
                                    name="goodType"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup row {...field}>
                                            <FormControlLabel value="PRODUCTO" control={<Radio color="secondary" />} label="Producto" />
                                            <FormControlLabel value="SERVICIO" control={<Radio color="secondary" />} label="Servicio" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Monto Reclamado (S/)"
                                        type="number"
                                        fullWidth
                                        error={!!errors.amount}
                                        helperText={errors.amount?.message}
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Controller
                                name="goodDescription"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Descripción del Producto o Servicio"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        error={!!errors.goodDescription}
                                        helperText={errors.goodDescription?.message}
                                    />
                                )}
                            />
                        </Grid2>
                    </Grid2>
                </Box>

                {/* 3. Detalle de la Reclamación */}
                <Box mb={4}>
                    <Typography variant="h6" sx={{ color: "#A3147F", fontWeight: "bold", mb: 2, borderBottom: "1px solid #eee", pb: 1 }}>
                        3. Detalle de la Reclamación
                    </Typography>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12 }}>
                            <FormControl component="fieldset" error={!!errors.claimType}>
                                <FormLabel component="legend">Tipo de Reclamación</FormLabel>
                                <Controller
                                    name="claimType"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup row {...field}>
                                            <FormControlLabel value="RECLAMO" control={<Radio color="secondary" />} label="Reclamo (Disconformidad con el producto/servicio)" />
                                            <FormControlLabel value="QUEJA" control={<Radio color="secondary" />} label="Queja (Malestar en la atención)" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Controller
                                name="detail"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Detalle del Reclamo o Queja"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        placeholder="Describa los hechos detalladamente..."
                                        error={!!errors.detail}
                                        helperText={errors.detail?.message}
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Controller
                                name="request"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Pedido del Consumidor"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        placeholder="¿Qué solución espera?"
                                        error={!!errors.request}
                                        helperText={errors.request?.message}
                                    />
                                )}
                            />
                        </Grid2>
                    </Grid2>
                </Box>

                {/* Disclaimer y Submit */}
                <Box>
                    <FormControl error={!!errors.acceptTerms}>
                        <Controller
                            name="acceptTerms"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                            color="secondary"
                                        />
                                    }
                                    label={
                                        <Typography variant="body2">
                                            Declaro haber leído y acepto las políticas de privacidad, y certifico que los datos consignados expresan la verdad.
                                        </Typography>
                                    }
                                />
                            )}
                        />
                        <FormHelperText>{errors.acceptTerms?.message}</FormHelperText>
                    </FormControl>
                </Box>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={!isValid}
                        startIcon={<SendIcon />}
                        sx={{
                            bgcolor: "#A3147F",
                            py: 1.5,
                            px: 6,
                            borderRadius: 50,
                            fontWeight: "bold",
                            "&:hover": { bgcolor: "#8a116b" }
                        }}
                    >
                        Enviar Hoja de Reclamación
                    </Button>
                </Box>

            </Paper>
        </Box>
    );
}
