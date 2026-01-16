import { Container, Box, Typography } from "@mui/material";
import { Computer } from "./computer";
import { fetchComputerType } from "@/app/services/computer";

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
            }}
          >
            <Typography
              variant="h3"
              color="#545454"
              sx={{ fontWeight: "bold" }}
            >
              Computadoras
            </Typography>
            <Box>
              <Typography
                color="#545454"
                sx={{
                  fontSize: 18,
                }}
              >
                Encuentra configuraciones acorde a tu preferencia y trabajo.
              </Typography>
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
