import { Typography, Box, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        {/* Icono */}
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main" }} />

        {/* Título */}
        <Typography variant="h3" color="textPrimary" fontWeight="bold">
          Producto no encontrado
        </Typography>

        {/* Mensaje */}
        <Typography variant="body1" color="textSecondary" maxWidth="sm">
          El producto que buscas no está disponible actualmente. Puede que haya sido
          eliminado o que el enlace sea incorrecto. Te invitamos a regresar al catálogo
          y seguir explorando nuestras ofertas.
        </Typography>

        {/* Botón de acción */}
        <Box>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            size="large"
          >
            Volver al catálogo
          </Button>
        </Box>
      </Box>
    </Container>
  );
}