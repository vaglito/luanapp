import RegisterForm from "@/app/components/auth/RegisterForm";
import { Box, Typography, Container, Paper, Divider, Link } from "@mui/material";
import NextLink from "next/link";

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Fondo con un degradado sutil o color neutro claro
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Header del Formulario */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              Crear una cuenta
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Regístrate para gestionar tus proformas y productos de manera eficiente.
            </Typography>
          </Box>

          <RegisterForm />

          <Divider sx={{ my: 4, width: "100%" }}>
            <Typography variant="body2" color="text.secondary">
              ¿YA TIENES CUENTA?
            </Typography>
          </Divider>

          <Typography variant="body2">
            ¿Ya eres miembro?{" "}
            <Link
              component={NextLink}
              href="/login"
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Inicia sesión aquí
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}