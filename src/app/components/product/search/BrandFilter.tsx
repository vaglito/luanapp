"use client";
import { Box, Checkbox, FormControlLabel, Button } from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Brands } from "@/app/types/brands.type";

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

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("marca");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant={currentBrands.length === 0 ? "contained" : "outlined"}
        size="small"
        color="secondary"
        onClick={handleClearAll}
        sx={{ mb: 2 }}
      >
        Todas las marcas
      </Button>

      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        {data?.map((brand) => (
          <FormControlLabel
            key={brand.id}
            label={brand.relay.brandName}
            sx={{ fontWeight: 600 }}
            control={
              <Checkbox
                checked={currentBrands.includes(brand.relay.brands)}
                onChange={() => handleCheckbocChange(brand.relay.brands)}
                sx={{ color: "primary.main" }}
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
};
