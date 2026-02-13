import { Typography, Box, Container, Grid } from "@mui/material";
import { fetchPopularProducts } from "@/services/products";
import { FeaturedProduct } from "../product/featured-product";
import { PopularProductsCarousel } from "./popular-products-carousel";

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
        <Box component="section" sx={{ my: 8 }}>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 6,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontFamily: "var(--font-orbitron)",
                            fontWeight: 800,
                            mb: 2,
                            background: "linear-gradient(45deg, #FFD700 0%, #FDB931 50%, #A0522D 100%)", // Gold-Like Gradient for Ranking
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: { xs: "2rem", md: "3rem" },
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                        }}
                    >
                        Lo Más Buscado
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{
                            maxWidth: "600px",
                            fontFamily: "var(--font-inter)",
                            fontSize: { xs: "1rem", md: "1.1rem" },
                        }}
                    >
                        Descubre lo que todos están buscando.
                    </Typography>
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
