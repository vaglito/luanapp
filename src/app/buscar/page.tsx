import { Suspense } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { fetchProductSearch } from "../utils/products";
import { ProductChart } from "../ui/product-chart";
import { SliderProductResult } from "../ui/product/slider-product";
import ErrorIcon from "@mui/icons-material/Error";

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

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // Use a try-catch block to handle API errors
  let searchProduct;
  try {
    searchProduct = await fetchProductSearch(query, currentPage);
  } catch (error) {
    // Ensure `error` is an object and use a default message if `message` is unavailable
    return (
      <Container maxWidth="xl" className="">
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" gutterBottom>
                {query
                  ? `Resultados para: ${query}`
                  : "Introduce un término de búsqueda"}
              </Typography>
              <Typography>
                productos encontrados: {searchProduct?.count}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <ErrorIcon color="error" />
            <Typography variant="h3" color="error">
              ¡Lo sentimos!
            </Typography>
          </Box>
          <Typography variant="h5">No se encontró ningun producto.</Typography>
        </Box>
      </Container>
    );
  }

  // Calculate total pages based on the results count
  const totalPages = Math.ceil(searchProduct.count / 20);

  return (
    <Container maxWidth="xl">
      <Box sx={{ marginY: 4 }}>
        <Box
          sx={{
            marginY: 4,
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom>
              {query
                ? `Resultados para: ${query}`
                : "Introduce un término de búsqueda"}
            </Typography>
            <Typography>
              productos encontrados: {searchProduct?.count}
            </Typography>
          </Box>
        </Box>

        <Suspense fallback={<Typography variant="h5">Cargando...</Typography>}>
          <Box>
            {searchProduct && searchProduct.results.length > 0 ? (
              <>
                <ProductChart products={searchProduct.results} />

                <Box display="flex" justifyContent="center" mt={3}>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                      key={index + 1}
                      variant="outlined"
                      color={
                        currentPage === index + 1 ? "primary" : "secondary"
                      }
                      href={`?query=${query}&page=${index + 1}`}
                      sx={{ mx: 0.5 }}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </Box>
              </>
            ) : (
              <Typography variant="body1">
                {query
                  ? "No se encontraron productos para tu búsqueda."
                  : "Introduce un término para buscar productos."}
              </Typography>
            )}
          </Box>
        </Suspense>
      </Box>
    </Container>
  );
}
