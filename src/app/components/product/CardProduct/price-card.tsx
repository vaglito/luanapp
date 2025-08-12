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

interface PriceCardProps {
  price: Price;
}

export const PriceCard: React.FC<PriceCardProps> = ({ price }) => {
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, justifyContent: "center" }}>
            <Typography variant="body2" sx={{ color: "gray", textDecoration: "line-through", fontSize: 18 }}>
              S/{price.precio_local}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", textDecoration: "line-through", fontSize: 18 }}>
              ${price.precio_decimal}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography variant="subtitle1" sx={{ color: "error.main", fontWeight: 600, fontSize: {xs: 18, sm: 18, md: 22, lg: 24} }}>
              S/{price.precio_oferta}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "error.main", fontWeight: 600, fontSize: {xs: 18, sm: 18, md: 22, lg: 24} }}>
              (${price.precio_oferta_d})
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 1, flexDirection: "row", color: "primary.main" }}>
          <Typography sx={{ fontWeight: 600, fontSize: {xs: 18, sm: 18, md: 22, lg: 24}}}>S/{price.precio_local}</Typography>
          <Typography sx={{ fontWeight: 600, fontSize: {xs: 18, sm: 18, md: 22, lg: 24}}}>(${price.precio_decimal})</Typography>
        </Box>
      )}
    </Box>
  );
};
