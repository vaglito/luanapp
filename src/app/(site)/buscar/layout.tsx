import { Box, Container } from "@mui/material";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          marginY: 4,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          gap: { xs: 1, sm: 1, md: 2, lg: 4, xl: 4 },
        }}
      >
        <Box>{children}</Box>
      </Box>
    </Container>
  );
}
