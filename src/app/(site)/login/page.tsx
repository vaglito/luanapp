import { Suspense } from "react";
import { Box, CircularProgress, Container, Paper } from "@mui/material";
import { LoginForm } from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 3,
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
