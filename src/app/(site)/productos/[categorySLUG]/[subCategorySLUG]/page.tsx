import { Container } from "@mui/material";
import { fetchListProductCategory } from "@/app/utils/categories";
import ProductFilter from "@/app/ui/product-filter";

import dynamic from "next/dynamic";

export const revalidate = 0;

const BrandFilter = dynamic(() => import("../../../../ui/filters/brand-filter"), {
  loading: () => <p>Cargando filtros...</p>, // Opcional: Mostrar un mensaje mientras se carga
  ssr: false, // Esto asegura que el componente solo se cargue en el cliente, no en el servidor
});

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
      <ProductFilter products={products.results} />
    </Container>
  );
}
