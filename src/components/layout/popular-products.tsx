import { Typography, Box, Container } from "@mui/material";
import { fetchPopularProducts } from "@/services/catalog/products";
import { FeaturedProduct } from "../catalog/product/featured-product/featured-product";
import { PopularProductsCarousel } from "../catalog/product/featured-product/popular-products-carousel";
import { MyButton } from "../ui/Buttons/Buttons";
import { TypographyWrapper } from "../ui/Typography/Typography";

export const PopularProducts = async ({ exchange }: { exchange: number }) => {
  const products = await fetchPopularProducts();

  if (!products || products.length === 0) {
    return null;
  }

  // Top 1 Product
  const featuredProduct = products[0];
  // Next 14 Products (2-15)
  const otherProducts = products.slice(1, 20);

  return (
    <Box component="section" sx={{ my: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: { xs: 3, md: 6 },
            textAlign: "center",
            px: { xs: 2, sm: 0 },
          }}
        >
          <TypographyWrapper customVariant="hero" variant="h2" gradient="brand">
            Lo Más Buscado
          </TypographyWrapper>
          <TypographyWrapper customVariant="body">
            Descubre lo que todos están buscando.
          </TypographyWrapper>
        </Box>

        {/* Stack Layout: Row 1 = Featured, Row 2 = Carousel */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Row 1: Featured Product (Horizontal #1) */}
          <Box sx={{ width: "100%" }}>
            <FeaturedProduct product={featuredProduct} exchange={exchange} />
          </Box>

          {/* Row 2: Carousel of Other Products (#2-5) */}
          <Box sx={{ width: "100%" }}>
            <PopularProductsCarousel
              products={otherProducts}
              exchange={exchange}
              startRank={2}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
