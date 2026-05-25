import { TypographyWrapper } from "../ui/Typography/Typography";
import { Box } from "@mui/material";
import { SliderProduct } from "../catalog/product/slider-product";
import { Products } from "@/types/products.type";
import { CardProduct } from "../catalog/product/CardProduct/card-product";

export const NewProducts = ({
  products,
  exchange,
}: {
  products: Products[];
  exchange: number;
}) => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        my: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: { xs: 4, md: 6 },
          textAlign: "center",
          px: 2,
        }}
      >
        <TypographyWrapper customVariant="hero" variant="h2" gradient="brand">
          Nuevos Ingresos
        </TypographyWrapper>
        <TypographyWrapper customVariant="body">
          Descubre los últimos lanzamientos y actualizaciones de nuestro
          catálogo.
        </TypographyWrapper>
      </Box>
      <Box>
        <SliderProduct
          products={products}
          Component={CardProduct}
          exchange={exchange}
        />
      </Box>
    </Box>
  );
};
