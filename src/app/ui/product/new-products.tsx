import { Suspense } from "react";
// imports request APIs
import { fetchNewProductList } from "@/app/utils/products";

// import Components
import { Box, Typography } from "@mui/material";
import { SliderProductResult } from "./slider-product";
import { ProductSkeleton } from "../skeleton/productCard-skeleton";


export async function ProductNewContent() {
  const products = await fetchNewProductList();
  return <SliderProductResult products={products} />;
}

export function ProductNew() {
  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Productos Nuevos
        </Typography>
      </Box>
      <Box>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductNewContent />
        </Suspense>
      </Box>
    </Box>
  );
}
