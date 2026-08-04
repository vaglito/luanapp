import { Container, Box, Typography } from "@mui/material";

export const metadata = {
  title: "Clientes | Corporacion Luana",
  description: "Sección de clientes próximamente disponible",
};

export default function ClientesPage() {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography variant="h3" color="text.secondary" fontWeight={700}>
          Próximamente
        </Typography>
      </Box>
    </Container>
  );
}
