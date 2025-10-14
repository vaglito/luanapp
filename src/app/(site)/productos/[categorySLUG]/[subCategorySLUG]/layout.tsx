import { Box, Container } from "@mui/material";

export default function CategorySubCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          marginY: 4,
        }}
      >
        <Box>{children}</Box>
      </Box>
    </Container>
  );
}
