import Link from "next/link";
import { Container, Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { MyButton } from "@/components/ui/Buttons/Buttons";
import { TypographyWrapper } from "@/components/ui/Typography/Typography";

export const metadata = {
  title: "Página no encontrada | Corporación Luana",
  description: "Esta página no ha sido encontrada",
};

export default function NotFound() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden", // Contain background blobs
      }}
    >
      {/* Background Blobs */}

      <Box sx={{ textAlign: "center", zIndex: 1, maxWidth: "700px" }}>
        {/* Animated 404 */}
        <TypographyWrapper variant="h1" customVariant="hero" color="#545454">
          Error 404
        </TypographyWrapper>

        <Typography variant="h4" color="#545454">¡Vaya! Te has perdido en la nube</Typography>

        <Typography
          sx={{
            color: "#6b7280",
            fontSize: { xs: "1rem", md: "1.1rem" },
            mb: 5,
            lineHeight: 1.6,
            maxWidth: "500px",
            mx: "auto",
          }}
        >
          La página que buscas no existe o ha sido movida. Tranquilo, en nuestra
          tienda siempre encuentras el camino correcto.
        </Typography>

        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <MyButton
            customVariant="submit"
            startIcon={<HomeIcon />}
            size="large"
          >
            Ir al Inicio
          </MyButton>
        </Link>
      </Box>
    </Container>
  );
}
