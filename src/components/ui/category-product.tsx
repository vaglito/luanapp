"use client";
import { useRouter } from "next/navigation";
import { Box, Container, Stack } from "@mui/material";
import { CardProduct } from "../catalog/product/CardProduct/card-product";
import { Products } from "@/types/products.type";
import { SliderProduct } from "../catalog/product/slider-product";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TypographyWrapper } from "./Typography/Typography";
import { MyButton } from "./Buttons/Buttons";

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
          background:
            "radial-gradient(circle, rgba(163,20,127,0.2) 0%, rgba(0,0,0,0) 70%)",
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
          background:
            "radial-gradient(circle, rgba(89,20,163,0.25) 0%, rgba(0,0,0,0) 70%)",
          zIndex: -1,
          filter: "blur(80px)",
        }}
      />

      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <TypographyWrapper customVariant="hero" color="white">
            Busca tu{" "}
            <TypographyWrapper
              variant="h2"
              component={"span"}
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                color: "info.main",
                letterSpacing: "-0.02em",
                mb: 2,
                textTransform: "uppercase",
              }}
            >
              Laptop Ideal
            </TypographyWrapper>
          </TypographyWrapper>

          <TypographyWrapper
            customVariant="body"
            sx={{
              color: "#d1d5db",
              mx: "auto",
            }}
          >
            Encuentra la potencia perfecta para tus necesidades. Desde
            productividad diaria hasta alto rendimiento para gaming y diseño.
          </TypographyWrapper>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 6 }}
        >
          <MyButton
            customVariant="text"
            size="large"
            startIcon={<LaptopMacIcon />}
            onClick={() => handleFilter("laptop-c-video-integrada")}
          >
            Video Integrado
          </MyButton>

          <MyButton
            customVariant="info"
            size="large"
            startIcon={<SportsEsportsIcon />}
            onClick={() => handleFilter("laptop-cvideo-dedicada")}
          >
            Video Dedicado (Gamer/Pro)
          </MyButton>

          <MyButton
            customVariant="text"
            endIcon={<ArrowForwardIcon />}
            onClick={() => router.push("/buscar?query=laptop")}
          >
            Ver todo
          </MyButton>
        </Stack>

        {/* Slider Section */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* Wrapping the slider to ensure it handles the dark background if cards expect light */}
          {/* If cards are designed for white background (which they seem to be), they will pop out nicely on dark */}
          <SliderProduct
            products={products}
            Component={CardProduct}
            exchange={exchange}
          />
        </Box>
      </Container>
    </Box>
  );
};
