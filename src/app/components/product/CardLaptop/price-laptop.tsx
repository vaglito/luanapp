import { Box, Typography } from "@mui/material";

interface Price {
  precio_decimal: number;
  precio_local: number;
  precio_dolar_5: number;
  precio_local_5: number;
  precio_oferta_d: number;
  precio_oferta: number;
  precio_oferta_5: number;
  precio_oferta_d_5: number;
}

interface PriceLaptopProps {
  price: Price;
}

export const PriceLaptop: React.FC<PriceLaptopProps> = ({ price }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 1,
        gap: 3,
        justifyContent: "center",
      }}
    >
      {price.precio_oferta_d > 0 ? (
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textDecoration: "line-through" }}
            >
              S/{price.precio_local}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textDecoration: "line-through" }}
            >
              ${price.precio_decimal}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "error.main", fontWeight: 600 }}
            >
              S/{price.precio_oferta}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "error.main", fontWeight: 600 }}
            >
              (${price.precio_oferta_d})
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 1, flexDirection: "row" }}>
          <Typography
            variant="subtitle1"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            S/{price.precio_local}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            (${price.precio_decimal})
          </Typography>
        </Box>
      )}
    </Box>
  );
};
