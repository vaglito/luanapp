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
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {filters.map((filter, index) => {
        const data = results[index];
        const FilterComponent = filter.Component;
        return (
          <Accordion
            key={filter.title}
            defaultExpanded
            disableGutters
            elevation={0}
            sx={{
              bgcolor: "transparent",
              '&:before': {
                display: 'none',
              },
              borderBottom: "1px solid #e5e7eb"
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#6b7280" }} />}
              aria-controls={`panel-${index}-content`} id={`panel-${index}-header`}
              sx={{
                px: 0,
                minHeight: 48,
                "&.Mui-expanded": {
                  minHeight: 48,
                }
              }}
            >
              <Typography variant="subtitle1" sx={{
                fontWeight: 700,
                color: "#374151",
                textTransform: "uppercase",
                fontSize: "0.9rem",
                letterSpacing: 0.5
              }}>{filter.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 1, pb: 3 }}>
              <FilterComponent query={query} data={data} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
