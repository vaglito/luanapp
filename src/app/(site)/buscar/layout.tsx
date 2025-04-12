import { Suspense } from "react";
import { Filter } from "@/app/components/product/search/Filter";
import { Box, Container, Typography, Grid2 } from "@mui/material";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xl">
      <Grid2 container spacing={3} sx={{ marginY: 4 }}>
        <Grid2 size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
          <Box
            sx={{
              padding: 2,
              borderRadius: 2,
              backgroundColor: "#e7e7e7",
              minHeight: { xs: "auto", md: "100%" }, // 🔥 adapta altura para pantallas grandes
            }}
          >
            <Suspense
              fallback={
                <Typography variant="h6">Cargando filtros...</Typography>
              }
            >
              <Filter />
            </Suspense>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 9, lg: 9, xl: 9 }}>{children}</Grid2>
      </Grid2>
    </Container>
  );
}
