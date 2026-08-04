import { fetchProductSearchList } from "@/services/catalog/products";
import { fetchExchangeRate } from "@/services/catalog/exchangeRate";
import { GridProduct } from "@/components/catalog/product/grid-product";
import { PaginationButtons } from "@/components/common/PaginationButtons";
import { Box, Typography } from "@mui/material";
import { EmptyState } from "@/components/shared/EmptyState";
import { SearchErrorFallback } from "./SearchErrorFallback";

interface ProductResultListProps {
    query: string;
    page: number;
    marca?: string[];
    subcategoria?: string[];
    ordering?: string;
}

export const ProductResultList = async ({
    query,
    page,
    marca,
    subcategoria,
    ordering,
}: ProductResultListProps) => {
    try {
        const [searchProduct, exchange] = await Promise.all([
            fetchProductSearchList({
                search: query,
                brand: marca,
                subcategory: subcategoria,
                page: page,
                ordering: ordering,
            }),
            fetchExchangeRate(),
        ]);

        if (!searchProduct || searchProduct.results.length === 0) {
            return (
                <EmptyState
                    title={`Sin resultados para "${query}"`}
                    description="No encontramos productos que coincidan con tu búsqueda. Intenta revisar la ortografía o usar términos más generales."
                    primaryAction={{ label: "Volver al catálogo", href: "/productos" }}
                    secondaryAction={{ label: "Limpiar filtros", href: "/buscar" }}
                />
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
            <SearchErrorFallback message="Ocurrió un error al buscar productos." />
        );
    }
};
