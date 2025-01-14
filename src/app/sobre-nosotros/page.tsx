import { Container, Box, Grid2, Typography } from "@mui/material";
import { Store118Card, Store209Card } from "../ui/extras/store-card";
import { getAbout } from "../utils/extras";

export default async function Page() {
  const about = await getAbout();

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {about.title}
          </Typography>
        </Box>
        <Box>
          <Grid2 container spacing={5}>
            <Grid2 size={{ xs: 12, md: 7 }}>
              <Box dangerouslySetInnerHTML={{ __html: about.content }} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5 }}>
              <Typography variant="h4" gutterBottom marginY={2} sx={{ textAlign: "center" }}>
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
