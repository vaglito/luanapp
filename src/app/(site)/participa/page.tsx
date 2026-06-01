// app/participa/page.tsx
import { Container, Paper, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { ParticipaForm } from "@/components/participa/ParticipaForm";
import { PremiosSlider } from "@/components/participa/PremiosSlider";

export default function ParticipaPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Grid2 container spacing={4} alignItems="flex-start">
        
        {/* ==========================================
            COLUMNA IZQUIERDA: SLIDER DE PREMIOS
            ========================================== */}
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Box sx={{ position: { md: "sticky" }, top: { md: 24 } }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              color="primary"
              gutterBottom
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              ¡Participa y Gana!
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, textAlign: { xs: "center", md: "left" } }}
            >
              Registra tus compras mayores a S/ 300 o $ 100 y llévate increíbles premios.
            </Typography>

            {/* Inyectamos el Client Component del Slider */}
            <PremiosSlider />
          </Box>
        </Grid2>

        {/* ==========================================
            COLUMNA DERECHA: EL FORMULARIO
            ========================================== */}
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              align="center"
              fontWeight="bold"
            >
              Registra tu Comprobante
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 4 }}
            >
              Completa tus datos con cuidado para validar tu participación.
            </Typography>

            {/* Inyectamos el Client Component del Formulario */}
            <ParticipaForm />
          </Paper>
        </Grid2>

      </Grid2>
    </Container>
  );
}