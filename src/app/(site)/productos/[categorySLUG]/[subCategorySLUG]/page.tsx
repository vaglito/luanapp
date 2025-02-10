import { Container, Typography, Box, Button } from "@mui/material";
import { fetchListProductCategory } from "@/app/utils/categories";
import { ProductChart } from "@/app/ui/product-chart";

export const revalidate = 0;

interface ListProductSubCategoryPageProps {
  params: {
    categorySLUG: string;
    subCategorySLUG: string;
    page?: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function ListProductSubCategoryPage({
  params,
  searchParams,
}: ListProductSubCategoryPageProps) {
  let currentPage = Number(searchParams?.page) || 1;

  const { categorySLUG, subCategorySLUG } = params;
  const products = await fetchListProductCategory(
    categorySLUG,
    subCategorySLUG,
    currentPage
  );

  if (!products) {
    return (
      <Container maxWidth="xl">
        <div>
          <p>Error al obtener los productos. Por favor, intenta nuevamente.</p>
        </div>
      </Container>
    );
  }

  const totalPages = Math.ceil(products.count / 20);

  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginY: 4,
          padding: "20px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          bgcolor: "#ffffff",
        }}
      >
        <Typography>Estas en la pagina {currentPage}</Typography>
        <Typography>{categorySLUG} / {subCategorySLUG}</Typography>
        <Typography>Productos encontrados {products.count}</Typography>
      </Box>
      {products && products.results.length > 0 ? (
        <>
          <ProductChart products={products.results} />

          <Box display="flex" justifyContent="center" mt={3}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant="outlined"
                color={currentPage === index + 1 ? "primary" : "secondary"}
                href={`?page=${index + 1}`}
                sx={{ mx: 0.5 }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </>
      ) : (
        <Typography> No se encontraron ningun productos</Typography>
      )}
    </Container>
  );
}
