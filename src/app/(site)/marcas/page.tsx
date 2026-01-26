import { Suspense } from "react";
import { Container, Box } from "@mui/material";
import { BrandResults } from "@/components/brand/brand-results";
import { BrandListSkeleton } from "@/components/ui/skeleton/search-skeletons";

export const metadata = {
  title: "Marcas | Corporacion Luana",
  description: "Listado de marcas",
};

export default function BrandPage() {
  return (
    <Container maxWidth="xl">
      <Box>
        <Box marginY={4}>
          <Suspense fallback={<BrandListSkeleton />}>
            <BrandResults />
          </Suspense>
        </Box>
      </Box>
    </Container>
  );
}


