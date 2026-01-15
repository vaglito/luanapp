// app/search/loading.tsx
import { Box, Container, Skeleton, Grid2 } from "@mui/material";

export default function LoadingSearch() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Header Skeleton */}
      <Skeleton
        variant="rectangular"
        height={80}
        sx={{ borderRadius: "12px", mb: 3 }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Sidebar Skeleton */}
        <Box sx={{ width: { xs: "100%", md: "20%" } }}>
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{ borderRadius: "12px" }}
          />
        </Box>

        {/* Grid Skeleton */}
        <Box sx={{ width: { xs: "100%", md: "80%" } }}>
          <Grid2 container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid2 size={{ xs: 12, sm: 12, lg: 4 }} key={i}>
                <Skeleton
                  variant="rectangular"
                  height={300}
                  sx={{ borderRadius: "12px" }}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
}
