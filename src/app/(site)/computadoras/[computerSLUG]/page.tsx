import { Box, Container, Typography } from "@mui/material";
import { fetchComputerSerieList } from "@/app/lib/api/computer";
import { ComputerSerieContainer } from "@/app/components/computer/computer-serie-container";

interface ComputerPageProps {
  params: {
    computerSLUG: string;
  };
}
export default async function ComputerPage({ params }: ComputerPageProps) {
  const { computerSLUG } = params;
  const computerSerie = await fetchComputerSerieList(computerSLUG);

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
            <ComputerSerieContainer serie={serie.id} />
          </Box>
        </Box>
      ))}
    </Container>
  );
}
