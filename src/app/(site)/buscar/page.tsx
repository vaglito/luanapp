import { Suspense } from "react";
import { getProductSearch } from "@/app/services/products";
import { ResponseProducts } from "@/app/types/v2/products-type";
import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import Link from "next/link";
import { GridProduct } from "@/app/components/product/grid-product";
import { PaginationButtons } from "@/app/components/PaginationButtons";

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
  const keepFilters = searchParams?.query && query === searchParams.query;
  const marca = keepFilters ? searchParams?.marca || "" : "";
  const subcategoria = keepFilters ? searchParams?.subcategoria || "" : "";
  let currentPage = Number(searchParams?.page) || 1;

  let searchProduct: ResponseProducts | undefined;

  try {
    searchProduct = await getProductSearch({
      query: query,
      brandSlug: marca,
      subcategorySlug: subcategoria,
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
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Encabezado responsivo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          bgcolor: "primary.main",
          color: "white",
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" }, fontWeight: 600 }}
        >
          Resultados para: {query}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}>
          {searchProduct.count} productos encontrados
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Productos */}
      <Box>
        <GridProduct products={searchProduct.results} />
      </Box>

      {/* Paginación */}
      <Suspense fallback={<div>Cargando paginación...</div>}>
        <Box sx={{ mt: 4 }}>
          <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            query={query}
            marca={marca}
            subcategoria={subcategoria}
          />
        </Box>
      </Suspense>
    </Container>
  );
}
