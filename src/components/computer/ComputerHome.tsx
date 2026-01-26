import { Container, Box, Typography } from "@mui/material";
import { Computer } from "./computer";
import { fetchComputerType } from "@/services/computer";

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
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 1,
                background: "linear-gradient(45deg, #1a237e 30%, #534bae 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Computadoras Ensambladas
            </Typography>
            <Box>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  maxWidth: "600px",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                Encuentra configuraciones optimizadas para tu trabajo, estudio o gaming.
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

