import { Suspense } from "react";
import { Container, Box, Typography } from "@mui/material";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { getProductSearch } from "@/app/lib/api/products";
import { GridProduct } from "@/app/components/product/grid-product";
import { Filter } from "@/app/components/product/search/Filter";
import { CategoryFilter } from "@/app/components/product/search/CategoryFilter";
import { CategoryFilterSkeleton } from "@/app/components/ui/skeleton/categoryfilter-skeleton";
import { startCase } from "lodash";
import { fetchCategoriesSubCategoriesBrand } from "@/app/lib/api/categorys";

export const generateMetadata = ({
  params,
}: {
  params: { brandSlug: string };
}) => {
  return {
    title: `Productos ${params.brandSlug} | Corporación Luana`,
    description: `Productos de la marca ${params.brandSlug} en Corporación Luana.`,
  };
};

interface BrandDetailProps {
  params: {
    brandSlug: string;
  };
  searchParams: {
    page?: string;
    subcategoria?: string;
  };
}

export const revalidate = 0;

export default async function BrandDetail({
  params,
  searchParams,
}: BrandDetailProps) {
  let page = Number(searchParams?.page) || 1;
  const marca = Array.isArray(params?.brandSlug)
    ? params.brandSlug
    : params?.brandSlug
    ? [params.brandSlug]
    : [];
  const subcategoria = Array.isArray(searchParams?.subcategoria)
    ? searchParams.subcategoria
    : searchParams?.subcategoria
    ? [searchParams.subcategoria]
    : [];

  const { brandSlug } = params;
  const brandName = startCase(brandSlug);

  const products = await getProductSearch({
    query: brandName,
    brandSlugs: marca,
    subcategorySlugs: subcategoria,
    page,
  });

  const totalPages = Math.ceil(products.count / 20);

  return (
    <Container maxWidth="xl" sx={{ marginY: 4 }}>
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
          Productos {brandName}
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
              query={brandSlug}
              filters={[
                {
                  title: "Categorias",
                  fetchData: fetchCategoriesSubCategoriesBrand,
                  Component: CategoryFilter
                }
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
              <PaginationButtons
                totalPages={totalPages}
                currentPage={page}
                subcategoria={subcategoria}
              />
            </Box>
          </Suspense>
        </Box>
      </Box>
    </Container>
  );
}
