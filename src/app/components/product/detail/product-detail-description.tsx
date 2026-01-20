import { Box, Typography } from "@mui/material";
import { ProductPrice } from "@/app/components/product/detail/product-price";
import { ShopFunction } from "./shop-functions";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { isRestrictedSubcategory } from "@/app/utils/restricted";
import { ProductDetail } from "@/app/types/products.type"; // 🔹 Importamos el tipo

interface ProductDetailDescriptionProps {
  title: string;
  resumen: string;
  stock: number;
  prices: number;
  priceb: number;
  exchange: number;
  subCategories: string;
  product: ProductDetail; // 🔹 Nueva prop
}

export function ProductDetailDescription({
  title,
  resumen,
  prices,
  priceb,
  stock,
  exchange,
  subCategories,
  product, // 🔹 Recibir prop
}: ProductDetailDescriptionProps) {
  const isRestricted = isRestrictedSubcategory(subCategories);

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
            fontWeight: 700,
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
      {isRestricted ? (
        <Typography
          sx={{
            color: "error.main",
            fontWeight: 600,
            fontSize: { xs: 18 },
            mt: 1,
          }}
        >
          <ReportProblemIcon /> Precio no disponible
        </Typography>
      ) : (
        <ProductPrice prices={prices} priceb={priceb} exchange={exchange} />
      )}
      <ShopFunction
        title={title}
        stock={stock}
        subCategory={subCategories}
        product={product} // 🔹 Pasar el producto completo
      />
    </Box>
  );
}
