import { fetchProductList } from "@/services/catalog/products";
import { fetchExchangeRate } from "@/services/catalog/exchangeRate";
import { GridProduct } from "@/components/catalog/product/grid-product";
import { PaginationButtons } from "@/components/common/PaginationButtons";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import { EmptyState } from "@/components/shared/EmptyState";
import ErrorIcon from "@mui/icons-material/Error";
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
                    <Container maxWidth="xl" sx={{ mt: 8, mb: 8, px: { xs: 2, sm: 2 } }}>
                        <EmptyState
                            title="No hay productos en esta categoría"
                            description={`Actualmente no tenemos stock disponible para ${startCase(subcategorySlug)}. Por favor revisa otras categorías.`}
                            primaryAction={{ label: "Volver al catálogo", href: "/productos" }}
                            secondaryAction={{ label: "Limpiar filtros", href: `/catalogo/${categorySlug}/${subcategorySlug}` }}
                        />
                    </Container>
                );
            }
        }

        const totalPages = Math.ceil(productsData.count / 20);

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2, px: { xs: 2, sm: 0 } }}>
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
            <Container maxWidth="xl" sx={{ mt: 8, mb: 8, px: { xs: 2, sm: 2 } }}>
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

