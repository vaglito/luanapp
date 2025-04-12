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
    return (
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.9rem", sm: "1rem" },
          textAlign: "center",
          mt: 2,
        }}
      >
        Ingresa una búsqueda para filtrar marcas.
      </Typography>
    );

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
          <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}>
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
          <BrandFilter query={query} />
        </AccordionDetails>
      </Accordion>

      {/* Filtro de categorías */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}>
            Categoría
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CategoryFilter query={query} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
