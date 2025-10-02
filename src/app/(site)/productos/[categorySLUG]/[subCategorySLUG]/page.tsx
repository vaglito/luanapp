import { Container, Typography, Box, Button } from "@mui/material";
import { getProductList } from "@/app/lib/api/products";
import { GridProduct } from "@/app/components/product/grid-product";

export const revalidate = 0;

interface ListProductSubCategoryPageProps {
  params: {
    categorySlug: string;
    subcategorySlug: string;
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
  let page = Number(searchParams?.page) || 1;

  const { categorySlug, subcategorySlug } = params;
  const products = await getProductList({
    categorySlug,
    subcategorySlug,
    page,
  });

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

  if (page > totalPages && totalPages > 0) {
    page = totalPages;
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
        <Typography>Estas en la pagina {page}</Typography>
        <Typography>
          {categorySlug} / {subcategorySlug}
        </Typography>
        <Typography>Productos encontrados {products.count}</Typography>
      </Box>
      {products && products.results.length > 0 ? (
        <>
          <GridProduct products={products.results} />

          <Box display="flex" justifyContent="center" mt={3}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant="outlined"
                color={page === index + 1 ? "primary" : "secondary"}
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
