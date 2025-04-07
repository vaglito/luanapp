import { getProductSearch } from "@/app/services/products";
import { ResponseProducts } from "@/app/types/v2/products-type";
import { Box, Container, Typography, Grid2, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import Link from "next/link";
import { GridProduct } from "@/app/components/product/grid-product";
import { PaginationButtons } from "@/app/components/PaginationButtons";

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
        <Box className="h-screen" sx={{ marginY: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <ErrorIcon color="error" sx={{ fontSize: 50 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Ocurrió un error al buscar productos.
            </Typography>
            <Link href="/">
              <Button variant="contained" color="primary">
                Volver a la página principal
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    );
  }

  if (!searchProduct) {
    return (
      <Container maxWidth="xl">
        <Box className="h-screen" sx={{ marginY: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <ErrorIcon color="error" sx={{ fontSize: 50 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              No se encontraron resultados para "{query}".
            </Typography>
            <Link href="/">
              <Button variant="contained" color="primary">
                Volver a la página principal
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    );
  }

  const totalPages = Math.ceil(searchProduct.count / 20);
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginY: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Resultados para: {query}
        </Typography>
        <Typography>{searchProduct.count} productos encontrados</Typography>
      </Box>
      <Box>
        <GridProduct products={searchProduct.results} />
      </Box>
      {/* Paginación con URLSearchParams */}
      <PaginationButtons
        totalPages={totalPages}
        currentPage={currentPage}
        query={query}
        marca={marca}
        subcategoria={subcategoria}
      />
    </Box>
  );
}
