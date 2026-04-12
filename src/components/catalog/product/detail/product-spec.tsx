import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

type Specifications = {
  [key: string]: string | number; // Definición del tipo
};

interface ProductSpecificationsProps {
  specifications: Specifications;
}

export function ProductSpecificationsContainer({
  specifications,
}: ProductSpecificationsProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "var(--font-orbitron)",
          fontWeight: 700,
          mb: 3,
          textAlign: "left",
          color: "primary.main",
          fontSize: 24,
          letterSpacing: "0.05em",
          borderBottom: "2px solid #00E5FF", // Neon Cyan underline
          display: "inline-block",
          pb: 1,
        }}
      >
        Especificaciones Técnicas
      </Typography>

      <TableContainer
        sx={{
          paddingX: { xs: 0, sm: 0, md: 0 },
          borderRadius: "0px",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Table>
          <TableBody>
            {Object.entries(specifications).map(([key, value], index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  sx={{
                    fontFamily: "var(--font-orbitron)",
                    fontWeight: 600,
                    color: "text.primary",
                    width: "40%",
                    textTransform: "uppercase",
                    fontSize: 14,
                    bgcolor: "rgba(98, 0, 234, 0.03)", // Subtle purple bg for keys
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {key.replace(/_/g, " ")}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "var(--font-inter)",
                    color: "text.secondary",
                    fontSize: 15,
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
