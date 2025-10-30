import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { Categories, SubCategories } from "@/app/types/categories.type";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const CardCategory = ({ category }: { category: Categories }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState<SubCategories[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("");

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement>,
    subcategories: SubCategories[],
    categorySlug: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubcategories(subcategories);
    setSelectedCategorySlug(categorySlug);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <BootstrapTooltip title={category.relay.categoryName}>
        <Box
          sx={{
            bgcolor: "#e1e1e1",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            width: { xs: 110, sm: 120, md: 190 },
            height: { xs: 110, sm: 120, md: 190 },
            overflow: "hidden",
            mx: "auto",
          }}
        >
          {category.image ? (
            <Image
              src={category.image}
              alt={`Imagen de ${category.relay.categoryName ?? "categoría"}`}
              sizes="100vw"
              width={250}
              height={250}
              className="transition duration-150 ease-in-out hover:scale-110"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              aria-label={`Ver subcategorías de ${category.relay.categoryName ?? "categoría"}`}
              id={`categoria-${category.id}`}
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event: React.MouseEvent<HTMLImageElement>) =>
                handleClick(event, category.categoriesWeb, category.relay.categoryweb)
              }
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.0rem",
                textAlign: "center",
                color: "#333",
              }}
            >
              {category.relay.categoryName}
            </Typography>
          )}
        </Box>
      </BootstrapTooltip>

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
        {selectedSubcategories
          .filter((subcategory) => subcategory.isActive)
          .map((subcategory) => (
            <Link
              href={`/productos/${selectedCategorySlug}/${subcategory.relay.subcategoryweb}`}
              key={subcategory.id}
            >
              <MenuItem onClick={handleClose}>
                {subcategory.relay.subcategoryName}
              </MenuItem>
            </Link>
          ))}
      </Menu>
    </>
  );
};