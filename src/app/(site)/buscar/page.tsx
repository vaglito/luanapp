import { Suspense } from "react";
import Link from "next/link";
import { fetchProductSearchList } from "@/app/services/products";
import { PaginatedResponse } from "@/app/types/paginatedResponse.type";
import { Products } from "@/app/types/products.type";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { GridProduct } from "@/app/components/product/grid-product";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { Filter } from "@/app/components/product/search/Filter";
import { CategoryFilter } from "@/app/components/product/search/CategoryFilter";
import { BrandFilter } from "@/app/components/product/search/BrandFilter";
import { fetchCategoriesSearch } from "@/app/services/categories";
import { fetchBrandsSearch } from "@/app/services/brands";
import { CategoryFilterSkeleton } from "@/app/components/ui/skeleton/categoryfilter-skeleton";
import { fetchExchangeRate } from "@/app/services/exchangeRate";

export const revalidate = 0;

interface searchParamsProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    marca?: string[];
    subcategoria?: string[];
  }>;
}

export default async function SearchPage({ searchParams }: searchParamsProps) {
  const exchange = await fetchExchangeRate();
  const resolvedSearchParams = (await searchParams) || {};
  const query = resolvedSearchParams?.query || "";

  const { marca, subcategoria } = resolvedSearchParams;
  const pageParam = parseInt(resolvedSearchParams.page || "1", 10);
  let currentPage = isNaN(pageParam) ? 1 : pageParam;

  let searchProduct: PaginatedResponse<Products> | undefined;

  try {
    searchProduct = await fetchProductSearchList({
      search: query,
      brand: marca,
      subcategory: subcategoria,
      page: currentPage,
    });
  } catch (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: 4, bgcolor: "#fff", border: "1px solid #e5e7eb" }}>
          <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom fontWeight={600}>
            Ocurrió un error al buscar productos.
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Por favor, intenta recargar la página o vuelve más tarde.
          </Typography>
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ bgcolor: "#5914A3", "&:hover": { bgcolor: "#450b82" } }}>
              Volver al inicio
            </Button>
          </Link>
        </Paper>
      </Container>
    );
  }

  // Handle No Results or Empty Data
  if (!searchProduct || searchProduct.results.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
        <Paper elevation={0} sx={{ p: 6, textAlign: "center", borderRadius: 4, bgcolor: "#fff", border: "1px dashed #e5e7eb" }}>
          <SearchOffIcon sx={{ fontSize: 80, color: "#d1d5db", mb: 2 }} />
          <Typography variant="h4" color="#545454" fontWeight={700} gutterBottom>
            Sin resultados para "{query}"
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            No encontramos productos que coincidan con tu búsqueda.
            Intenta revisar la ortografía o usar términos más generales.
          </Typography>
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Button variant="contained" size="large" sx={{ bgcolor: "#A3147F", borderRadius: 50, px: 4, "&:hover": { bgcolor: "#800e63" } }}>
              Explorar Catálogo General
            </Button>
          </Link>
        </Paper>
      </Container>
    );
  }

  const totalPages = Math.ceil(searchProduct.count / 20);
  // Ensure valid page range
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }
  if (currentPage < 1) currentPage = 1;


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
          boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.05)"
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#545454", fontSize: { xs: "1.5rem", md: "2rem" } }}>
            {query ? `Busqueda: ${query}` : "Catálogo de Productos"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Mostrando {searchProduct.results.length} de {searchProduct.count} resultados
          </Typography>
        </Box>

        {/* You could add a sort selector here later */}
      </Paper>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 4 }}>
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
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#545454" }}>Filtros</Typography>
          <Suspense fallback={<CategoryFilterSkeleton />}>
            <Filter
              query={query}
              filters={[
                {
                  title: "Marcas",
                  fetchData: fetchBrandsSearch,
                  Component: BrandFilter,
                },
                {
                  title: "Categorías",
                  fetchData: fetchCategoriesSearch,
                  Component: CategoryFilter,
                },
              ]}
            />
          </Suspense>
        </Box>

        {/* Product Grid */}
        <Box sx={{ flexGrow: 1 }}>
          <Suspense fallback={<CategoryFilterSkeleton />}>
            <Box sx={{ minHeight: 400 }}>
              <GridProduct
                products={searchProduct.results}
                exchange={exchange.exchange}
              />
            </Box>
          </Suspense>

          <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
            <PaginationButtons
              totalPages={totalPages}
              currentPage={currentPage}
              marca={marca}
              subcategoria={subcategoria}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
