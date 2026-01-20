import { Box, Container, Typography } from "@mui/material";
import { fetchComputerSerieList } from "@/app/services/computer";
import { ComputerSerieContainer } from "@/app/components/computer/computer-serie-container";
import { fetchExchangeRate } from "@/app/services/exchangeRate";

interface ComputerPageProps {
  params: Promise<{
    computerSLUG: string;
  }>;
}

export default async function ComputerPage({ params }: ComputerPageProps) {
  const { computerSLUG } = await params;
  const computerSerie = await fetchComputerSerieList(computerSLUG);
  const exchange = await fetchExchangeRate();

  const titleSlug = computerSLUG.replace(/-/g, " ").toUpperCase();

  if (!computerSerie || computerSerie.count == 0) {
    return (
      <Container maxWidth="xl" sx={{ mt: 8, minHeight: "40vh" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" color="#545454">
            No hay información para mostrar en esta categoría.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ my: 6 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#545454",
            textTransform: "uppercase",
            mb: 1,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          COMPUTADORAS {titleSlug}
        </Typography>
        <Box
          sx={{
            width: "80px",
            height: "4px",
            bgcolor: "#A3147F", // Brand color
            mx: "auto",
            borderRadius: "2px",
          }}
        />
      </Box>

      {/* Series List */}
      <Box>
        {computerSerie.results.map((serie) => (
          <Box key={serie.id} sx={{ mb: 8 }}>
            <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#A3147F",
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  {serie.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#6b7280",
                    mt: 0.5,
                    fontSize: "1.1rem",
                  }}
                >
                  {serie.description}
                </Typography>
              </Box>
            </Box>

            <Box>
              <ComputerSerieContainer
                serie={serie.id}
                exchange={exchange.exchange}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
