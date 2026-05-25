import { Suspense } from "react";
import { Box, CircularProgress, Container, Paper } from "@mui/material";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
        }}
      >
        <Suspense
          fallback={
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          <LoginForm />
        </Suspense>
      </Paper>
    </Container>
  );
}
