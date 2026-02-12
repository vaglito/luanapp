"use client";
import { useRouter } from "next/navigation";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import { CardProduct } from "../product/card-product";
import { Products } from "@/types/products.type";
import { SliderProduct } from "../product/slider-product";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const SectionLaptop = ({
  products,
  exchange,
}: {
  products: Products[];
  exchange: number;
}) => {
  const router = useRouter();

  const handleFilter = (subcategory: string) => {
    router.push(`/buscar?query=laptop&subcategoria=${subcategory}`);
  };

  return (
    <Box sx={{ py: 6, position: "relative", overflow: "hidden" }}>
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // Dark premium gradient derived from Primary (#5914A3) and Secondary (#A3147F)
          background: "linear-gradient(135deg, #1a052e 0%, #290b4d 100%)",
          zIndex: -2,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "-50%",
          left: "-20%",
          width: "80%",
          height: "200%",
          // Secondary Color Blob #A3147F
          background: "radial-gradient(circle, rgba(163,20,127,0.2) 0%, rgba(0,0,0,0) 70%)",
          zIndex: -1,
          filter: "blur(80px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "60%",
          height: "150%",
          // Primary Color Blob #5914A3
          background: "radial-gradient(circle, rgba(89,20,163,0.25) 0%, rgba(0,0,0,0) 70%)",
          zIndex: -1,
          filter: "blur(80px)",
        }}
      />

      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.02em",
              mb: 2,
              textTransform: "uppercase",
            }}
          >
            Busca tu <Typography variant="h2" component={"span"} sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              color: "info.main",
              letterSpacing: "-0.02em",
              mb: 2,
              textTransform: "uppercase",
            }}>Laptop Ideal</Typography>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              color: "#d1d5db",
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Encuentra la potencia perfecta para tus necesidades. Desde
            productividad diaria hasta alto rendimiento para gaming y diseño.
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 6 }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<LaptopMacIcon />}
            onClick={() => handleFilter("laptop-c-video-integrada")}
            sx={{
              bgcolor: "white",
              color: "#333",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 50,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 14px 0 rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#f3f4f6",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(255,255,255,0.2)",
              },
            }}
          >
            Video Integrado
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<SportsEsportsIcon />}
            onClick={() => handleFilter("laptop-cvideo-dedicada")}
            sx={{
              bgcolor: "#A3147F",
              color: "white",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 50,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 14px 0 rgba(163, 20, 127, 0.39)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#8a116b",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(163, 20, 127, 0.6)",
              },
            }}
          >
            Video Dedicado (Gamer/Pro)
          </Button>

          <Button
            variant="text"
            endIcon={<ArrowForwardIcon />}
            onClick={() => router.push("/buscar?query=laptop")}
            sx={{
              color: "white",
              fontWeight: 600,
              ml: { sm: 2 },
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                color: "#A3147F",
                bgcolor: "rgba(255,255,255,0.05)"
              },
            }}
          >
            Ver todo
          </Button>
        </Stack>

        {/* Slider Section */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* Wrapping the slider to ensure it handles the dark background if cards expect light */}
          {/* If cards are designed for white background (which they seem to be), they will pop out nicely on dark */}
          <SliderProduct products={products} Component={CardProduct} exchange={exchange} />
        </Box>
      </Container>
    </Box>
  );
};
