import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { Categorys, Subcategory } from "@/app/types/v2/categorys-type";
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

export const CardCategory = ({ category }: { category: Categorys }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Subcategory[]
  >([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("");

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement>,
    subcategories: Subcategory[],
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
      <BootstrapTooltip title={category.soplinea.nom_line}>
        <Box
          sx={{
            bgcolor: "#e1e1e1",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            width: { xs: 110, sm: 120, md: 190 }, // Tamaño ajustable según el viewport
            height: { xs: 110, sm: 120, md: 190 },
            overflow: "hidden", // Evita que la imagen sobresalga del borde redondo
            mx: "auto", // Centra el contenedor
          }}
        >
          {category.image ? (
            <Image
              src={category.image}
              alt={`Imagen de ${category.soplinea.nom_line ?? "categoría"}`}
              sizes="100vw"
              width={250}
              height={250}
              className="transition duration-150 ease-in-out hover:scale-110"
              style={{
                width: "100%", // Ajustar a contenedor
                height: "100%", // Ajustar a contenedor
                objectFit: "cover", // Evitar distorsión
                borderRadius: "50%", // Hacer la imagen redonda
                cursor: "pointer",
              }}
              aria-label={`Ver subcategorias de ${
                category.soplinea.nom_line ?? "categoria"
              }`}
              id={`categoria-${category.pk}`}
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event: React.MouseEvent<HTMLImageElement>) =>
                handleClick(event, category.subcategory, category.slug)
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
              {category.soplinea.nom_line}
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
        {selectedSubcategories.map((subcategory) => (
          <>
            {subcategory.is_active && (
              <Link
                href={`/productos/${selectedCategorySlug}/${subcategory.slug}`}
                key={subcategory.sopsub1.cod_sub1}
              >
                <MenuItem onClick={handleClose}>
                  {subcategory.sopsub1.nom_sub1}
                </MenuItem>
              </Link>
            )}
          </>
        ))}
      </Menu>
    </>
  );
};
