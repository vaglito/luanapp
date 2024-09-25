import { Container, Box, Typography, Grid2 } from "@mui/material";
import { BannerMain } from "./ui/banner";
import { fetchCategory } from "./utils/categories";
import CategoriesComponent from "./ui/subcategory-menu";

export const metadata = {
  title: "Corporacion Luana",
  description: "Tienda de corporacion luana",
};

export default async function Home() {
  const categories = await fetchCategory();

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
            <CategoriesComponent categories={activeCategories}/>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
