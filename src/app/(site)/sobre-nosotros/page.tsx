import { Container, Box, Grid2, Typography } from "@mui/material";
import { Store118Card, Store209Card } from "@/app/components/ui/store-card";

export default async function Page() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom></Typography>
        </Box>
        <Box>
          <Grid2 container spacing={5}>
            <Grid2 size={{ xs: 12, md: 7 }}></Grid2>
            <Grid2 size={{ xs: 12, md: 5 }}>
              <Typography
                variant="h4"
                gutterBottom
                marginY={2}
                sx={{ textAlign: "center" }}
              >
                Nuestras tiendas
              </Typography>
              <Store118Card />
              <Store209Card />
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
}
