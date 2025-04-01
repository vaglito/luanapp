import { Categorys } from "@/app/types/v2/categorys-type";
import { Box, Typography } from "@mui/material";
import { SliderCategory } from "./categoryList/slider-category";

export const HomeCategory = ({ categories }: { categories: Categorys[] }) => {
  return (
    <Box
      sx={{
        padding: 4,
        marginTop: 1,
        marginBottom: 4,
      }}>
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontSize: "2.0rem",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
          gutterBottom
        >
          Categories
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "1.0rem",
            textAlign: "center",
            mb: 3,
          }}
        >
          Explora nuestra amplia gama de categorías para encontrar lo que
          necesitas.
        </Typography>
      </Box>
      <Box>
        <SliderCategory categories={categories} />
      </Box>
    </Box>
  );
};
