"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Grid2,
  Alert,
  AlertTitle,
  CircularProgress,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Divider,
  Typography,
  Fade,
  Paper,
} from "@mui/material";
import {
  CheckCircleOutline as CheckCircleIcon,
  ErrorOutline as ErrorIcon,
  ReceiptLong as ReceiptIcon,
} from "@mui/icons-material"; // Asegúrate de tener @mui/icons-material instalado
import { MyButton } from "@/components/ui/Buttons/Buttons";

import {
  ParticipacionSchema,
  ParticipacionFormValues,
  TIPOS_DOCUMENTO,
  SERIES_DISPONIBLES,
} from "@/validations/participa.schema";
import { registrarComprobante } from "@/actions/participa-actions";

export function ParticipaForm() {
  const [isPending, startTransition] = useTransition();
  const [serverState, setServerState] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ParticipacionFormValues>({
    resolver: zodResolver(ParticipacionSchema),
    defaultValues: {
      client: "",
      doc_type: "DNI",
      document: "",
      phone: "",
      email: "",
      serie: "",
      num_docu: "",
      date_register: "",
      terminos: false,
    },
  });

  const onSubmit = (data: ParticipacionFormValues) => {
    // Limpiamos errores previos al enviar
    setServerState(null);

    startTransition(async () => {
      const response = await registrarComprobante(data);
      if (response.success) {
        setServerState({ success: true, message: response.message });
        reset();
        // Opcional: Hacer scroll hacia arriba para que el usuario vea el éxito
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setServerState({ success: false, message: response.error });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  // ==========================================
  // PANTALLA DE ÉXITO (UX Mejorada)
  // ==========================================
  if (serverState?.success) {
    return (
      <Fade in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: "center",
            bgcolor: "success.50",
            border: "1px solid",
            borderColor: "success.200",
            borderRadius: 3,
          }}
        >
          <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
          <Typography
            variant="h4"
            color="success.dark"
            fontWeight="bold"
            gutterBottom
          >
            ¡Registro Exitoso!
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.1rem" }}
          >
            {serverState.message}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Guarda tu comprobante físico o digital, lo necesitarás si resultas
            ganador.
          </Typography>

          <MyButton
            customVariant="submit"
            onClick={() => setServerState(null)}
            startIcon={<ReceiptIcon />}
          >
            Registrar otro comprobante
          </MyButton>
        </Paper>
      </Fade>
    );
  }

  // ==========================================
  // FORMULARIO PRINCIPAL
  // ==========================================
  return (
    <Fade in={true} timeout={500}>
      <Box>
        {/* ALERTA DE ERROR MEJORADA */}
        {serverState?.success === false && (
          <Alert
            severity="error"
            icon={<ErrorIcon fontSize="inherit" />}
            sx={{
              mb: 4,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "error.light",
              "& .MuiAlert-message": { width: "100%" },
            }}
          >
            <AlertTitle sx={{ fontWeight: "bold" }}>
              No pudimos registrar tu comprobante
            </AlertTitle>
            {serverState.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid2 container spacing={3}>
            {/* DATOS DEL CLIENTE */}
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                1. Datos Personales
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nombre Completo"
                {...register("client")}
                error={!!errors.client}
                helperText={errors.client?.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                label="Tipo"
                defaultValue="DNI"
                {...register("doc_type")}
                error={!!errors.doc_type}
                helperText={errors.doc_type?.message}
              >
                {TIPOS_DOCUMENTO.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 8 }}>
              <TextField
                fullWidth
                label="N° Documento"
                {...register("document")}
                error={!!errors.document}
                helperText={errors.document?.message}
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
                label="Correo Electrónico"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid2>

            {/* DATOS DEL COMPROBANTE */}
            <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                2. Datos del Comprobante
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                label="Serie"
                defaultValue=""
                {...register("serie")}
                error={!!errors.serie}
                helperText={errors.serie?.message}
              >
                <MenuItem value="" disabled>
                  Seleccione...
                </MenuItem>
                {SERIES_DISPONIBLES.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="N° Comprobante"
                {...register("num_docu")}
                error={!!errors.num_docu}
                helperText={errors.num_docu?.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Fecha"
                type="date"
                slotProps={{
                  inputLabel: { shrink: true },
                  htmlInput: { min: "2026-06-01", max: "2026-06-29" },
                }}
                {...register("date_register")}
                error={!!errors.date_register}
                helperText={errors.date_register?.message}
              />
            </Grid2>

            {/* TÉRMINOS Y CONDICIONES */}
            <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                3. Términos y Condiciones
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  maxHeight: 150,
                  overflowY: "auto",
                  p: 2,
                  bgcolor: "grey.50",
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <strong>1. MECÁNICA DEL SORTEO:</strong> Participan todos los
                  clientes que registren comprobantes de pago (Boleta o Factura)
                  emitidos dentro de las fechas de vigencia. El monto mínimo de
                  compra debe ser igual o superior a S/ 300.00 o $ 100.00.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>2. VIGENCIA:</strong> Solo serán válidos los
                  comprobantes emitidos desde el{" "}
                  <strong>01 de junio hasta el 29 de junio</strong>. El sistema
                  validará la autenticidad del documento contra nuestra base de
                  datos.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>3. PREMIOS Y ENTREGA:</strong> Los premios son
                  intransferibles y no canjeables por dinero. Nos contactaremos
                  con los ganadores a través del correo o teléfono registrado.
                  En caso de falsificación de datos, el participante será
                  descalificado.
                </Typography>
              </Box>
              <Controller
                name="terminos"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        color="primary"
                      />
                    }
                    label="He leído y acepto los términos y condiciones"
                  />
                )}
              />
              {errors.terminos && (
                <FormHelperText error sx={{ ml: 4 }}>
                  {errors.terminos.message}
                </FormHelperText>
              )}
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <MyButton
                type="submit"
                customVariant="submit"
                size="large"
                fullWidth
                disabled={isPending}
                sx={{ py: 1.5, mt: 1 }}
              >
                {isPending ? (
                  <>
                    <CircularProgress
                      size={24}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Validando...
                  </>
                ) : (
                  "Participar en el Sorteo"
                )}
              </MyButton>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Fade>
  );
}
