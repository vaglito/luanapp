import { Suspense } from "react";

import { Product } from "@/app/types/products";

import { Filters } from "../../filters/filters";
import { ProductChart } from "../../product-chart";

// Impors MUI Component
import { Box, Typography, Button, Grid2 } from "@mui/material";

export function SearchProduct({ searchProduct }: { searchProduct: Product }) {
  return (
    <Box>
      <ProductChart products={searchProduct.results} />
    </Box>
  );
}
