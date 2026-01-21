import { Skeleton, Grid2, Box, Card, CardContent } from "@mui/material";

export const ProductListSkeleton = () => {
    return (
        <Grid2 container spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Grid2 size={{ xs: 6, sm: 4, md: 4, lg: 3, xl: 3 }} key={item}>
                    <Card
                        elevation={0}
                        sx={{
                            height: "100%",
                            border: "1px solid #e5e7eb",
                            borderRadius: 3,
                        }}
                    >
                        <Skeleton variant="rectangular" height={200} animation="wave" />
                        <CardContent>
                            <Skeleton variant="text" height={24} width="80%" sx={{ mb: 1 }} />
                            <Skeleton variant="text" height={20} width="60%" />
                            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                                <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 1 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
};

export const FiltersSkeleton = () => {
    return (
        <Box sx={{ width: "100%" }}>
            {[1, 2].map((section) => (
                <Box key={section} sx={{ mb: 4 }}>
                    <Skeleton variant="text" height={32} width="50%" sx={{ mb: 2 }} />
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Box key={item} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Skeleton variant="rectangular" width={20} height={20} sx={{ mr: 1, borderRadius: 0.5 }} />
                            <Skeleton variant="text" width="70%" />
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export const BrandListSkeleton = () => {
    return (
        <Grid2 container spacing={3}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 2 }} key={item}>
                    <Card
                        elevation={0}
                        sx={{
                            p: 2,
                            height: "100%",
                            border: "1px solid #f0f0f0",
                            borderRadius: 3,
                        }}
                    >
                        <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2, mb: 2 }} />
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Skeleton variant="text" width="60%" height={24} />
                        </Box>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
};

