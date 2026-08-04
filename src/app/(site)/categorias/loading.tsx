import { Container, Skeleton, Grid2 } from "@mui/material";

export default function CategoriasLoading() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Skeleton
        variant="rectangular"
        height={80}
        sx={{ borderRadius: "12px", mb: 3 }}
      />

      <Grid2 container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid2 key={i} size={{ xs: 12, md: 4 }}>
            <Skeleton height={120} variant="rounded" />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
