import { fetchProductList } from "@/app/services/products";
import { fetchExchangeRate } from "@/app/services/exchangeRate";
import { GridProduct } from "@/app/components/product/grid-product";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ErrorIcon from "@mui/icons-material/Error";
import Link from "next/link";
import { startCase } from "lodash";

interface SubCategoryProductListProps {
    categorySlug: string;
    subcategorySlug: string;
    marca?: string | string[];
    page: number;
}

export const SubCategoryProductList = async ({
    categorySlug,
    subcategorySlug,
    marca,
    page,
}: SubCategoryProductListProps) => {
    try {
        const [exchange, productsData] = await Promise.all([
            fetchExchangeRate(),
            fetchProductList({
                category: categorySlug,
                subcategory: subcategorySlug,
                brand: Array.isArray(marca) ? marca : marca ? [marca] : [],
                page: page,
            }),
        ]);

        // Handle Empty State
        if (!productsData || productsData.results.length === 0) {
            const isEmpty = !productsData || productsData.count === 0;
            if (isEmpty) {
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
                                No hay productos en esta categoría
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
                            >
                                Actualmente no tenemos stock disponible para{" "}
                                {startCase(subcategorySlug)}. Por favor revisa otras categorías.
                            </Typography>
                            <Link href="/" passHref style={{ textDecoration: "none" }}>
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
                                    Volver al Inicio
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
                    {/* Optional count display, mirroring search page styling */}
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
                        marca={Array.isArray(marca) ? marca : marca ? [marca] : []}
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
