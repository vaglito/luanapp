"use client";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSearchParams } from "next/navigation";
import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./CategoryFilter";

export const Filter = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  if (!query)
    return <Typography>Ingresa una búsqueda para filtrar marcas.</Typography>;

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Marcas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Filtra los resultados por marca.
          </Typography>
          <BrandFilter query={query} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Categoria</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CategoryFilter query={query} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
