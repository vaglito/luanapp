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
  const discountPercentage = hasOffer ? ((priceSale - priceBulk) / priceSale) * 100 : 0;

  const priceSalePen = convertUsdToPen(priceBulk || priceSale, exchange);
  const priceOriginalPen = convertUsdToPen(priceSale, exchange);

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
      {hasOffer ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                textDecoration: "line-through",
                fontSize: 18,
              }}
            >
              S/{priceOriginalPen}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                textDecoration: "line-through",
                fontSize: 18,
              }}
            >
              ${priceSale}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "error.main",
                fontWeight: 600,
                fontSize: { xs: 18, sm: 18, md: 22, lg: 24 },
              }}
            >
              S/{priceSalePen}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "error.main",
                fontWeight: 600,
                fontSize: { xs: 18, sm: 18, md: 22, lg: 24 },
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
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: 18, sm: 18, md: 22, lg: 24 },
            }}
          >
            S/{priceOriginalPen}
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: 18, sm: 18, md: 22, lg: 24 },
            }}
          >
            (${priceSale})
          </Typography>
        </Box>
      )}
    </Box>
  );
};
