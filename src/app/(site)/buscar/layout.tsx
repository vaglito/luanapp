import React, { Suspense } from "react";
import { Filter } from "@/app/components/product/search/Filter";
import { Box, Container, Typography, Grid2 } from "@mui/material";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          marginY: 4,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          gap: { xs: 1, sm: 1, md: 2, lg: 4, xl: 4 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "20%", lg: "20%", xl: "20%" },
            backgroundColor: "#fff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
          }}
        >
          <Suspense
            fallback={<Typography variant="h6">Cargando filtros...</Typography>}
          >
            <Filter />
          </Suspense>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "80%", lg: "80%", xl: "80%" },
            backgroundColor: "#fff",
            borderRadius: "12px",
          }}
        >
          {children}
        </Box>
      </Box>
    </Container>
  );
}
