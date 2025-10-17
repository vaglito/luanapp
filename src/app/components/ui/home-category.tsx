import { Categorys } from "@/app/types/v2/categorys-type";
import { Box, Typography } from "@mui/material";
import { SliderCategory } from "./categoryList/slider-category";

export const HomeCategory = ({ categories }: { categories: Categorys[] }) => {
  return (
    <Box
      sx={{
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color="#545454" sx={{ fontWeight: "bold" }}>
          Categorías
        </Typography>
        <Typography
          color="#545454"
          sx={{
            fontSize: 18,
          }}
        >
          Explora nuestra amplia gama de categorías para encontrar lo que
          necesitas.
        </Typography>
      </Box>
      <Box sx={{ marginY: 4 }}>
        <SliderCategory categories={categories} />
      </Box>
    </Box>
  );
};
