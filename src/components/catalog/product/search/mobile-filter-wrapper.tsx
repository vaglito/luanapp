"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface MobileFilterWrapperProps {
  children: React.ReactNode;
}

export const MobileFilterWrapper = ({ children }: MobileFilterWrapperProps) => {
  const theme = useTheme();
  // lg breakpoint and up (>=1200px) translates to Desktop
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  
  // Controlled expansion on mobile
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  if (isDesktop) {
    // Standard Desktop Layout: Always Open, Sticky
    return (
      <Box
        sx={{
          width: "280px",
          flexShrink: 0,
          bgcolor: "#fff",
          p: 3,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          height: "fit-content",
          position: "sticky",
          top: 100,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 2, color: "#545454", display: "flex", alignItems: "center", gap: 1 }}
        >
          <FilterAltIcon /> Filtros
        </Typography>
        {children}
      </Box>
    );
  }

  // Mobile Layout: Accordion Collapsed
  return (
    <Box sx={{ width: "100%", mb: { xs: 2, lg: 0 } }}>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        elevation={0}
        sx={{
          bgcolor: "#fff",
          borderRadius: "12px !important", // Force radius even when expanded
          border: "1px solid #e5e7eb",
          "&:before": {
            display: "none", // Remove default MUI divider line
          },
          overflow: "hidden"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
          aria-controls="filter-content"
          id="filter-header"
          sx={{
            py: 1,
            px: 2,
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "#545454",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FilterAltIcon fontSize="small" color="primary" /> {expanded ? "Ocultar Filtros" : "Mostrar Filtros"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 3, pt: 1, borderTop: "1px solid #f3f4f6" }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
