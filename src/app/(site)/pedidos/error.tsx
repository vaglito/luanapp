"use client";

import { useRouter } from "next/navigation";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface PedidosErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PedidosError({ error, reset }: PedidosErrorProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 400,
      }}
    >
      <Alert
        severity="error"
        variant="outlined"
        sx={{
          maxWidth: 500,
          width: "100%",
          borderRadius: 2,
        }}
        action={
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              color="inherit"
              size="small"
              onClick={() => reset()}
              startIcon={<RefreshIcon />}
            >
              Reintentar
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={() => router.refresh()}
            >
              Recargar
            </Button>
          </Box>
        }
      >
        <AlertTitle>Error al cargar pedidos</AlertTitle>
        No se pudieron cargar los pedidos. Por favor, intenta de nuevo.
      </Alert>
    </Box>
  );
}
