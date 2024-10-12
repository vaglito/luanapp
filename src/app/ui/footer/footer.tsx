import Image from "next/image";
import Link from "next/link";
import { Box, Container, Typography, Divider, Grid2 } from "@mui/material";
import { AiFillTikTok, AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white", marginTop: 5 }}>
      <Container maxWidth="xl">
        <Box sx={{ paddingY: 4 }}>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Image
                src="/logo-web-blanco.svg"
                alt="Logo de corporacion luana"
                width={0}
                height={0}
                priority={true}
                style={{ width: "350px" }}
              />
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: "white" }}
            />
            <Box sx={{ display: "flex", gap: 1, flexGrow: 1}}>
              <Link
                href="https://www.facebook.com/Corpluana.oficial"
                target="_blank"
              >
                <AiFillFacebook className="text-3xl" />
              </Link>
              <Link
                href="https://www.instagram.com/corpluana_oficial/"
                target="_blank"
              >
                <AiFillInstagram className="text-3xl" />
              </Link>
              <Link
                href="https://www.tiktok.com/@corporacionluana"
                target="_blank"
              >
                <AiFillTikTok className="text-3xl" />
              </Link>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography>
                <LocationOnIcon /> Av. Inca Garcilaso de la Vega 1251 - Tienda 118, Tienda 209
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ bgcolor: "white", marginY: 4 }} />
          <Grid2 container spacing={3}>
            <Grid2 size={{ md: 3 }}>
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
            <Grid2 size={{ md: 3 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Atención al cliente
                </Typography>
                <Box>
                  <Typography>Lun. - Sáb. de 9:45 am a 8:00 pm</Typography>
                  <Typography>ventas@corporacionluana.pe</Typography>
                  <Typography>reclamos@corporacionluana.pe</Typography>
                  <Typography>RUC: 20543896129</Typography>
                  <Typography>Corporacion Luana S.A.C</Typography>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ md: 3 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Servicio al cliente
                </Typography>
                <Box>
                  <Typography>
                    <Link className="hover:text-cyan-300" href="/contacto">
                      Contacto
                    </Link>
                  </Typography>
                  <Typography>
                    <Link
                      className="hover:text-cyan-300"
                      href="/terminos-garantias"
                    >
                      Términos & Condiciones de garantia
                    </Link>
                  </Typography>
                  <Typography>
                    <Link
                      className="hover:text-cyan-300"
                      href="/metodos-de-pago"
                    >
                      Metodos de pago
                    </Link>
                  </Typography>
                  <Typography>
                    <Link
                      className="hover:text-cyan-300"
                      href="/see.corporacionluana.com"
                      target="_blank"
                    >
                      Factura Electronica
                    </Link>
                  </Typography>
                  <Typography>
                    <Link
                      className="hover:text-cyan-300"
                      href="/politica-de-privacidad"
                    >
                      Politica de privacidad
                    </Link>
                  </Typography>
                  <Typography>
                    <Link
                      className="hover:text-cyan-300"
                      href="/servicio-tecnico"
                    >
                      Servicio Tecnico
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
      <Box sx={{ bgcolor: "other.main", p: 2 }}>
        <Typography sx={{ textAlign: "center" }}>
          Copyright 2024 © CORPORACION LUANA S.A.C. Todos los derechos
          reservados
        </Typography>
      </Box>
    </Box>
  );
}
