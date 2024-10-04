import Image from "next/image";
import Link from "next/link";
import { Box, Container, Typography, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

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
            <Box sx={{ display: "flex", gap: 1 }}>
              <Link
                href="https://www.facebook.com/Corpluana.oficial"
                target="_blank"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/corpluana_oficial/"
                target="_blank"
              >
                <InstagramIcon />
              </Link>
            </Box>
          </Box>
          <Divider sx={{ bgcolor: "white", marginY: 4 }} />
          <Box sx={{ display: "flex" }}>
            <Box>
                <Typography>
                    Métodos de pago
                </Typography>
                <Box>
                    
                </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
