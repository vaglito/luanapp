import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, Button, IconButton, Badge } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Navbar } from "./navbar";
import { Search } from "../search";

interface HeaderProps {
  logo: string;
}

export function Header({ logo }: HeaderProps) {
  return (
    <Box component="header" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            paddingY: 2,
            alignItems: "center",
          }}
        >
          <Box sx={{ width: { sm: "100%", xs: "100%", md: "30%" } }}>
            <Link href="/">
              <Image
                src={logo}
                width={0}
                height={0}
                alt="Logo de corporacion luana"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                priority={true}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, marginY: 1 }}>
            <Box
              sx={{
                display: "flex", // flex en todas las pantallas para permitir centrado
                flexDirection: { xs: "column", md: "row" }, // En xs, los elementos se apilan verticalmente, en md, se alinean horizontalmente
                justifyContent: "center", // Centra el contenido horizontalmente
                width: "100%",
              }}
            >
              <Suspense fallback={<div>Loading search...</div>}>
                <Search />
              </Suspense>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: 4 }}>
              <IconButton
                color="primary"
                aria-label="agrega al carrito de compras"
              >
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button variant="outlined" startIcon={<LoginIcon />}>
                Iniciar sesion
              </Button>
              <Button variant="contained" startIcon={<PersonIcon />}>
                Crear Cuenta
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Navbar />
    </Box>
  );
}
