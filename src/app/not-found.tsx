import Link from "next/link";
import { Container, Box, Typography, Button } from "@mui/material";

export const metadata = {
    title: 'Pagina no encontrada | Corporacion Luana',
    description: 'Esta pagina no ha sido encontrada'
}

export default function NotFound() {
  return (
    <Container>
      <Box component="section">
        <Box component="div">
          <Typography variant="h2">Pagina no encontrada</Typography>
        </Box>
        <Box>
          <Typography>
            La pagina que estas buscando no se encuentra disponible.
          </Typography>
        </Box>
        <Box>
          <Link href="/">
            <Button variant="contained">Volver atras</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
