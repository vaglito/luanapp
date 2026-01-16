import { Box, Typography } from "@mui/material";
import { fetchComputer } from "@/app/services/computer";
import { ComputerContainer } from "./computer-container";

export async function ComputerSerieContainer({
  serie,
  exchange,
}: {
  serie: number;
  exchange: number;
}) {
  const computers = await fetchComputer(serie);

  if (!computers || computers.count == 0) {
    return (
      <Box>
        <Typography>No hay computadoras</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <ComputerContainer computers={computers} exchange={exchange}/>
    </Box>
  );
}
