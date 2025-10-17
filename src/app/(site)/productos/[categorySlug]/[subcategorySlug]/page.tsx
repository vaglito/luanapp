import { Suspense } from "react";
import { Container, Typography, Box } from "@mui/material";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { Filter } from "@/app/components/product/search/Filter";
import { BrandFilter } from "@/app/components/product/search/BrandFilter";
import { CategoryFilterSkeleton } from "@/app/components/ui/skeleton/categoryfilter-skeleton";
import { GridProduct } from "@/app/components/product/grid-product";
import { getProductList } from "@/app/lib/api/products";
import { fetchBrandCategoriesSubCategories } from "@/app/lib/api/brands";
import { startCase } from "lodash";

export const revalidate = 0;

export const generateMetadata = ({
  params,
}: {
  params: { categorySlug: string; subcategorySlug: string };
}) => {
  return {
    title: `${startCase(params.categorySlug)} - ${startCase(
      params.subcategorySlug
    )} | Corporacion Luana`,
    description: `Explora nuestra colección de ${startCase(
      params.categorySlug
    )}. Encuentra las mejores marcas, precios y estilos. ¡Compra online con envío rápido en Perú!`,
    keywords: [
      "comprar rapido",
      "envio rapido",
      "tienda virtual",
      "envio a todo el peru",
    ],
  };
};

interface ListProductSubCategoryPageProps {
  params: {
    categorySlug: string;
    subcategorySlug: string;
    page?: string;
  };
  searchParams: {
    marca: string;
    page?: string;
  };
}

export default async function ListProductSubCategoryPage({
  params,
  searchParams,
}: ListProductSubCategoryPageProps) {
  let page = Number(searchParams?.page) || 1;

  const brands = Array.isArray(searchParams?.marca)
    ? searchParams.marca
    : searchParams?.marca
    ? [searchParams.marca]
    : [];

  const { categorySlug, subcategorySlug } = params;
  const products = await getProductList({
    categorySlug: categorySlug,
    subcategorySlug: subcategorySlug,
    brandSlug: brands,
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
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          color: "#545454",
          p: 2,
          mb: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" }, fontWeight: 600 }}
        >
          Ver {startCase(params.subcategorySlug)}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
        >
          {products.count} productos encontrados
        </Typography>
      </Box>
      {/* products */}
      <Box
        sx={{
          display: "flex",
          marginY: 4,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          gap: { xs: 1, sm: 1, md: 2, lg: 4, xl: 4 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "20%", lg: "20%", xl: "20%" },
            backgroundColor: "#fff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
          }}
        >
          <Suspense fallback={<CategoryFilterSkeleton />}>
            <Filter
              query={subcategorySlug}
              filters={[
                {
                  title: "Marcas",
                  fetchData: fetchBrandCategoriesSubCategories,
                  Component: BrandFilter,
                },
              ]}
            />
          </Suspense>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "80%", lg: "80%", xl: "80%" },
          }}
        >
          <GridProduct products={products.results} />
          <Suspense fallback={<div>Cargando paginación...</div>}>
            <Box sx={{ mt: 4 }}>
              <PaginationButtons totalPages={totalPages} currentPage={page} marca={brands}/>
            </Box>
          </Suspense>
        </Box>
      </Box>
    </Container>
  );
}
