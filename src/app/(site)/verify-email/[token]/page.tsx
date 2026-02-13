"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { VerifyEmailAction } from "@/actions/auth-actions";
import { CircularProgress, Typography, Stack, Alert, Button, Container } from "@mui/material";

export default function VerifyEmailPage() {
  const { token } = useParams(); // Extrae el token de la URL
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const hasCalled = useRef(false); // Para evitar doble llamada en StrictMode

  useEffect(() => {
    if (token && !hasCalled.current) {
      hasCalled.current = true;
      handleVerification(token as string);
    }
  }, [token]);

  const handleVerification = async (tokenStr: string) => {
    const res = await VerifyEmailAction(tokenStr);

    if (res.success) {
      setStatus("success");
      setMessage(res.detail);
      setTimeout(() => router.push("/login"), 5000);
    } else {
      setStatus("error");
      setMessage(res.error || "Error desconocido al verificar el email.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={4} alignItems="center" sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">Verificación de Email</Typography>

        {status === "loading" && (
          <>
            <CircularProgress color="primary" />
            <Typography variant="body1">
              Procesando tu código de verificación...
            </Typography>
          </>
        )}

        {status === "success" && (
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            {message}. Serás redirigido al inicio de sesión en unos segundos.
          </Alert>
        )}

        {status === "error" && (
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Alert severity="error" variant="outlined">
              {message}
            </Alert>
            <Button
              variant="contained"
              onClick={() => router.push("/registro")}
              fullWidth
            >
              Ir al Registro
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}