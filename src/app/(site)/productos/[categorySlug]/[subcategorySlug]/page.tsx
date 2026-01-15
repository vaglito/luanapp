import { Suspense } from "react";
import { startCase } from "lodash";
import { Container, Typography, Box } from "@mui/material";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { Filter } from "@/app/components/product/search/Filter";
import { BrandFilter } from "@/app/components/product/search/BrandFilter";
import { CategoryFilterSkeleton } from "@/app/components/ui/skeleton/categoryfilter-skeleton";
import { GridProduct } from "@/app/components/product/grid-product";
import { fetchProductList } from "@/app/services/products";
import { fetchBrandsCategories } from "@/app/services/brands";
import { fetchExchangeRate } from "@/app/services/exchangeRate";

export const revalidate = 0;

// En Next 15, generateMetadata también recibe promesas
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}) => {
  const { categorySlug, subcategorySlug } = await params;
  
  return {
    title: `${startCase(categorySlug)} - ${startCase(subcategorySlug)} | Corporacion Luana`,
    description: `Explora nuestra colección de ${startCase(categorySlug)}. Encuentra las mejores marcas y precios.`,
    keywords: ["comprar rapido", "envio rapido", "tienda virtual", "peru"],
  };
};

interface ListProductSubCategoryPageProps {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
  searchParams: Promise<{
    marca?: string | string[];
    page?: string;
  }>;
}

export default async function ListProductSubCategoryPage(props: ListProductSubCategoryPageProps) {
  // 1. Await de params y searchParams (Obligatorio en Next 15)
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { categorySlug, subcategorySlug } = params;
  
  // 2. Ejecución paralela de datos independientes (Optimización)
  const [exchange, productsData] = await Promise.all([
    fetchExchangeRate(),
    fetchProductList({
      category: categorySlug,
      subcategory: subcategorySlug,
      brand: Array.isArray(searchParams.marca) 
        ? searchParams.marca 
        : searchParams.marca ? [searchParams.marca] : [],
      page: Number(searchParams.page) || 1,
    })
  ]);

  if (!productsData) {
    return (
      <Container maxWidth="xl"><p>Error al obtener productos.</p></Container>
    );
  }

  let currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(productsData.count / 20);
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  return (
    <Container maxWidth="xl">
      <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2, p: 2, mb: 3, borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Ver {startCase(subcategorySlug)}
        </Typography>
        <Typography variant="body1">
          {productsData.count} productos encontrados
        </Typography>
      </Box>

      <Box sx={{ display: "flex", my: 4, flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Sidebar de Filtros */}
        <Box sx={{ width: { xs: "100%", md: "250px" }, bgcolor: "#fff", p: 2, borderRadius: "12px", boxShadow: 1 }}>
          <Suspense fallback={<CategoryFilterSkeleton />}>
            <Filter
              query={subcategorySlug}
              filters={[
                {
                  title: "Marcas",
                  fetchData: fetchBrandsCategories,
                  Component: BrandFilter,
                },
              ]}
            />
          </Suspense>
        </Box>

        {/* Listado de Productos */}
        <Box sx={{ flexGrow: 1 }}>
          <GridProduct
            products={productsData.results}
            exchange={exchange.exchange}
          />
          
          <Box sx={{ mt: 4 }}>
            <PaginationButtons
              totalPages={totalPages}
              currentPage={currentPage}
              marca={Array.isArray(searchParams.marca) ? searchParams.marca : searchParams.marca ? [searchParams.marca] : []}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}