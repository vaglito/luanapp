// import MUI Components
import { Box, Typography } from "@mui/material";

// Imports Components
import { SliderProduct } from "../slider-product";

export function FeaturedProduct({ filteredProduct }: { filteredProduct: any }) {
  return (
    <Box component="section">
      <Box>
        <Box
          sx={{ bgcolor: "#f0f0f0", borderRadius: 6 }}
          className="drop-shadow-lg"
        >
          <Box
            sx={{
              background: "linear-gradient(to right, #5914A3, #A3147F)",
              mb: 2,
              p: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: "bold", color: "white" }}
            >
              Laptops
            </Typography>
          </Box>
          <SliderProduct products={filteredProduct} />
        </Box>
      </Box>
    </Box>
  );
}
