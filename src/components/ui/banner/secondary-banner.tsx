import Link from "next/link";

import { MyButton } from "../Buttons/Buttons";
import { TypographyWrapper } from "../Typography/Typography";

import { Box, Typography, Container } from "@mui/material";
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
          background:
            "radial-gradient(circle at 70% 50%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)", // Neon Cyan Glow
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
          <TypographyWrapper customVariant="hero" variant="h3">
            {title}
          </TypographyWrapper>
          <TypographyWrapper
            customVariant="body"
            variant="h6"
            sx={{
              color: "#fff",
            }}
          >
            {subtitle}
          </TypographyWrapper>
          <Link href={ctaLink} style={{ textDecoration: "none" }}>
            <MyButton
              customVariant="text"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              {ctaText}
            </MyButton>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};
