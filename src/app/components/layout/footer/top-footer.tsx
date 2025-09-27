import { FcShipped, FcShop, FcLock, FcAssistant } from "react-icons/fc";

// Imports MUI Components
import { Box, Typography, Grid2, Container } from "@mui/material";

export function TopFooter() {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "#f0f0f0" }}
      className="drop-shadow-lg"
    >
      <Container maxWidth="xl">
        <Box sx={{ paddingY: 3 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            Ten la mejor experiencia
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Queremos que tengas el mejor de la experiencias.
          </Typography>
        </Box>
        <Box sx={{ paddingY: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <FcShipped className="text-6xl" />
                </Box>
                <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                  Delivery
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <FcLock className="text-6xl" />
                </Box>
                <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                  Compra facil y seguro
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <FcShop className="text-6xl" />
                </Box>
                <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                  Retiro gratis en tienda
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <FcAssistant className="text-6xl" />
                </Box>
                <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                  Contactanos
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
}
