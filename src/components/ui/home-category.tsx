import { Categories } from "@/types/categories.type";
import { Box, Typography } from "@mui/material";
import { SliderCategory } from "./categoryList/slider-category";

export const HomeCategory = ({ categories }: { categories: Categories[] }) => {
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
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: "linear-gradient(45deg, #1a237e 30%, #534bae 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Categorías Destacadas
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            maxWidth: "600px",
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          Explora nuestra amplia gama de categorías y encuentra exactamente lo que
          buscas.
        </Typography>
      </Box>
      <Box sx={{ marginY: 4 }}>
        <SliderCategory categories={categories} />
      </Box>
    </Box>
  );
};

