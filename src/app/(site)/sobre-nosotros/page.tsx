import { Container, Box, Grid2, Typography } from "@mui/material";
import { Store118Card, Store209Card } from "@/app/components/ui/store-card";
import Content from "./content.mdx";

export const metadata = {
  title: "Quiénes somos",
  description:
    "Empresa peruana especializada en equipos de cómputo y tecnología.",
};

export default async function Page() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom></Typography>
        </Box>
        <Box>
          <Grid2 container spacing={5}>
            <Grid2 size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  color: "rgb(84, 84, 84)",
                  "& h1": {
                    fontSize: "2.2rem",
                    fontWeight: 600,
                    marginBottom: "1rem",
                  },
                  "& h2": {
                    fontSize: "1.7rem",
                    fontWeight: 600,
                    marginTop: "2rem",
                    marginBottom: "1rem",
                  },
                  "& h3": {
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    marginTop: "1.5rem",
                  },
                  "& p": {
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  },
                  "& li": {
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                  },
                }}
              >
                <Content />
              </Box>
            </Grid2>
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
