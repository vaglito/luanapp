import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Button,
  TextField,
  IconButton,
  Badge,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Navbar } from "./navbar";

export function Header() {
  return (
    <>
      <header>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginY: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ width: { sm: "100%", xs: "100%", md: "30%" } }}>
              <Link href="/">
                <Image
                  src="/logo-corporacion-luana.jpg"
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
                <Box
                  sx={{
                    display: "flex",
                    width: { xs: "100%", md: "75%" },
                  }}
                >
                  <TextField
                    id="search"
                    label="Buscar producto..."
                    variant="outlined"
                    sx={{ width: "100%" }} // El TextField toma todo el ancho del contenedor
                  />
                  <Button variant="contained" sx={{ marginLeft: 1 }}>
                    <SearchIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", gap: 4 }}>
                <IconButton
                  color="primary"
                  aria-label="agrega al carrito de compras"
                >
                  <Badge badgeContent={5} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Link href="/iniciar-sesion">
                  <Button variant="outlined" startIcon={<LoginIcon />}>
                    Iniciar sesion
                  </Button>
                </Link>
                <Link href="/crear-cuenta">
                  <Button variant="contained" startIcon={<PersonIcon />}>
                    Crear Cuenta
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </header>
      <Navbar />
    </>
  );
}
