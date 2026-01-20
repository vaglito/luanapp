import { Container, Box, Typography, Paper, Grid } from "@mui/material";
import { TermWarranty } from "@/app/components/product/detail/term-warranty";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const metadata = {
    title: "Términos y Garantías | Corporación Luana",
    description: "Conoce nuestras políticas de garantía, devoluciones y cambios. Tu satisfacción es nuestra prioridad.",
};

export default function WarrantyPage() {
    return (
        <Container maxWidth="lg" sx={{ my: 8 }}>
            {/* Header */}
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
                    Términos y Garantías
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
                <Typography sx={{ color: "#6b7280", maxWidth: "800px", mx: "auto", fontSize: "1.1rem" }}>
                    En Corporación Luana nos comprometemos a ofrecerte productos de la más alta calidad.
                    Aquí encontrarás toda la información detallada sobre nuestras políticas de garantía.
                </Typography>
            </Box>

            {/* Main Content -> Reusing the existing component but wrapped nicely */}
            <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, borderRadius: 4, bgcolor: "white", border: "1px solid #e5e7eb", mb: 8 }}>
                <TermWarranty />
            </Paper>

            {/* Connection to Technical Service */}
            <Box sx={{ textAlign: "center", py: 8, bgcolor: "#fdf4ff", borderRadius: 4, border: "1px dashed #A3147F" }}>
                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                            <SupportAgentIcon sx={{ fontSize: 60, color: "#A3147F" }} />
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#545454" }}>
                                ¿Tienes problemas con tu equipo?
                            </Typography>
                            <Typography sx={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "600px" }}>
                                Si tu producto presenta fallas y necesitas hacer uso de la garantía o requieres soporte especializado,
                                nuestro equipo técnico está listo para ayudarte.
                            </Typography>

                            <Link href="/servicio-tecnico" passHref style={{ textDecoration: 'none', marginTop: "20px" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "white",
                                        bgcolor: "#A3147F",
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 50,
                                        fontWeight: "bold",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            bgcolor: "#8a116b",
                                            transform: "translateX(5px)"
                                        }
                                    }}
                                >
                                    Contactar Servicio Técnico <ArrowForwardIcon />
                                </Box>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    );
}
