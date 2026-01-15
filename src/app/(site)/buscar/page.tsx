import { Suspense } from "react";
import Link from "next/link";
import { fetchProductSearchList } from "@/app/services/products";
import { PaginatedResponse } from "@/app/types/paginatedResponse.type";
import { Products } from "@/app/types/products.type";
import { Box, Container, Typography, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
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

  let currentPage = Number(resolvedSearchParams.page) || 1;
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
      <Container maxWidth="xl">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 2,
          }}
        >
          <ErrorIcon color="error" sx={{ fontSize: 50 }} />
          <Typography variant="h5" gutterBottom>
            Ocurrió un error al buscar productos.
          </Typography>
          <Link href="/">
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Volver a la página principal
            </Button>
          </Link>
        </Box>
      </Container>
    );
  }

  if (!searchProduct) {
    return (
      <Container maxWidth="xl">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 2,
          }}
        >
          <ErrorIcon color="error" sx={{ fontSize: 50 }} />
          <Typography variant="h5" gutterBottom>
            No se encontraron resultados para {query}.
          </Typography>
          <Link href="/">
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Volver a la página principal
            </Button>
          </Link>
        </Box>
      </Container>
    );
  }

  const totalPages = Math.ceil(searchProduct.count / 20);
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          color: "#545454",
          p: 2,
          mb: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" }, fontWeight: 600 }}
        >
          Resultados para: {query === "" ? "Todos los productos" : query}
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
        >
          {searchProduct.count} productos encontrados
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          marginY: 4,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          gap: { xs: 1, sm: 1, md: 2, lg: 4, xl: 4 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "20%", lg: "20%", xl: "20%" },
            backgroundColor: "#fff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
          }}
        >
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
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "80%", lg: "80%", xl: "80%" },
          }}
        >
          <GridProduct
            products={searchProduct.results}
            exchange={exchange.exchange}
          />
          <Suspense fallback={<div>Cargando paginación...</div>}>
            <Box sx={{ mt: 4 }}>
              <PaginationButtons
                totalPages={totalPages}
                currentPage={currentPage}
                marca={marca}
                subcategoria={subcategoria}
              />
            </Box>
          </Suspense>
        </Box>
      </Box>
    </Container>
  );
}
