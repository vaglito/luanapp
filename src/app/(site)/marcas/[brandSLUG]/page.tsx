import { Suspense } from "react";
import {
  Container,
  Box,
  Typography,
  Grid2,
  Divider,
} from "@mui/material";
import { PaginationButtons } from "@/app/components/PaginationButtons";
import { getProductList } from "@/app/lib/api/products";
import { GridProduct } from "@/app/components/product/grid-product";

export const generateMetadata = ({
  params,
}: {
  params: { brandSlug: string };
}) => {
  return {
    title: `Marca ${params.brandSlug} | Corporación Luana`,
    description: `Productos de la marca ${params.brandSlug} en Corporación Luana.`,
  };
};

interface BrandDetailProps {
  params: {
    brandSlug: string;
  };
  searchParams: {
    page?: string;
  };
}

export const revalidate = 0;

export default async function BrandDetail({
  params,
  searchParams,
}: BrandDetailProps) {
  let page = Number(searchParams?.page) || 1;

  const { brandSlug } = params;

  const products = await getProductList({
    brandSlug,
    page,
  });

  const totalPages = Math.ceil(products.count / 20);

  return (
    <>
      <Container maxWidth="xl">
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 2 }}>
            <Box marginY={4}>
              <Typography variant="h4">Categorias</Typography>
              <Box></Box>
            </Box>
          </Grid2>
          <Grid2 size={{ md: 10 }}>
            <Box marginY={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4">
                  Productos <span className="uppercase">{brandSlug}</span>
                </Typography>
                <Typography>{products.count} productos encontrados</Typography>
              </Box>
              <Divider sx={{ marginY: 2 }} />
              <Box>
                {products && products.results.length > 0 ? (
                  <>
                    <GridProduct products={products.results} />

                    <Suspense fallback={<div>Cargando paginación...</div>}>
                      <Box sx={{ mt: 4 }}>
                        <PaginationButtons
                          totalPages={totalPages}
                          currentPage={page}
                        />
                      </Box>
                    </Suspense>
                  </>
                ) : (
                  <Typography>No hay productos para mostrar</Typography>
                )}
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
