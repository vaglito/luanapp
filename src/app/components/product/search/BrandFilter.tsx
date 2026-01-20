"use client";
import { Box, Checkbox, FormControlLabel, Button, Typography } from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Brands } from "@/app/types/brands.type";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const BrandFilter = ({
  query,
  data,
}: {
  query: string;
  data: Brands[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const raw = searchParams.get("marca");
  const currentBrands = raw ? raw.split(",") : [];

  const handleCheckbocChange = (brandSlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedRaw = params.get("marca");
    const selected = selectedRaw ? selectedRaw.split(",") : [];

    let updated: string[];

    if (selected.includes(brandSlug)) {
      updated = selected.filter((brand) => brand !== brandSlug);
    } else {
      updated = [...selected, brandSlug];
    }

    if (updated.length > 0) {
      params.set("marca", updated.join(","));
    } else {
      params.delete("marca");
    }

    // Reset pagination when filtering
    if (params.get("page")) params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("marca");
    if (params.get("page")) params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {currentBrands.length > 0 && (
        <Button
          variant="text"
          size="small"
          color="secondary"
          startIcon={<RestartAltIcon />}
          onClick={handleClearAll}
          sx={{ mb: 2, alignSelf: "flex-start", textTransform: "none" }}
        >
          Limpiar filtros
        </Button>
      )}

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "300px",
        overflowY: "auto",
        gap: 0.5,
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#e5e7eb",
          borderRadius: "4px",
        }
      }}>
        {data?.map((brand) => (
          <FormControlLabel
            key={brand.id}
            label={
              <Typography variant="body2" sx={{ color: "#545454", fontWeight: currentBrands.includes(brand.relay.brands) ? 600 : 400 }}>
                {brand.relay.brandName}
              </Typography>
            }
            sx={{ m: 0 }}
            control={
              <Checkbox
                size="small"
                checked={currentBrands.includes(brand.relay.brands)}
                onChange={() => handleCheckbocChange(brand.relay.brands)}
                sx={{
                  color: "#d1d5db",
                  "&.Mui-checked": {
                    color: "#A3147F",
                  }
                }}
              />
            }
          />
        ))}
        {(!data || data.length === 0) && (
          <Typography variant="body2" color="text.secondary">No hay marcas disponibles.</Typography>
        )}
      </Box>
    </Box>
  );
};
