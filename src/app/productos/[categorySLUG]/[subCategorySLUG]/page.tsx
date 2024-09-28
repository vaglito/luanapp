import { Container } from "@mui/material";
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
      <div>
        {products.results.length > 0 ? (
          <ul>
            <ProductChart products={products.results}/>
          </ul>
        ) : (
          <p>No se encontraron productos para esta subcategoría.</p>
        )}
      </div>
    </Container>
  );
}
