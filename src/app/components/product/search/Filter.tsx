import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FilterItem<T> {
  title: string;
  fetchData: (query: string) => Promise<T>;
  Component: React.ComponentType<{ query: string; data: T }>;
}
interface FilterProps {
  query: string;
  filters: FilterItem<any>[];
}

export const Filter = async ({ query, filters }: FilterProps) => {
  const results = await Promise.all(filters.map((f) => f.fetchData(query)));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "300",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {filters.map((filter, index) => {
        const data = results[index];
        const FilterComponent = filter.Component;
        return (
          <Accordion key={filter.title} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls={`panel-${index}-content`} id={`panel-${index}-header`} sx={{
                backgroundColor: "primary.main",
                borderTopRightRadius: "12px",
                borderTopLeftRadius: "12px",
              }}
            >
              <Typography variant="h6" sx={{
                fontSize: {xs: "1rem", sm: "1.2rem"},
                fontWeight: 600,
                color: "white",
              }}>{filter.title}</Typography>
            </AccordionSummary>
           <AccordionDetails>
            <FilterComponent query={query} data={data} />
            </AccordionDetails> 
          </Accordion>
        );
      })}
    </Box>
  );
};
