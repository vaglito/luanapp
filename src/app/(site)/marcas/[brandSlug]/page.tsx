import { Suspense } from "react";
import { Container, Box, Typography, Paper, Button } from "@mui/material";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { fetchProductList } from "@/app/services/products";
import { GridProduct } from "@/app/components/product/grid-product";
import { Filter } from "@/app/components/product/search/Filter";
import { CategoryFilter } from "@/app/components/product/search/CategoryFilter";
import { CategoryFilterSkeleton } from "@/app/components/ui/skeleton/categoryfilter-skeleton";
import { fetchCategoriesBrands } from "@/app/services/categories";
import { fetchExchangeRate } from "@/app/services/exchangeRate";
import { startCase } from "lodash";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Link from "next/link";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) => {
  const { brandSlug } = await params;
  const brandName = startCase(brandSlug);
  return {
    title: `Productos ${brandName} | Corporación Luana`,
    description: `Productos de la marca ${brandName} en Corporación Luana.`,
  };
};

interface BrandDetailProps {
  params: Promise<{
    brandSlug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    subcategoria?: string;
  }>;
}

export const revalidate = 0;

export default async function BrandDetail({
  params,
  searchParams,
}: BrandDetailProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { brandSlug } = resolvedParams;
  const exchange = await fetchExchangeRate();

  let page = Number(resolvedSearchParams.page) || 1;
  const marca = [brandSlug];

  const rawSub = resolvedSearchParams.subcategoria;
  const subcategoria = Array.isArray(rawSub) ? rawSub : rawSub ? [rawSub] : [];

  const products = await fetchProductList({
    brand: marca,
    subcategory: subcategoria,
    page,
  });

  const brandName = startCase(brandSlug);

  // Handle No Results or Empty Data
  if (!products || products.results.length === 0) {
    if (!products || products.count === 0) {
      return (
        <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
          <Paper elevation={0} sx={{ p: 6, textAlign: "center", borderRadius: 4, bgcolor: "#fff", border: "1px dashed #e5e7eb" }}>
            <SearchOffIcon sx={{ fontSize: 80, color: "#d1d5db", mb: 2 }} />
            <Typography variant="h4" color="#545454" fontWeight={700} gutterBottom>
              No hay productos disponibles de {brandName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
              Actualmente no tenemos stock disponible para esta marca.
              Por favor revisa otras opciones en nuestro catálogo.
            </Typography>
            <Link href="/marcas" passHref style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large" sx={{ bgcolor: "#A3147F", borderRadius: 50, px: 4, "&:hover": { bgcolor: "#800e63" } }}>
                Volver a las marcas
              </Button>
            </Link>
          </Paper>
        </Container>
      )
    }
  }

  const totalPages = Math.ceil(products.count / 20);
  if (page > totalPages && totalPages > 0) page = totalPages;

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
          background: "linear-gradient(to right, #ffffff 50%, #fdf4ff 100%)"
        }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: "#A3147F", fontWeight: 700, letterSpacing: 1 }}>
            Marca Exclusiva
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#333", fontSize: { xs: "1.75rem", md: "2.5rem" }, lineHeight: 1.2 }}>
            {brandName}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Explora {products.count} productos disponibles
          </Typography>
        </Box>
      </Paper>

      {/* products */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 4 }}>
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
              query={brandSlug}
              filters={[
                {
                  title: "Categorias",
                  fetchData: fetchCategoriesBrands,
                  Component: CategoryFilter,
                },
              ]}
            />
          </Suspense>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <GridProduct
            products={products.results}
            exchange={exchange.exchange}
          />
          <Suspense fallback={<div>Cargando paginación...</div>}>
            <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
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
