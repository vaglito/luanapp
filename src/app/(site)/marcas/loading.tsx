import { Box, Container, Typography, Skeleton } from "@mui/material";
import { BrandListSkeleton } from "@/components/ui/skeleton/search-skeletons";

export default function MarcasLoading() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        <Skeleton width={200} />
      </Typography>

      <BrandListSkeleton />
    </Container>
  );
}
