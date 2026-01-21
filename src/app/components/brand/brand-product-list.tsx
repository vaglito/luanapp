import { fetchProductList } from "@/app/services/products";
import { fetchExchangeRate } from "@/app/services/exchangeRate";
import { GridProduct } from "@/app/components/product/grid-product";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ErrorIcon from "@mui/icons-material/Error";
import Link from "next/link";
import { startCase } from "lodash";

interface BrandProductListProps {
    brandSlug: string;
    subcategoria?: string | string[];
    page: number;
}

export const BrandProductList = async ({
    brandSlug,
    subcategoria,
    page,
}: BrandProductListProps) => {
    const brandName = startCase(brandSlug);
    const marca = [brandSlug];
    // Normalize subcategoria to array for service
    const subcategoryArray = Array.isArray(subcategoria)
        ? subcategoria
        : subcategoria
            ? [subcategoria]
            : [];

    try {
        const [exchange, productsData] = await Promise.all([
            fetchExchangeRate(),
            fetchProductList({
                brand: marca,
                subcategory: subcategoryArray,
                page: page,
            }),
        ]);

        // Handle Empty Data
        if (!productsData || productsData.results.length === 0) {
            if (!productsData || productsData.count === 0) {
                return (
                    <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 6,
                                textAlign: "center",
                                borderRadius: 4,
                                bgcolor: "#fff",
                                border: "1px dashed #e5e7eb",
                            }}
                        >
                            <SearchOffIcon sx={{ fontSize: 80, color: "#d1d5db", mb: 2 }} />
                            <Typography
                                variant="h4"
                                color="#545454"
                                fontWeight={700}
                                gutterBottom
                            >
                                No hay productos disponibles de {brandName}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
                            >
                                Actualmente no tenemos stock disponible para esta marca. Por favor
                                revisa otras opciones en nuestro catálogo.
                            </Typography>
                            <Link href="/marcas" passHref style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        bgcolor: "#A3147F",
                                        borderRadius: 50,
                                        px: 4,
                                        "&:hover": { bgcolor: "#800e63" },
                                    }}
                                >
                                    Volver a las marcas
                                </Button>
                            </Link>
                        </Paper>
                    </Container>
                );
            }
        }

        const totalPages = Math.ceil(productsData.count / 20);

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Mostrando {productsData.results.length} de {productsData.count} productos
                    </Typography>
                </Box>
                <GridProduct
                    products={productsData.results}
                    exchange={exchange.exchange}
                />
                <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
                    <PaginationButtons
                        totalPages={totalPages}
                        currentPage={page}
                        subcategoria={subcategoryArray}
                    />
                </Box>
            </Box>
        );
    } catch (error) {
        return (
            <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        textAlign: "center",
                        borderRadius: 4,
                        bgcolor: "#fff",
                        border: "1px solid #e5e7eb",
                    }}
                >
                    <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        gutterBottom
                        fontWeight={600}
                    >
                        Ocurrió un error al cargar los productos.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                        Por favor, intenta recargar la página o vuelve más tarde.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()}
                        sx={{ bgcolor: "#5914A3", "&:hover": { bgcolor: "#450b82" } }}
                    >
                        Recargar
                    </Button>
                </Paper>
            </Container>
        );
    }
};
