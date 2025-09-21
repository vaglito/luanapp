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
import { fetchBrandSearch } from "@/app/services/brands";
import { fetchCategoriesSearch } from "@/app/services/categorys";


export const Filter = async ({ query }: { query: string }) => {
  const brands = await fetchBrandSearch(query)
  const categories = await fetchCategoriesSearch(query)

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 300,
        mx: "auto",
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Filtro de marcas */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
          >
            Marcas
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
            }}
          >
            Filtra los resultados por marca.
          </Typography>
          <BrandFilter query={query} brands={brands}/>
        </AccordionDetails>
      </Accordion>

      {/* Filtro de categorías */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
          >
            Categoría
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{query}</Typography>
          <CategoryFilter query={query} categories={categories}/>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
