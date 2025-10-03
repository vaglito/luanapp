import { Container, Box, Typography, Grid2 } from "@mui/material";
import { getListBrands } from "@/app/utils/brands";
import { GridBrand } from "@/app/components/brand/grid-brand";

export const metadata = {
  title: "Marcas | Corporacion Luana",
  description: "Listado de marcas",
};

export default async function BrandPage() {
  const brands = await getListBrands();

  return (
    <Container maxWidth="xl">
      <Box>
        <Box marginY={4}>
          <GridBrand brands={brands} />
        </Box>
      </Box>
    </Container>
  );
}
