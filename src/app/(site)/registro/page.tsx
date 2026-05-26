import RegisterForm from "@/components/auth/RegisterForm";
import { Box, Container, Paper, Divider } from "@mui/material";
import Link from "next/link";
import { TypographyWrapper } from "@/components/ui/Typography/Typography";

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Header del Formulario */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <TypographyWrapper customVariant="subtitle" variant="h1">
              Crear una cuenta
            </TypographyWrapper>
            <TypographyWrapper color="text.secondary">
              Regístrate para gestionar tus proformas y productos de manera
              eficiente.
            </TypographyWrapper>
          </Box>

          <RegisterForm />

          <Divider sx={{ my: 4, width: "100%" }}>
            <TypographyWrapper color="text.secondary">
              ¿YA TIENES CUENTA?
            </TypographyWrapper>
          </Divider>

          <TypographyWrapper>
            ¿Ya eres miembro?{" "}
            <Link
              href="/login"
              className="font-bold hover:underline text-[#5914A3]"
            >
              Inicia sesión aquí
            </Link>
          </TypographyWrapper>
        </Paper>
      </Container>
    </Box>
  );
}
