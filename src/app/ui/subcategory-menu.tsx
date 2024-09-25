"use client";
import Link from "next/link";
import { useState } from "react";
import { Button, Menu, MenuItem, Grid2 } from "@mui/material";
import { Categories, Subcategory } from "../types/categories";

const CategoriesComponent = ({ categories }: { categories: Categories[] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Subcategory[]
  >([]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    subcategories: Subcategory[]
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubcategories(subcategories);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <Grid2 container spacing={2}>
        {categories.map((category) => (
          <Grid2 size={{ xs: 6, md: 2 }} key={category.id}>
            <Button
              variant="contained"
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => handleClick(event, category.subcategory)}
              sx={{ width: "100%", height: "100%" }}
            >
              {category.soplinea.nom_line}
            </Button>
          </Grid2>
        ))}
      </Grid2>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {selectedSubcategories.map((subcategory) => (
          <MenuItem key={subcategory.sopsub1.cod_sub1} onClick={handleClose}>
            <Link href={`/productos/${subcategory.slug}`}>{subcategory.sopsub1.nom_sub1}</Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CategoriesComponent;
