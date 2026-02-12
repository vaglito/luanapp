import { Typography, Box } from "@mui/material";
import { SliderProduct } from "../product/slider-product";
import { CardProduct } from "../product/card-product";
import { fetchPopularProducts } from "@/services/products";

export const PopularProducts = async ({ exchange }: { exchange: number }) => {
    const products = await fetchPopularProducts();

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <Box component="section" sx={{ my: 8 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 4,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        fontWeight: 800,
                        mb: 1,
                        background: "linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)", // Gradiente diferente para diferenciar
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: { xs: "2rem", md: "3rem" },
                    }}
                >
                    Lo Más Popular
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                        maxWidth: "600px",
                        fontSize: { xs: "1rem", md: "1.1rem" },
                    }}
                >
                    Los productos favoritos de nuestra comunidad.
                </Typography>
            </Box>

            <SliderProduct
                products={products}
                Component={CardProduct}
                exchange={exchange}
            />
        </Box>
    );
};
