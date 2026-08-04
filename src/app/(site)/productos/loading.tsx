import { Box, Container } from "@mui/material";
import {
  ProductListSkeleton,
  FiltersSkeleton,
} from "@/components/ui/skeleton/search-skeletons";

export default function ProductosLoading() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "20%" } }}>
          <FiltersSkeleton />
        </Box>

        <Box sx={{ width: { xs: "100%", md: "80%" } }}>
          <ProductListSkeleton />
        </Box>
      </Box>
    </Container>
  );
}
