//import request APIs
import { fetchCategory } from "@/app/utils/categories";

// Import MUI Component
import { Box, Typography } from "@mui/material";

// Import Components
import CategoriesComponent from "./subcategory-menu";

export async function CategorySlider() {
  const categories = await fetchCategory();
  const activeCategories = categories.filter((category) => category.is_active);

  return (
    <Box my={4}>
      <Box>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Nuestras Categorias
        </Typography>
      </Box>
      <Box>
        <CategoriesComponent categories={activeCategories}/>
      </Box>
    </Box>
  );
}
