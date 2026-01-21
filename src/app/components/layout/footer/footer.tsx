"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Container, Typography, Divider, Grid2, IconButton } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
// Note: Material UI icons are preferred for consistency, but if you need specific brand icons not in MUI, use react-icons
import { FaTiktok } from "react-icons/fa";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const footerLinks = [
  {
    title: "Legal",
    links: [
      { id: 1, label: "Libro de reclamaciones", href: "/libro-reclamaciones" },
      { id: 2, label: "Términos y condiciones", href: "/terminos-garantias" },
      { id: 3, label: "Política de privacidad", href: "/politica-de-privacidad" },
      { id: 4, label: "Facturación electrónica", href: "https://see.corporacionluana.pe/" },
    ],
  },
  {
    title: "Atención al Cliente",
    links: [
      { id: 1, label: "Servicio Técnico", href: "/servicio-tecnico" },
    ],
  },
];

const socialLinks = [
  { id: 1, title: "Facebook", href: "https://www.facebook.com/Corpluana.oficial", icon: <Facebook /> },
  { id: 2, title: "Instagram", href: "https://www.instagram.com/corpluana_oficial/", icon: <Instagram /> },
  { id: 3, title: "TikTok", href: "https://www.tiktok.com/@corporacionluana", icon: <FaTiktok /> },
];

interface FooterProps {
  address: string;
}

export function Footer({ address }: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(180deg, #2e0b57 0%, #1a0533 100%)",
        color: "white",
        pt: 8,
        pb: 4,
        mt: "auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Grid2 container spacing={6}>
          {/* Columna 1: Marca y Sobre Nosotros */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Image
                src="/logo-web-blanco.svg"
                alt="Corporación Luana"
                width={280}
                height={80}
                style={{ width: "auto", height: "60px", objectFit: "contain" }}
                priority
              />
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 3, lineHeight: 1.6 }}>
              Líderes en tecnología y soluciones informáticas. Comprometidos con brindarte la mejor calidad y garantía en cada producto.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.id}
                  component={Link}
                  href={social.href}
                  target="_blank"
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      bgcolor: "secondary.main",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  aria-label={social.title}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid2>

          {/* Columna 2: Links Legales */}
          <Grid2 size={{ xs: 6, sm: 6, md: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "secondary.light" }}>
              Legal
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {footerLinks[0].links.map((link) => (
                <Link key={link.id} href={link.href} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": { color: "white", pl: 0.5 },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid2>

          {/* Columna 3: Atención al Cliente */}
          <Grid2 size={{ xs: 6, sm: 6, md: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "secondary.light" }}>
              Ayuda
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {footerLinks[1].links.map((link) => (
                <Link key={link.id} href={link.href} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": { color: "white", pl: 0.5 },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid2>

          {/* Columna 4: Contacto */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "secondary.light" }}>
              Contáctanos
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <LocationOnIcon sx={{ color: "primary.light" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                  {address}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <EmailIcon sx={{ color: "primary.light" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                  ventas01@corporacionluana.pe<br />
                  reclamos@corporacionluana.pe
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <PhoneIcon sx={{ color: "primary.light" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                  Lun - Sáb: 9:45 am - 8:00 pm
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 1, opacity: 0.5 }}>
                Métodos de pago aceptados:
              </Typography>
              <Image
                src="/modalidades.webp"
                alt="Metodos de pago"
                width={200}
                height={30}
                style={{ width: "auto", height: "50px", opacity: 0.8 }}
              />
            </Box>
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
            &copy; {new Date().getFullYear()} Corporación Luana S.A.C. - RUC: 20543896129. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
