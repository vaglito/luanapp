import { Categories } from "@/types/categories.type";
import { Box, Typography } from "@mui/material";
import { SliderCategory } from "./categoryList/slider-category";

export const HomeCategory = ({ categories }: { categories: Categories[] }) => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 6, md: 10 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120%",
            height: "60%",
          }}
        />
      </Box>

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
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: "linear-gradient(135deg, #1a237e 0%, #5914A3 50%, #A3147F 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.5rem" },
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Categorías Destacadas
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            maxWidth: "700px",
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.2rem" },
            lineHeight: 1.6,
            opacity: 0.8,
          }}
        >
          Explora nuestra colección y encuentra lo que necesitas en tecnología
        </Typography>
      </Box>

      <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
        <SliderCategory categories={categories} />
      </Box>
    </Box>
  );
};

