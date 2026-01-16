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

  if (!computerSerie || computerSerie.count == 0) {
    return (
      <Container maxWidth="xl">
        <Box>
          <Typography>No hay informacion para mostrar.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {computerSerie.results.map((serie) => (
        <Box key={serie.id}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: 35,
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              {serie.title}
            </Typography>
            <Typography>{serie.description}</Typography>
          </Box>
          <Box>
            <ComputerSerieContainer
              serie={serie.id}
              exchange={exchange.exchange}
            />
          </Box>
        </Box>
      ))}
    </Container>
  );
}
