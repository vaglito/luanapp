"use client";

import { useEffect } from "react";
import { Box, Typography, Button, Alert } from "@mui/material";

export default function ErrorInvoices({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registra el error en un servicio de reporte si es necesario
    console.error(error);
  }, [error]);

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Mis Facturas
      </Typography>

      <Alert severity="error" sx={{ mb: 3, display: "inline-flex" }}>
        Ocurrió un error al intentar cargar sus facturas o el servicio no está
        disponible en este momento.
      </Alert>

      <Box>
        <Button variant="contained" onClick={() => reset()} sx={{ mt: 2 }}>
          Intentar de nuevo
        </Button>
      </Box>
    </Box>
  );
}
