import { Box, Typography } from "@mui/material";

export function StockDisplay({ stock }: { stock: number }) {
  const getStockMessage = () => {
    if (stock > 20) {
      return "+20";
    } else if (stock <= 2) {
      return (
        <Typography
          component="span"
          sx={{
            color: "#d32f2f",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          ¡Advertencia! Solo queda {stock}.
        </Typography>
      );
    } else {
      return stock;
    }
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color: stock <= 2 ? "#d32f2f" : "#757575",
        }}
      >
        Stock: {getStockMessage()}
      </Typography>
    </Box>
  );
}
