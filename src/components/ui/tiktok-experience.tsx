"use client";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import Script from "next/script";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export const TikTokExperience = () => {
    return (
        <Box sx={{ py: 8, bgcolor: "#F3F4F6", position: "relative", overflow: "hidden" }}>
            {/* TikTok Embed Script */}
            <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />

            <Container maxWidth="xl">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 6 },
                        borderRadius: "32px",
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        display: "flex",
                        flexDirection: { xs: "column", lg: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 6,
                        boxShadow: "0 20px 80px -20px rgba(89, 20, 163, 0.15)",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    {/* Decorative Background Gradients */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: "-20%",
                            left: "-10%",
                            width: "40%",
                            height: "140%",
                            background: "radial-gradient(circle, rgba(89,20,163,0.08) 0%, transparent 70%)",
                            zIndex: 0,
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "-20%",
                            right: "-10%",
                            width: "40%",
                            height: "140%",
                            background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
                            zIndex: 0,
                        }}
                    />

                    {/* Left Content */}
                    <Box sx={{ flex: 1, zIndex: 1, textAlign: { xs: "center", lg: "left" } }}>
                        <Box
                            sx={{
                                display: "inline-block",
                                px: 2,
                                py: 0.5,
                                borderRadius: "20px",
                                bgcolor: "rgba(89, 20, 163, 0.08)",
                                color: "primary.main",
                                mb: 2,
                            }}
                        >
                            <Typography variant="overline" fontWeight={800} sx={{ letterSpacing: 1 }}>
                                COMUNIDAD LUANA
                            </Typography>
                        </Box>

                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: "var(--font-orbitron)",
                                fontWeight: 800,
                                mb: 2,
                                fontSize: { xs: "2rem", md: "3.5rem" },
                                lineHeight: 1.1,
                                background: "linear-gradient(45deg, #111 30%, #444 90%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            VIVE LA <br />
                            <Box component="span" sx={{ color: "primary.main", WebkitTextFillColor: "initial" }}>
                                EXPERIENCIA
                            </Box>
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mb: 4,
                                color: "text.secondary",
                                maxWidth: "600px",
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                                mx: { xs: "auto", lg: 0 },
                            }}
                        >
                            Síguenos en TikTok para acceder a unboxings exclusivos, pruebas de rendimiento extremas y ofertas relámpago que no encontrarás en otro lugar.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowOutwardIcon />}
                            href="https://www.tiktok.com/@corporacionluana"
                            target="_blank"
                            sx={{
                                background: "primary", // TikTok Vibe
                                color: "white",
                                borderRadius: "12px",
                                fontWeight: 700,
                                fontFamily: "var(--font-orbitron)",
                                textTransform: "none",
                                px: 5,
                                py: 1.5,
                                fontSize: "1.1rem",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                                "&:hover": {
                                    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            Ir al Perfil de TikTok
                        </Button>
                    </Box>

                    {/* Right Content: Official Embed */}
                    <Box
                        sx={{
                            flex: 1,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            zIndex: 1,
                        }}
                    >
                        <blockquote
                            className="tiktok-embed"
                            cite="https://www.tiktok.com/@corporacionluana"
                            data-unique-id="corporacionluana"
                            data-embed-type="creator"
                            style={{
                                maxWidth: "600px",
                                minWidth: "320px",
                                width: "100%",
                                borderRadius: "12px",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                            }}
                        >
                            <section>
                                <a target="_blank" href="https://www.tiktok.com/@corporacionluana?refer=creator_embed">
                                    @corporacionluana
                                </a>
                            </section>
                        </blockquote>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
