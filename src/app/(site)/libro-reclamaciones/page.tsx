import { Box, Typography, Container } from "@mui/material";

export default function ComplaintsBookPage() {
  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: "2rem"}}>Libro de reclamaciones</Typography>
        </Box>
      </Box>
    </Container>
  );
}
