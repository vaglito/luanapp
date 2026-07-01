import { Container, Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

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
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: { xs: "300px", md: "500px" },
          height: { xs: "300px", md: "500px" },
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: { xs: "250px", md: "400px" },
          height: { xs: "250px", md: "400px" },
          bgcolor: "rgba(255, 140, 198, 0.05)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: -1,
        }}
      />

      <Box sx={{ textAlign: "center", zIndex: 1, maxWidth: "700px" }}>
        {/* Animated 404 */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "8rem", sm: "12rem", md: "16rem" },
            fontWeight: 900,
            lineHeight: 0.85,
            mb: 2,
            background: "linear-gradient(135deg, #A3147F 0%, #ff8cc6 100%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            userSelect: "none",
            animation: "float 6s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-20px)" },
            },
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#545454",
            mb: 2,
            fontSize: { xs: "1.5rem", md: "2.5rem" },
          }}
        >
          ¡Vaya! Te has perdido en la nube
        </Typography>

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
          La página que buscas no existe o ha sido movida. Tranquilo, en nuestra tienda siempre encuentras el camino correcto.
        </Typography>

        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            sx={{
              bgcolor: "#A3147F",
              py: 1.5,
              px: 6,
              borderRadius: "50px", // Rounded pill shape
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 10px 20px rgba(163, 20, 127, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#8a116b",
                transform: "translateY(-3px)",
                boxShadow: "0 15px 30px rgba(163, 20, 127, 0.3)",
              },
            }}
          >
            Ir al Inicio
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
