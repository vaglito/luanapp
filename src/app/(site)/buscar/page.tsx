import { Suspense } from "react";
import { Container, Box, Typography, Button, Grid2 } from "@mui/material";
import { fetchProductSearch } from "@/app/utils/products";
import { ProductChart } from "@/app/ui/product-chart";
import ErrorIcon from "@mui/icons-material/Error";
import Link from "next/link";
import { Filters } from "@/app/ui/filters/filters";
import { SearchProduct } from "@/app/ui/product/search-product/search-products";

export const generateMetadata = ({
  searchParams,
}: {
  searchParams: { q?: string };
}) => {
  const query = searchParams.q || "";

  return {
    title: query
      ? `Buscando ${query} | Corporación Luana`
      : "Búsqueda | Corporación Luana",
    description: query
      ? `Estás buscando ${query} en Corporación Luana. Encuentra los mejores productos disponibles.`
      : "Realiza una búsqueda en Corporación Luana para encontrar productos.",
  };
};

export const revalidate = 0;

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    marca?: string;
    subcategoria?: string;
  };
}) {
  const query = searchParams?.query || "";
  // Solo mantener marca y subcategoria si la búsqueda es la misma
  const keepFilters = searchParams?.query && query === searchParams.query;
  const marca = keepFilters ? searchParams?.marca || "" : "";
  const subcategoria = keepFilters ? searchParams?.subcategoria || "" : "";

  let currentPage = Number(searchParams?.page) || 1;

  // Manejo de errores en la API
  let searchProduct;
  try {
    searchProduct = await fetchProductSearch(
      query,
      marca,
      subcategoria,
      currentPage
    );
  } catch (error) {
    return (
      <Container maxWidth="xl">
        <Box className="h-screen" sx={{ marginY: 4 }}>
          <Box
            sx={{
              marginY: 4,
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {query
                ? `Resultados para: ${query}`
                : "Introduce un término de búsqueda"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <ErrorIcon color="error" />
            <Typography variant="h3" color="error">
              ¡Lo sentimos!
            </Typography>
          </Box>
          <Typography variant="h5">No se encontró ningún producto.</Typography>
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
          marginY: 4,
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {query
            ? `Resultados para: ${query}`
            : "Introduce un término de búsqueda"}
        </Typography>
        <Typography>Productos encontrados: {searchProduct?.count}</Typography>
      </Box>

      <Box sx={{ marginY: 4 }}>
      <Suspense fallback={<Typography variant="h5">Cargando...</Typography>}>
        {searchProduct && searchProduct.results.length > 0 ? (
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
              <Filters product={searchProduct.results} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 9, lg: 9, xl: 9 }}>
              <SearchProduct searchProduct={searchProduct} />
            </Grid2>
          </Grid2>
        ) : (
          <Typography variant="body1">
            {query
              ? "No se encontraron productos para tu búsqueda."
              : "Introduce un término para buscar productos."}
          </Typography>
        )}
      </Suspense>
    </Box>
      {/* Paginación con URLSearchParams */}
      <Box display="flex" justifyContent="center" mt={3}>
        {Array.from({ length: totalPages }, (_, index) => {
          const params = new URLSearchParams();
          if (query) params.set("query", query);
          if (marca) params.set("marca", marca);
          if (subcategoria) params.set("subcategoria", subcategoria);
          params.set("page", (index + 1).toString());

          return (
            <Button
              key={index + 1}
              variant="outlined"
              color={currentPage === index + 1 ? "primary" : "secondary"}
              component={Link}
              href={`/buscar?${params.toString()}`}
              sx={{ mx: 0.5 }}
            >
              {index + 1}
            </Button>
          );
        })}
      </Box>
    </Container>
  );
}
