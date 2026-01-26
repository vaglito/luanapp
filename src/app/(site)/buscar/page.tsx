import { Suspense } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { ProductResultList } from "@/components/product/search/product-result-list";
import { FilterList } from "@/components/product/search/filter-list";
import {
  ProductListSkeleton,
  FiltersSkeleton,
} from "@/components/ui/skeleton/search-skeletons";

export const revalidate = 0;

interface SearchParamsProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    marca?: string | string[];
    subcategoria?: string | string[];
  }>;
}

export default async function SearchPage({ searchParams }: SearchParamsProps) {
  const resolvedSearchParams = (await searchParams) || {};
  const query = resolvedSearchParams?.query || "";
  const pageParam = parseInt(resolvedSearchParams.page || "1", 10);
  const currentPage = isNaN(pageParam) ? 1 : pageParam;

  // Handle potentially array or string params
  const marca = resolvedSearchParams.marca
    ? Array.isArray(resolvedSearchParams.marca)
      ? resolvedSearchParams.marca
      : [resolvedSearchParams.marca]
    : undefined;

  const subcategoria = resolvedSearchParams.subcategoria
    ? Array.isArray(resolvedSearchParams.subcategoria)
      ? resolvedSearchParams.subcategoria
      : [resolvedSearchParams.subcategoria]
    : undefined;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Results Info */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          p: 3,
          mb: 4,
          borderRadius: 3,
          bgcolor: "white",
          border: "1px solid #e5e7eb",
          boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.05)",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#545454",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            {query ? `Búsqueda: ${query}` : "Catálogo de Productos"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Explora nuestro catálogo completo
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
        }}
      >
        {/* Sidebar Filters */}
        <Box
          sx={{
            width: { xs: "100%", lg: "280px" },
            flexShrink: 0,
            bgcolor: "#fff",
            p: 3,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            height: "fit-content",
            position: { lg: "sticky" },
            top: { lg: 100 },
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: "#545454" }}
          >
            Filtros
          </Typography>
          <Suspense fallback={<FiltersSkeleton />}>
            <FilterList query={query} />
          </Suspense>
        </Box>

        {/* Product Grid */}
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductResultList
            query={query}
            page={currentPage}
            marca={marca}
            subcategoria={subcategoria}
          />
        </Suspense>
      </Box>
    </Container>
  );
}

