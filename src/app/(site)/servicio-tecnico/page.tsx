import { Container, Box, Typography, Button, Grid, Paper, Divider } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ComputerIcon from "@mui/icons-material/Computer";
import BuildIcon from "@mui/icons-material/Build";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Servicio Técnico | Corporación Luana",
    description: "Soporte técnico especializado, mantenimiento y reparación de computadoras. Soporte remoto vía AnyDesk.",
};

export default function TechnicalServicePage() {
    return (
        <Container maxWidth="xl" sx={{ my: 8 }}>
            {/* Header Section */}
            <Box sx={{ mb: 8, textAlign: "center" }}>
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
                    Servicio Técnico
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
                <Typography
                    sx={{
                        color: "#6b7280",
                        fontSize: "1.1rem",
                        maxWidth: "800px",
                        mx: "auto",
                    }}
                >
                    Ofrecemos soluciones rápidas y efectivas para tus equipos informáticos.
                    Desde mantenimiento preventivo hasta reparaciones complejas y soporte remoto.
                </Typography>
            </Box>

            {/* Servicios Highlights */}
            <Grid container spacing={4} sx={{ mb: 10 }}>
                {[
                    {
                        icon: <BuildIcon fontSize="large" />,
                        title: "Mantenimiento y Reparación",
                        desc: "Limpieza profunda, cambio de pasta térmica y reparación de hardware.",
                    },
                    {
                        icon: <ComputerIcon fontSize="large" />,
                        title: "Diagnóstico Computarizado",
                        desc: "Identificamos fallas de hardware y software con herramientas precisas.",
                    },
                    {
                        icon: <SupportAgentIcon fontSize="large" />,
                        title: "Asesoría Personalizada",
                        desc: "Te ayudamos a elegir los mejores componentes para actualizar tu PC.",
                    },
                ].map((service, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                textAlign: "center",
                                height: "100%",
                                borderRadius: 4,
                                border: "1px solid #e5e7eb",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                    borderColor: "#A3147F",
                                    "& .icon-box": {
                                        bgcolor: "#A3147F",
                                        color: "white",
                                    },
                                },
                            }}
                        >
                            <Box
                                className="icon-box"
                                sx={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: "50%",
                                    bgcolor: "#fce7f3",
                                    color: "#A3147F",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mx: "auto",
                                    mb: 2,
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {service.icon}
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", color: "#545454", mb: 1 }}
                            >
                                {service.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                {service.desc}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Sección Soporte Remoto AnyDesk */}
            <Paper
                elevation={0}
                sx={{
                    mb: 10,
                    p: { xs: 4, md: 8 },
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #fdf4ff 0%, #ffffff 100%)",
                    border: "1px solid #fbcfe8",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 6,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <ScreenShareIcon sx={{ fontSize: 40, color: "#ef4444" }} />
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#545454" }}>
                            Soporte Remoto
                        </Typography>
                    </Box>
                    <Typography sx={{ color: "#6b7280", mb: 3, fontSize: "1.1rem" }}>
                        ¡No necesitas salir de casa! Conéctate con nuestros técnicos expertos a través de <strong>AnyDesk</strong>. Solucionamos problemas de software, instalación de programas y configuraciones al instante.
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                        <Link href="https://anydesk.com/es/downloads" target="_blank" passHref style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: "#ef4444",
                                    color: "white",
                                    py: 1.5,
                                    px: 4,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    "&:hover": { bgcolor: "#dc2626" },
                                }}
                            >
                                Descargar AnyDesk
                            </Button>
                        </Link>
                        <Button
                            variant="outlined"
                            size="large"
                            color="secondary"
                            href="https://wa.me/51919443359?text=Hola,%20necesito%20soporte%20remoto%20con%20AnyDesk."
                            target="_blank"
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: "bold",
                                borderColor: "#A3147F",
                                color: "#A3147F",
                            }}
                        >
                            Solicitar Conexión
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    {/* Visual abstract representation of remote support */}
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 400,
                            aspectRatio: "16/9",
                            bgcolor: "white",
                            borderRadius: 3,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #eee",
                        }}
                    >
                        <Image
                            src="https://anydesk.com/_static/img/logos/anydesk-logo.svg" // Using external logo for quick viz, better if local
                            width={200}
                            height={100}
                            alt="AnyDesk Logo"
                            style={{ opacity: 0.8 }}
                        />
                    </Box>
                </Box>
            </Paper>

            {/* Sección Contacto Soporte */}
            <Box id="contacto-soporte" sx={{ textAlign: "center", maxWidth: "800px", mx: "auto" }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#545454", mb: 2 }}
                >
                    ¿Necesitas soporte técnico presencial?
                </Typography>
                <Typography sx={{ color: "#6b7280", mb: 4, fontSize: "1.1rem" }}>
                    Visítanos en nuestra tienda para un diagnóstico completo y reparación.
                    Nuestro equipo especializado te atenderá personalmente.
                </Typography>

                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        background: "white",
                        border: "1px solid #f3f4f6",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            startIcon={<WhatsAppIcon />}
                            href="https://wa.me/51919443359?text=Hola,%20necesito%20soporte%20técnico."
                            target="_blank"
                            size="large"
                            sx={{
                                bgcolor: "#25D366",
                                color: "white",
                                py: 2,
                                px: 6,
                                borderRadius: 3,
                                fontSize: "1.2rem",
                                textTransform: "none",
                                fontWeight: "bold",
                                boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)",
                                "&:hover": { bgcolor: "#1ebe57" },
                            }}
                        >
                            Solicitar Soporte Técnico
                        </Button>
                    </Box>

                    <Typography variant="caption" sx={{ display: "block", mt: 3, color: "#9ca3af" }}>
                        Horarios de atención: Lunes a Sábado de 10:00 AM a 8:00 PM
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}
