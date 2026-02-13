import { Box, Typography, Button, Container } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface SecondaryBannerProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string; // Optional image URL
    gradient?: string; // Optional specific gradient
}

export const SecondaryBanner = ({
    title,
    subtitle,
    ctaText,
    ctaLink,
    backgroundImage,
    gradient = "linear-gradient(135deg, #1a237e 0%, #5914A3 50%, #A3147F 100%)", // Deep Violet -> Magenta
}: SecondaryBannerProps) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                py: { xs: 6, md: 8 },
                overflow: "hidden",
                background: backgroundImage ? `url(${backgroundImage})` : gradient,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: { xs: 0, md: "24px" }, // Rounded only on desktop if inside container, but we might use it full width
                my: { xs: 4, md: 6 },
                boxShadow: "0 10px 40px -10px rgba(89, 20, 163, 0.4)",
            }}
        >
            {/* Overlay Pattern */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 70% 50%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)", // Neon Cyan Glow
                    pointerEvents: "none",
                }}
            />


            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
                <Box
                    sx={{
                        maxWidth: "600px",
                        color: "white",
                        textAlign: { xs: "center", md: "left" },
                        mx: { xs: "auto", md: 0 },
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "var(--font-orbitron)",
                            fontWeight: 800,
                            fontSize: { xs: "2rem", md: "3rem" },
                            textTransform: "uppercase",
                            mb: 2,
                            letterSpacing: "0.05em",
                            textShadow: "0 4px 10px rgba(0,0,0,0.3)",
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "var(--font-inter)",
                            fontWeight: 500,
                            mb: 4,
                            opacity: 0.9,
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                    >
                        {subtitle}
                    </Typography>
                    <Link href={ctaLink} style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                bgcolor: "white",
                                color: "primary.main",
                                fontFamily: "var(--font-orbitron)",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                px: 4,
                                py: 1.5,
                                borderRadius: "12px",
                                "&:hover": {
                                    bgcolor: "#f0f0f0",
                                    transform: "translateX(5px)",
                                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
                                },
                            }}
                        >
                            {ctaText}
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};
