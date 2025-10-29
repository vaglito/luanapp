
import { Box, Typography } from "@mui/material";
import { ProductPrice } from "@/app/components/product/detail/product-price";
import { ShopFunction } from "./shop-functions";

interface ProductDetailDescriptionProps {
  title: string;
  resumen: string;
  stock: number;
  prices: number;
  priceb: number;
  exchange: number;
}

export function ProductDetailDescription({
  title,
  resumen,
  prices,
  priceb,
  stock,
  exchange,
}: ProductDetailDescriptionProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        paddingY: 3,
        paddingX: 4,
        height: "100%",
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            fontSize: { xs: 20, sm: 24, md: 24, lg: 28 },
            color: "#545454",
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            textAlign: "justify",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          fontSize: { xs: 15, sm: 16, md: 17, lg: 17 },
          color: "#545454",
          textAlign: "justify",
          textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box dangerouslySetInnerHTML={{ __html: resumen }} />
      </Box>
      <ProductPrice prices={prices} priceb={priceb} exchange={exchange}/>
      <ShopFunction title={title} stock={stock} />
    </Box>
  );
}
