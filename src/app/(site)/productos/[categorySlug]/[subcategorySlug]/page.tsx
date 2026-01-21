import { Suspense } from "react";
import { startCase } from "lodash";
import { Container, Typography, Box, Paper } from "@mui/material";
import {
  ProductListSkeleton,
  FiltersSkeleton,
} from "@/app/components/ui/skeleton/search-skeletons";
import { SubCategoryProductList } from "@/app/components/product/subcategory/subcategory-product-list";
import { SubCategoryFilterList } from "@/app/components/product/subcategory/subcategory-filter-list";

export const revalidate = 0;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}) => {
  const { categorySlug, subcategorySlug } = await params;

  return {
    title: `${startCase(categorySlug)} - ${startCase(
      subcategorySlug
    )} | Corporacion Luana`,
    description: `Explora nuestra colección de ${startCase(
      categorySlug
    )}. Encuentra las mejores marcas y precios.`,
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

export default async function ListProductSubCategoryPage(
  props: ListProductSubCategoryPageProps
) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { categorySlug, subcategorySlug } = params;
  const currentPage = Number(searchParams.page) || 1;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Results Info */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 3,
          bgcolor: "white",
          border: "1px solid #e5e7eb",
          boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.05)",
          background: "linear-gradient(to right, #ffffff 50%, #fdf4ff 100%)", // Subtle brand gradient
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "#A3147F", fontWeight: 700, letterSpacing: 1 }}
          >
            {startCase(categorySlug)}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#333",
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              lineHeight: 1.2,
            }}
          >
            {startCase(subcategorySlug)}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Explora nuestra selección de productos
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
        }}
      >
        {/* Sidebar de Filtros */}
        <Box
          sx={{
            width: { xs: "100%", lg: "280px" },
            flexShrink: 0,
            bgcolor: "#fff",
            p: 3,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            height: "fit-content",
            position: { lg: "sticky" },
            top: { lg: 100 },
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: "#545454" }}
          >
            Filtros
          </Typography>
          <Suspense fallback={<FiltersSkeleton />}>
            <SubCategoryFilterList subcategorySlug={subcategorySlug} />
          </Suspense>
        </Box>

        {/* Listado de Productos */}
        <Suspense fallback={<ProductListSkeleton />}>
          <SubCategoryProductList
            categorySlug={categorySlug}
            subcategorySlug={subcategorySlug}
            marca={searchParams.marca}
            page={currentPage}
          />
        </Suspense>
      </Box>
    </Container>
  );
}
