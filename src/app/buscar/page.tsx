import { Container, Box, Typography, Button, Grid2 } from "@mui/material";
import { fetchProductSearch } from "../utils/products";
import { ProductChart } from "../ui/product-chart";

export const generateMetadata = ({
  searchParams,
}: {
  searchParams: { q?: string };
}) => {
  const query = searchParams.q || ""; // Si no hay query, usar una cadena vacía

  return {
    title: query
      ? `Buscando ${query} | Corporación Luana`
      : "Búsqueda | Corporación Luana", // Título por defecto si no hay búsqueda
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

  // Obtener resultados de productos con paginación
  const searchProduct = await fetchProductSearch(query, currentPage);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(searchProduct.count / 20); // Asumiendo que hay 10 resultados por página

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        {query
          ? `Resultados para: ${query}`
          : "Introduce un término de búsqueda"}
      </Typography>

      <Box>
        {searchProduct && searchProduct.results.length > 0 ? (
          <>
            <ProductChart products={searchProduct.results} />
            
            {/* Paginación numérica */}
            <Box display="flex" justifyContent="center" mt={3}>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  variant="outlined"
                  color={currentPage === index + 1 ? "primary" : "secondary"}
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
    </Container>
  );
}
