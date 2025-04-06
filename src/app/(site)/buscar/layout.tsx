import { Filter } from "@/app/components/product/search/Filter";
import { Box, Container, Typography, Grid2 } from "@mui/material";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xl">
      <Box sx={{ padding: "2rem 0" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Buscar
        </Typography>
      </Box>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
          <Filter />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 9, lg: 9, xl: 9 }}>{children}</Grid2>
      </Grid2>
    </Container>
  );
}
