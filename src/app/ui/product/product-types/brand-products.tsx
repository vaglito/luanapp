// Imports request APIs
import { fetchListProductBrand } from "@/app/utils/brands";

// Imports Components
import { SliderProduct } from "../slider-product";

// Imports MUI Components
import { Box, Typography } from "@mui/material";

export async function BrandProducts() {
  const filterBrandProduct = await fetchListProductBrand("ugreen");
  
  return (
    <Box component="section" sx={{ marginY: 4 }}>
      <Box>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Adquiere lo mejor en adaptadores
        </Typography>
        <Box>
          <SliderProduct products={filterBrandProduct} />
        </Box>
      </Box>
    </Box>
  );
}
