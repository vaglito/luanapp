import { Container, Box } from "@mui/material";
import { Computer } from "./computer";
import { fetchComputerType } from "@/services/catalog/computer";
import { TypographyWrapper } from "@/components/ui/Typography/Typography";

export async function ComputerHome() {
  const data = await fetchComputerType();

  return (
    <Box sx={{ marginY: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
              textAlign: "center",
            }}
          >
            <TypographyWrapper
              customVariant="hero"
              component="h2"
              gradient="brand"
            >
              Computadoras Ensambladas
            </TypographyWrapper>
            <Box>
              <TypographyWrapper customVariant="body" color="text.secondary">
                Encuentra configuraciones optimizadas para tu trabajo, estudio o
                gaming.
              </TypographyWrapper>
            </Box>
          </Box>
        </Box>
        {/* Body */}
        <Box sx={{ marginY: 4 }}>
          <Computer data={data.results} />
        </Box>
      </Container>
    </Box>
  );
}
