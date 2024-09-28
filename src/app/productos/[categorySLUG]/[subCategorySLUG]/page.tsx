import { Container, Grid2, Typography } from "@mui/material";
import { fetchListProductCategory } from "@/app/utils/categories";
import { ProductChart } from "@/app/ui/product-chart";

interface ListProductSubCategoryPageProps {
  params: {
    categorySLUG: string;
    subCategorySLUG: string;
  };
}

export default async function ListProductSubCategoryPage({
  params,
}: ListProductSubCategoryPageProps) {
  const { categorySLUG, subCategorySLUG } = params;
  const products = await fetchListProductCategory(
    categorySLUG,
    subCategorySLUG
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

  return (
    <Container maxWidth="xl">
      <div>
        <p>Category: {categorySLUG}</p>
        <p>Subcategory: {subCategorySLUG}</p>
      </div>
      <Grid2 container spacing={4}>
        <Grid2 size={{ md: 2 }} sx={{ display: { xs: "none", md: "block" } }}>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
            ut mollitia sequi, asperiores nam nesciunt molestias nostrum iste
            ipsum maiores suscipit? Voluptas necessitatibus laboriosam vero
            ratione sequi doloremque, ipsam debitis.
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 10, lg: 10, xl: 10 }}>
          {products.results.length > 0 ? (
            <ul>
              <ProductChart products={products.results} />
            </ul>
          ) : (
            <p>No se encontraron productos para esta subcategoría.</p>
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
}
