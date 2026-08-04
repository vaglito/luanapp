"use client";

import { useRouter } from "next/navigation";
import { Button, Paper, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

interface SearchErrorFallbackProps {
  message: string;
}

export function SearchErrorFallback({ message }: SearchErrorFallbackProps) {
  const router = useRouter();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: "center",
        borderRadius: 4,
        bgcolor: "#fff",
        border: "1px solid #e5e7eb",
      }}
    >
      <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography
        variant="h5"
        color="text.secondary"
        gutterBottom
        fontWeight={600}
      >
        {message}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Por favor, intenta recargar la página o vuelve más tarde.
      </Typography>
      <Button
        variant="contained"
        onClick={() => router.refresh()}
        sx={{ bgcolor: "#5914A3", "&:hover": { bgcolor: "#450b82" } }}
      >
        Recargar
      </Button>
    </Paper>
  );
}
