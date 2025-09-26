import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./CategoryFilter";
import { fetchBrandSearch } from "@/app/lib/api/brands";
import { fetchCategoriesSearch } from "@/app/lib/api/categorys";

export const Filter = async ({ query }: { query: string }) => {
  const brands = await fetchBrandSearch(query);
  const categories = await fetchCategoriesSearch(query);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 300,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Filtro de marcas */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: "primary.main",
            borderTopRightRadius: "12px",
            borderTopLeftRadius: "12px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: 600,
              color: "white",
            }}
          >
            Marcas
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BrandFilter query={query} brands={brands} />
        </AccordionDetails>
      </Accordion>

      {/* Filtro de categorías */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{ backgroundColor: "primary.main" }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: 600,
              color: "white",
            }}
          >
            Categorías
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CategoryFilter query={query} categories={categories} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
