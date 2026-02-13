"use client";
import { Box, Typography, Chip } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { convertUsdToPen } from "@/lib/currency";

interface ProductPriceProps {
  prices: number;
  priceb: number;
  exchange: number
}

export function ProductPrice({ prices, priceb, exchange }: ProductPriceProps) {

  const hasOffer = priceb > 0;
  const discountPercentage = hasOffer ? ((prices - priceb) / prices) * 100 : 0;

  const priceSalePen = convertUsdToPen(priceb || prices, exchange);
  const priceOriginalPen = convertUsdToPen(prices, exchange);

  return (
    <Box sx={{ marginTop: 1, mb: 2 }}>
      {hasOffer ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "center", md: "start" },
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: { xs: 24, sm: 24, md: 27, lg: 38 },
                color: "error.main",
                letterSpacing: "0.02em",
              }}
            >
              S/{priceSalePen}
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                fontWeight: "semibold",
                fontSize: { xs: 24, sm: 24, md: 27, lg: 38 },
                color: "gray",
              }}
            >
              (${priceb})
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                textDecoration: "line-through",
                color: "text.secondary",
                fontSize: { xs: 19, sm: 20, md: 24, lg: 27 },
              }}
            >
              S/{priceOriginalPen}
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                textDecoration: "line-through",
                color: "gray",
                fontSize: { xs: 19, sm: 20, md: 24, lg: 27 },
              }}
            >
              (${prices})
            </Typography>
            <Chip
              color="primary"
              label={`${discountPercentage.toFixed(0)}% de descuento`}
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
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: { xs: 26, sm: 26, md: 27, lg: 38 },
              color: "primary.main",
            }}
          >
            S/{priceOriginalPen}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              fontWeight: "semibold",
              fontSize: { xs: 24, sm: 24, md: 27, lg: 38 },
              color: "gray",
            }}
          >
            (${prices})
          </Typography>
          <Chip label="Incluye IGV" />
        </Box>
      )}
      <Box>
        <Typography
          sx={{
            fontSize: { xs: 15, sm: 16, md: 17, lg: 17 },
            fontFamily: "var(--font-inter)",
            color: "#545454",
            marginTop: 0.1,
            fontWeight: "semibold",
          }}
        >
          Ahorra, sin recargo con Transferencia / Depósito o efectivo
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ marginTop: 2, display: "flex", alignItems: "center" }}>
          <LocalShippingIcon sx={{ color: "primary.main", marginRight: 1 }} />
          <Typography
            sx={{
              fontSize: { xs: 15, sm: 16, md: 17, lg: 17 },
              color: "#545454",
              fontWeight: "semibold",
            }}
          >
            Pide ahora y recibe en Lima Metropolitana y provincias
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

