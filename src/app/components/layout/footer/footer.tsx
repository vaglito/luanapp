import Image from "next/image";
import Link from "next/link";
import { Box, Container, Typography, Divider, Grid2 } from "@mui/material";
import { AiFillTikTok, AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const footerLinks = [
  {
    id: 1,
    title: "Contacto",
    link: "/contacto",
  },
  {
    id: 2,
    title: "Términos & Condiciones de garantia",
    link: "/terminos-garantias",
  },
  {
    id: 3,
    title: "Metodos de pago",
    link: "/metodos-de-pago",
  },
  {
    id: 4,
    title: "Factura Electronica",
    link: "https://see.corporacionluana.pe/",
  },
  {
    id: 5,
    title: "Politica de privacidad",
    link: "/politica-de-privacidad",
  },
  {
    id: 6,
    title: "Servicio Tecnico",
    link: "/servicio-tecnico",
  },
];

const socialLinks = [
  {
    id: 1,
    title: "Facebook",
    link: "https://www.facebook.com/Corpluana.oficial",
    icon: <AiFillFacebook className="text-3xl" />,
  },
  {
    id: 2,
    title: "Instagram",
    link: "https://www.instagram.com/corpluana_oficial/",
    icon: <AiFillInstagram className="text-3xl" />,
  },
  {
    id: 3,
    title: "TikTok",
    link: "https://www.tiktok.com/@corporacionluana",
    icon: <AiFillTikTok className="text-3xl" />,
  },
];

interface FooterProps {
  address: string;
}

export function Footer({ address }: FooterProps) {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white", marginTop: 5 }}>
      <Container maxWidth="xl">
        <Box sx={{ paddingY: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Columna en pantallas pequeñas
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box>
              <Image
                src="/logo-web-blanco.svg"
                alt="Logo de corporacion luana"
                width={0}
                height={0}
                priority={true}
                style={{ width: "350px" }} // Ajusta el tamaño en pantallas pequeñas
              />
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" }, // Ocultar en pantallas pequeñas
                bgcolor: "white",
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexGrow: 1,
                justifyContent: { xs: "center", md: "flex-start" }, // Centrar en pantallas pequeñas
              }}
            >
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  target="_blank"
                  href={link.link}
                  className="hover:text-cyan-600"
                >
                  {link.icon}
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" }, // Centrar en pantallas pequeñas
                textAlign: { xs: "center", md: "left" }, // Texto centrado en pantallas pequeñas
              }}
            >
              <Typography>
                <LocationOnIcon /> {address}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ bgcolor: "white", marginY: 4 }} />

          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box>
                <Typography>Métodos de pago</Typography>
                <Box>
                  <Image
                    src="/modalidades.webp"
                    alt="Metodos de pago"
                    sizes="100vw"
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Atención al cliente
                </Typography>
                <Box>
                  <Typography>Lun. - Sáb. de 9:45 am a 8:00 pm</Typography>
                  <Typography>ventas01@corporacionluana.pe</Typography>
                  <Typography>reclamos@corporacionluana.pe</Typography>
                  <Typography>RUC: 20543896129</Typography>
                  <Typography>Corporacion Luana S.A.C</Typography>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Servicio al cliente
                </Typography>
                <Box>
                  {footerLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.link}
                      className="hover:text-cyan-600"
                    >
                      <Typography>{link.title}</Typography>
                    </Link>
                  ))}
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Container>

      <Box sx={{ bgcolor: "other.main", p: 2 }}>
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} CORPORACION LUANA S.A.C. Todos los
          derechos reservados
        </Typography>
      </Box>
    </Box>
  );
}
