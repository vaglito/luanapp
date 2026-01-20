import { Suspense } from "react";
import { startCase } from "lodash";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { Filter } from "@/app/components/product/search/Filter";
import { BrandFilter } from "@/app/components/product/search/BrandFilter";
import { CategoryFilterSkeleton } from "@/app/components/ui/skeleton/categoryfilter-skeleton";
import { GridProduct } from "@/app/components/product/grid-product";
import { fetchProductList } from "@/app/services/products";
import { fetchBrandsCategories } from "@/app/services/brands";
import { fetchExchangeRate } from "@/app/services/exchangeRate";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Link from "next/link";
import LinkIcon from '@mui/icons-material/Link'; // For breadcrumb-like aesthetic if needed

export const revalidate = 0;

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
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { categorySlug, subcategorySlug } = params;

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

  if (!productsData || productsData.results.length === 0) {
    const isEmpty = !productsData || productsData.count === 0;
    if (isEmpty) {
      return (
        <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
          <Paper elevation={0} sx={{ p: 6, textAlign: "center", borderRadius: 4, bgcolor: "#fff", border: "1px dashed #e5e7eb" }}>
            <SearchOffIcon sx={{ fontSize: 80, color: "#d1d5db", mb: 2 }} />
            <Typography variant="h4" color="#545454" fontWeight={700} gutterBottom>
              No hay productos en esta categoría
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
              Actualmente no tenemos stock disponible para {startCase(subcategorySlug)}.
              Por favor revisa otras categorías.
            </Typography>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large" sx={{ bgcolor: "#A3147F", borderRadius: 50, px: 4, "&:hover": { bgcolor: "#800e63" } }}>
                Volver al Inicio
              </Button>
            </Link>
          </Paper>
        </Container>
      )
    }
  }

  let currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(productsData.count / 20);
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

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
          background: "linear-gradient(to right, #ffffff 50%, #fdf4ff 100%)" // Subtle brand gradient
        }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: "#A3147F", fontWeight: 700, letterSpacing: 1 }}>
            {startCase(categorySlug)}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#333", fontSize: { xs: "1.75rem", md: "2.5rem" }, lineHeight: 1.2 }}>
            {startCase(subcategorySlug)}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Explora {productsData.count} opciones disponibles
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 4 }}>
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
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#545454" }}>Filtros</Typography>
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

          <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
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