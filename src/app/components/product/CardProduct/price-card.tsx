import { Box, Typography } from "@mui/material";
import { fetchExchangeRate } from "@/app/services/exchangeRate";
import { convertUsdToPen } from "@/app/lib/currency";


export const PriceCard = ({
  priceSale,
  priceBulk,
  exchange,
}: {
  priceSale: number;
  priceBulk: number;
  exchange: number;
}) => {
  const hasOffer = priceBulk > 0;

  const priceSalePen = convertUsdToPen(priceBulk || priceSale, exchange);
  const priceOriginalPen = convertUsdToPen(priceSale, exchange);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Aligned left
        mt: 0.5,
        gap: 0.5,
      }}
    >
      {hasOffer ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "baseline",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textDecoration: "line-through",
                fontSize: "0.85rem",
              }}
            >
              S/{priceOriginalPen}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textDecoration: "line-through",
                fontSize: "0.85rem",
              }}
            >
              ${priceSale}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "baseline" }}>
            <Typography
              variant="h6"
              sx={{
                color: "error.main",
                fontWeight: 700,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              S/{priceSalePen}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "error.main",
                fontWeight: 600,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              (${priceBulk})
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "row",
            color: "primary.main",
            alignItems: "baseline",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
            }}
          >
            S/{priceOriginalPen}
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.9rem", md: "1rem" },
              color: "text.secondary",
            }}
          >
            (${priceSale})
          </Typography>
        </Box>
      )}
    </Box>
  );
};

