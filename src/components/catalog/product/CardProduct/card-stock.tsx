import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";

interface CardStockProps {
  stock: number;
  cod: string;
}

export function CardStock({ stock, cod }: CardStockProps) {
  let content;
  if (stock > 20) {
    content = (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <CheckCircleIcon sx={{ color: "success.main" }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          +20 unidades.
        </Typography>
      </Box>
    );
  } else if (stock === 1) {
    content = (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <ErrorIcon sx={{ color: "warning.main" }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            color: "warning.main",
          }}
        >
          {stock} unidad.
        </Typography>
      </Box>
    );
  } else if (stock > 0 && stock <= 5) {
    content = (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <ErrorIcon sx={{ color: "warning.main" }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            color: "warning.main",
          }}
        >
          {stock} unidades.
        </Typography>
      </Box>
    );
  } else if (stock === 0) {
    content = (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <CancelIcon sx={{ color: "error.main" }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            color: "error.main",
          }}
        >
          Producto no disponible
        </Typography>
      </Box>
    );
  } else {
    content = (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <CheckCircleIcon sx={{ color: "success.main" }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {stock} unidades.
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mt: 1,
        gap: "0.25rem",
      }}
    >
      <Box>{content}</Box>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#545454" }}>
          Codigo: {cod}
        </Typography>
      </Box>
    </Box>
  );
}
