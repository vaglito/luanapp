import { fetchProductSearchList } from "@/services/products";
import { fetchExchangeRate } from "@/services/exchangeRate";
import { GridProduct } from "@/components/product/grid-product";
import { PaginationButtons } from "@/components/PaginationButtons";
import { Box, Typography, Button, Paper } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ErrorIcon from "@mui/icons-material/Error";
import Link from "next/link";

interface ProductResultListProps {
    query: string;
    page: number;
    marca?: string[];
    subcategoria?: string[];
}

export const ProductResultList = async ({
    query,
    page,
    marca,
    subcategoria,
}: ProductResultListProps) => {
    try {
        const [searchProduct, exchange] = await Promise.all([
            fetchProductSearchList({
                search: query,
                brand: marca,
                subcategory: subcategoria,
                page: page,
            }),
            fetchExchangeRate(),
        ]);

        if (!searchProduct || searchProduct.results.length === 0) {
            return (
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
                    <Typography variant="h4" color="#545454" fontWeight={700} gutterBottom>
                        Sin resultados para "{query}"
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
                    >
                        No encontramos productos que coincidan con tu búsqueda. Intenta
                        revisar la ortografía o usar términos más generales.
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
                            Explorar Catálogo General
                        </Button>
                    </Link>
                </Paper>
            );
        }

        const totalPages = Math.ceil(searchProduct.count / 20);

        return (
            <Box sx={{ flexGrow: 1 }}>
                {/* Results Info Header could go here or parent, but let's keep simple */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Mostrando {searchProduct.results.length} de {searchProduct.count} resultados
                    </Typography>
                </Box>

                <Box sx={{ minHeight: 400 }}>
                    <GridProduct
                        products={searchProduct.results}
                        exchange={exchange.exchange}
                    />
                </Box>

                <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
                    <PaginationButtons
                        totalPages={totalPages}
                        currentPage={page}
                        marca={marca}
                        subcategoria={subcategoria}
                    />
                </Box>
            </Box>
        );
    } catch (error) {
        return (
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
                    Ocurrió un error al buscar productos.
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                    Por favor, intenta recargar la página o vuelve más tarde.
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => window.location.reload()} // Simple reload
                    sx={{ bgcolor: "#5914A3", "&:hover": { bgcolor: "#450b82" } }}
                >
                    Recargar
                </Button>
            </Paper>
        );
    }
};

