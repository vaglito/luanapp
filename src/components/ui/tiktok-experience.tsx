"use client";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import Script from "next/script";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { TypographyWrapper } from "./Typography/Typography";
import { MyButton } from "./Buttons/Buttons";

export const TikTokExperience = () => {
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: "#F3F4F6",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
              background:
                "radial-gradient(circle, rgba(89,20,163,0.08) 0%, transparent 70%)",
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
              background:
                "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
              zIndex: 0,
            }}
          />

          {/* Left Content */}
          <Box
            sx={{ flex: 1, zIndex: 1, textAlign: { xs: "center", lg: "left" } }}
          >
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
              <Typography
                variant="overline"
                fontWeight={800}
                sx={{ letterSpacing: 1 }}
              >
                COMUNIDAD LUANA
              </Typography>
            </Box>

            <TypographyWrapper customVariant="hero">
              VIVE LA <br />
              <Box
                component="span"
                sx={{ color: "primary.main", WebkitTextFillColor: "initial" }}
              >
                EXPERIENCIA
              </Box>
            </TypographyWrapper>

            <TypographyWrapper
              customVariant="body"
              sx={{
                mb: 4,
                color: "text.secondary",
                fontWeight: 400,
                mx: { xs: "auto", lg: 0 },
              }}
            >
              Síguenos en TikTok para acceder a unboxings exclusivos, pruebas de
              rendimiento extremas y ofertas relámpago que no encontrarás en
              otro lugar.
            </TypographyWrapper>

            <MyButton
              customVariant="submit"
              size="large"
              endIcon={<ArrowOutwardIcon />}
              href="https://www.tiktok.com/@corporacionluana"
            >
              Ir al Perfil de TikTok
            </MyButton>
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
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@corporacionluana?refer=creator_embed"
                >
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
