import { fetchBrands } from "@/app/services/brands";
import { GridBrand } from "@/app/components/brand/grid-brand";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export const BrandResults = async () => {
    try {
        const brands = await fetchBrands();

        return <GridBrand brands={brands} />;
    } catch (error) {
        return (
            <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        textAlign: "center",
                        borderRadius: 4,
                        bgcolor: "#fff",
                        border: "1px solid #e5e7eb",
                    }}
                >
                    <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        gutterBottom
                        fontWeight={600}
                    >
                        Ocurrió un error al cargar las marcas.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                        Por favor, intenta recargar la página.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()} // Simple reload approach
                        sx={{ bgcolor: "#5914A3", "&:hover": { bgcolor: "#450b82" } }}
                    >
                        Recargar
                    </Button>
                </Paper>
            </Container>
        );
    }
};
