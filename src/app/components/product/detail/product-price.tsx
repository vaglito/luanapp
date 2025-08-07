import { Box, Typography, Chip } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

interface ProductPriceProps {
  prices: {
    precio_decimal: number;
    precio_local: number;
    precio_oferta_d: number;
    precio_oferta: number;
  };
}

export function ProductPrice({ prices }: ProductPriceProps) {
  const hasOffer = prices.precio_oferta_d > 0;
  const porcentajeDescuento =
    prices.precio_oferta_d > 0
      ? ((prices.precio_decimal - prices.precio_oferta_d) /
          prices.precio_decimal) *
        100
      : 0;

  return (
    <Box sx={{ marginTop: 3 }}>
      {hasOffer ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "center", md: "start" },
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                marginRight: 2,
                fontWeight: "bold",
                fontSize: { xs: 26, sm: 26, md: 27, lg: 38 },
                color: "error.main",
                textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              S/{prices.precio_oferta}
            </Typography>
            <Typography
              sx={{
                fontWeight: "semibold",
                fontSize: { xs: 24, sm: 24, md: 27, lg: 38 },
                color: "gray",
                textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              (${prices.precio_oferta_d})
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2}}>
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "gray",
                fontSize: { xs: 19, sm: 20, md: 24, lg: 27 },
              }}
            >
              S/{prices.precio_local}
            </Typography>
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "gray",
                fontSize: { xs: 19, sm: 20, md: 24, lg: 27 },
              }}
            >
              (${prices.precio_decimal})
            </Typography>
            <Chip
              color="primary"
              label={`${porcentajeDescuento.toFixed(0)}% de descuento`}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            alignItems: { xs: "center", sm: "center", md: "start" },
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: 26, sm: 26, md: 27, lg: 38 },
              color: "#A3147F",
              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
              marginRight: 2,
            }}
          >
            S/{prices.precio_local}
          </Typography>
          <Typography
            sx={{
              fontWeight: "semibold",
              fontSize: { xs: 24, sm: 24, md: 27, lg: 38 },
              color: "gray",
              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            (${prices.precio_decimal})
          </Typography>
          <Chip label="Incluye IGV" />
        </Box>
      )}
      <Box>
        <Typography
          sx={{
            fontSize: { xs: 15, sm: 16, md: 17, lg: 17 },
            color: "#545454",
            marginTop: 0.1,
            fontWeight: "semibold",
            
          }}
        >
          Ahorra, sin recargo con Transferencia / Deposito o efectivo
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ marginTop: 2, display: "flex", alignItems: "center" }}>
          <LocalShippingIcon sx={{ color: "primary.main", marginRight: 1 }} />
          <Typography
            sx={{
              fontSize: { xs: 15, sm: 16, md: 17, lg: 17 },
              color: "#545454",
              fontWeight: "semibold",
            }}
          >
            Pide ahora y recibe en Lima Metropolitana y provincias.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
