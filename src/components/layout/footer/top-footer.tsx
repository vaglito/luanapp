import { Box, Typography, Grid2, Container } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HttpsIcon from "@mui/icons-material/Https";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export function TopFooter() {
  const items = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 48, color: "white" }} />,
      title: "Delivery Seguro",
      description: "Tus productos llegan protegidos y a tiempo a tu dirección.",
      color: "#5914A3", // Primary
    },
    {
      icon: <HttpsIcon sx={{ fontSize: 48, color: "white" }} />,
      title: "Compra Protegida",
      description: "Transacciones encriptadas y 100% seguras.",
      color: "#A3147F", // Secondary
    },
    {
      icon: <StorefrontIcon sx={{ fontSize: 48, color: "white" }} />,
      title: "Retiro en Tienda",
      description: "Recoge tu pedido gratis en nuestra tienda física.",
      color: "#5914A3", // Primary
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 48, color: "white" }} />,
      title: "Soporte Experto",
      description: "Asesoría personalizada antes y después de tu compra.",
      color: "#A3147F", // Secondary
    },
  ];

  return (
    <Box component="section" sx={{ bgcolor: "white", py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              color: "#333",
              fontWeight: 700,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              mb: 1,
            }}
          >
            Vive la Experiencia <span style={{ color: "#5914A3" }}>Luana</span>
          </Typography>
          <Typography
            sx={{
              color: "#6b7280",
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Nos comprometemos a ofrecerte soluciones confiables, innovadoras y seguras.
          </Typography>
        </Box>

        <Grid2 container spacing={4} justifyContent="center">
          {items.map((item, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  height: "100%",
                  p: 3,
                  borderRadius: 4,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {/* Icon Container */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: item.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                    boxShadow: `0 8px 20px -6px ${item.color}`,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, color: "#374151", mb: 1 }}>
                  {item.title}
                </Typography>

                <Typography variant="body2" sx={{ color: "#6b7280", lineHeight: 1.6 }}>
                  {item.description}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
