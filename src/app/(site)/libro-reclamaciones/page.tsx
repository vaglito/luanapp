import { Container, Box, Typography, Paper, Alert } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { ComplaintsForm } from "@/app/components/complaints/complaints-form";

export const metadata = {
  title: "Libro de Reclamaciones | Corporación Luana",
  description: "Canal oficial para presentar reclamos o quejas conforme a la normativa de protección al consumidor.",
};

export default function LibroReclamacionesPage() {
  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#545454",
            textTransform: "uppercase",
            mb: 1,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          Libro de Reclamaciones Virtual
        </Typography>
        <Box
          sx={{
            width: "80px",
            height: "4px",
            bgcolor: "#A3147F",
            mx: "auto",
            borderRadius: "2px",
            mb: 3,
          }}
        />
        <Typography sx={{ color: "#6b7280", maxWidth: "800px", mx: "auto", fontSize: "1rem" }}>
          Conforme a lo establecido en el Código de Protección y Defensa del Consumidor,
          ponemos a tu disposición este Libro de Reclamaciones Virtual.
        </Typography>
      </Box>

      {/* Intro Box */}
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: "white", border: "1px solid #e5e7eb", mb: 4, textAlign: "center" }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <AutoStoriesIcon sx={{ fontSize: 80, color: "#545454" }} />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, color: "#545454", mb: 2 }}>
          Razón Social: CORPORACIÓN LUANA S.A.C.
        </Typography>
        <Typography sx={{ color: "#6b7280", mb: 1 }}> RUC: 20543896129 </Typography>
        <Typography sx={{ color: "#6b7280" }}> Domicilio Fiscal: Av. Garcilaso de la Vega 1251, Tda 118, Lima </Typography>
      </Paper>

      {/* Info Alert */}
      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        <Typography variant="body2">
          De acuerdo a la legislación vigente, debes recibir una respuesta en un plazo máximo de <strong>15 días hábiles</strong>.
        </Typography>
      </Alert>

      {/* Formulario Virtual */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#A3147F", mb: 3, textAlign: "center" }}>
          Hoja de Reclamación Virtual
        </Typography>
        <ComplaintsForm />
      </Box>

    </Container>
  );
}
