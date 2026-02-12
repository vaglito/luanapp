import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const trustItems = [
    {
        icon: <VerifiedUserIcon fontSize="large" sx={{ color: "primary.main" }} />,
        title: "Garantía Luana",
        subtitle: "Compra asegurada 100%",
    },
    {
        icon: <LocalShippingIcon fontSize="large" sx={{ color: "secondary.main" }} />,
        title: "Envíos a todo el Perú",
        subtitle: "Rápido y seguro",
    },
    {
        icon: <SupportAgentIcon fontSize="large" sx={{ color: "info.main" }} />, // Neon Cyan
        title: "Soporte Experto",
        subtitle: "Ayuda técnica real",
    },
    {
        icon: <CreditScoreIcon fontSize="large" sx={{ color: "success.main" }} />,
        title: "Pagos Seguros",
        subtitle: "Tarjetas y transferencias",
    },
];

export const TrustBar = () => {
    return (
        <Box
            sx={{
                py: 4,
                background: "linear-gradient(to bottom, #ffffff 0%, #f3f4f6 100%)",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={3} justifyContent="center">
                    {trustItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    borderRadius: "12px",
                                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                                    backdropFilter: "blur(4px)",
                                    border: "1px solid rgba(0,0,0,0.03)",
                                    transition: "transform 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-3px)",
                                        backgroundColor: "white",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: "50%",
                                        bgcolor: "rgba(0,0,0,0.03)",
                                        display: "flex",
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            fontFamily: "var(--font-orbitron)",
                                            fontSize: "0.95rem",
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {item.subtitle}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
