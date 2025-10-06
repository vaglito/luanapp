import { Suspense } from "react";
import { getProductSearch } from "@/app/lib/api/products";
import { ResponseProducts } from "@/app/types/v2/products-type";
import { Box, Container, Typography, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import Link from "next/link";
import { GridProduct } from "@/app/components/product/grid-product";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { Filter } from "@/app/components/product/search/Filter";
import { CategoryFilter } from "@/app/components/product/search/CategoryFilter";
import { BrandFilter } from "@/app/components/product/search/BrandFilter";
import { fetchCategoriesSearch } from "@/app/lib/api/categorys";
import { fetchBrandSearch } from "@/app/lib/api/brands";
import { CategoryFilterSkeleton } from "@/app/components/ui/skeleton/categoryfilter-skeleton";

export const revalidate = 0;

interface searchParamsProps {
  searchParams?: {
    query?: string;
    page?: string;
    marca?: string;
    subcategoria?: string;
  };
}

export default async function SearchPage({ searchParams }: searchParamsProps) {
  const query = searchParams?.query || "";

  // Convierte a array si hay más de un valor en la URL (&marca=xx&marca=yy)
  const marca = Array.isArray(searchParams?.marca)
    ? searchParams.marca
    : searchParams?.marca
    ? [searchParams.marca]
    : [];
  const subcategoria = Array.isArray(searchParams?.subcategoria)
    ? searchParams.subcategoria
    : searchParams?.subcategoria
    ? [searchParams.subcategoria]
    : [];

  let currentPage = Number(searchParams?.page) || 1;
  let searchProduct: ResponseProducts | undefined;

  try {
    searchProduct = await getProductSearch({
      query,
      brandSlugs: marca,
      subcategorySlugs: subcategoria,
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
      {/* Encabezado responsivo */}
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
          Resultados para: {query}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
        >
          {searchProduct.count} productos encontrados
        </Typography>
      </Box>

      {/* Productos */}
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
                  fetchData: fetchBrandSearch,
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
          <GridProduct products={searchProduct.results} />
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

      {/* Paginación */}
    </Container>
  );
}
