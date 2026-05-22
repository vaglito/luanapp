"use client";
import { Box, Typography, Chip } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ErrorIcon from "@mui/icons-material/Error";
import { convertUsdToPen } from "@/lib/currency";

interface ProductPriceProps {
  prices: number;
  priceb: number;
  exchange: number;
}

const baseGlassStyle = {
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)", // Soporte para Safari
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)", // Sombra suave para dar profundidad
  fontWeight: 600,
};

// Estilo para alertas informativas / positivas
const infoGlassChip = {
  ...baseGlassStyle,
  backgroundColor: "rgba(46, 125, 50, 0.1)", // Verde semitransparente
  border: "1px solid rgba(46, 125, 50, 0.3)", // Borde verde más opaco
  color: "#2e7d32",
};

// Estilo para alertas de advertencia
const warningGlassChip = {
  ...baseGlassStyle,
  backgroundColor: "rgba(211, 47, 47, 0.1)", // Rojo/Naranja semitransparente
  border: "1px solid rgba(211, 47, 47, 0.3)", // Borde rojo más opaco
  color: "#d32f2f",
};

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
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: { xs: 26, sm: 26, md: 27, lg: 38 },
              color: "primary.main",
              lineHeight: 1,
            }}
          >
            S/{priceOriginalPen}
          </Typography>

          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: { xs: 24, sm: 24, md: 27, lg: 38 },
              color: "gray",
              lineHeight: 1,
            }}
          >
            (${prices})
          </Typography>

          {/* Contenedor de los Chips */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Chip label="Incluye IGV" size="small" sx={infoGlassChip} />
            <Chip
              label="No incluye flete por envío"
              size="small"
              sx={warningGlassChip}
            />
          </Box>
        </Box>
      )}
      <Box sx={{ marginTop: 2 }}>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 15, sm: 16, md: 17, lg: 17 },
              fontFamily: "var(--font-inter)",
              color: "#545454",
              fontWeight: "semibold",
              lineHeight: 3,
            }}
          >
            Ahorra, sin recargo con Transferencia / Depósito o efectivo
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalShippingIcon sx={{ color: "primary.main", marginRight: 1 }} />
            <Typography
              sx={{
                fontSize: { xs: 15, sm: 16, md: 17, lg: 17 },
                color: "#545454",
                fontWeight: "semibold",
                lineHeight: 1,
              }}
            >
              Pide ahora y recibe en Lima Metropolitana y provincias
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ErrorIcon sx={{ color: "secondary.main", marginRight: 1 }} />
            <Typography
              sx={{
                fontSize: { xs: 15, sm: 16, md: 17, lg: 17 },
                color: "#545454",
                fontWeight: "semibold",
                lineHeight: 1,
              }}
            >
              Precio sujeto a cambios sin previo aviso.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
