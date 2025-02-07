// import MUI Components
import { Box, Typography, Container } from "@mui/material";

// Imports Components
import { SliderProduct } from "../slider-product";

export function FeaturedProduct({ filteredProduct }: { filteredProduct: any }) {
  return (
    <Box>
      <Box sx={{ bgcolor: "#f0f0f0", paddingY: 1 }} className="drop-shadow-lg">
        <Box sx={{ paddingY: 1}}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Laptops
          </Typography>
        </Box>
        <Container maxWidth="xl" sx={{ paddingY: 4}}>
          <SliderProduct products={filteredProduct} />
        </Container>
      </Box>
    </Box>
  );
}
