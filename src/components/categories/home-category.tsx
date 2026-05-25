import { Categories } from "@/types/categories.type";
import { Box } from "@mui/material";
import { SliderCategory } from "./slider-category";
import { TypographyWrapper } from "../ui/Typography/Typography";

export const HomeCategory = ({ categories }: { categories: Categories[] }) => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        my: { xs: 2, md: 4 },
        overflow: "visible", // Evita el recorte de elementos absolutos
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: { xs: 4, md: 6 },
          textAlign: "center",
          px: 2,
        }}
      >
        <TypographyWrapper customVariant="hero" variant="h2" gradient="brand">
          Categorías Destacadas
        </TypographyWrapper>
        <TypographyWrapper customVariant="body">
          Explora nuestra colección y encuentra lo que necesitas en tecnología
        </TypographyWrapper>
      </Box>

      <Box sx={{ 
        position: "relative", 
        zIndex: 2, 
        width: "100%",
        overflow: "visible" // Asegura que el slider y sus botones no se corten
      }}>
        <SliderCategory categories={categories} />
      </Box>
    </Box>
  );
};
