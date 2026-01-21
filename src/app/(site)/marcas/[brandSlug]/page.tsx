import { Suspense } from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { startCase } from "lodash";
import { BrandProductList } from "@/app/components/brand/brand-product-list";
import { BrandFilterList } from "@/app/components/brand/brand-filter-list";
import {
  ProductListSkeleton,
  FiltersSkeleton,
} from "@/app/components/ui/skeleton/search-skeletons";

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
    subcategoria?: string | string[];
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
  const page = Number(resolvedSearchParams.page) || 1;
  const subcategoria = resolvedSearchParams.subcategoria;
  const brandName = startCase(brandSlug);

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
          background: "linear-gradient(to right, #ffffff 50%, #fdf4ff 100%)",
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "#A3147F", fontWeight: 700, letterSpacing: 1 }}
          >
            Marca Exclusiva
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
            {brandName}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Explora nuestra selección de productos
          </Typography>
        </Box>
      </Paper>

      {/* products */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
        }}
      >
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
            <BrandFilterList brandSlug={brandSlug} />
          </Suspense>
        </Box>
        <Suspense fallback={<ProductListSkeleton />}>
          <BrandProductList
            brandSlug={brandSlug}
            subcategoria={subcategoria}
            page={page}
          />
        </Suspense>
      </Box>
    </Container>
  );
}

