import { Container, Box, Typography, Grid2 } from "@mui/material";
import { BannerMain } from "./ui/banner";
import { fetchCategory } from "./utils/categories";
import { fetchNewProductList } from "./utils/products";
import CategoriesComponent from "./ui/subcategory-menu";
import { SliderProduct } from "./ui/product/slider-product";

export const metadata = {
  title: "Corporacion Luana",
  description: "Tienda de corporacion luana",
};

export default async function Home() {
  const categories = await fetchCategory();
  const products = await fetchNewProductList();

  // filtro de categorias activas
  const activeCategories = categories.filter((category) => category.is_active);

  return (
    <Container maxWidth="xl">
      <Box>
        <BannerMain />
      </Box>
      <Box component="section">
        <Box>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Nuestras categorías
          </Typography>
          <Box>
            <CategoriesComponent categories={activeCategories} />
          </Box>
        </Box>
      </Box>
      {/* Nuevos productos */}
      <Box component="section">
        <Box>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Nuevos ingresos
          </Typography>
          <Box>
            <SliderProduct products={products} />
          </Box>
        </Box>
      </Box>
      {/* Laptops */}
      <Box component="section">
        <Box>
          <Box sx={{ bgcolor: "#f0f0f0", borderRadius: 6 }}>
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
            <SliderProduct products={products} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
